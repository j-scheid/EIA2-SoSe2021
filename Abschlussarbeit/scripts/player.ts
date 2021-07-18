namespace Final {
  export type Team = 1 | 2;
  export class Player extends Movable {
    origPosition: Vector;
    inaccuracy: number;
    team: Team;
    speed: number;
    playerNumber: number;

    constructor(
      pos: Vector,
      playerNumber: number,
      speed: number,
      inaccuracy: number,
      team: Team
    ) {
      super(pos, speed);
      this.origPosition = pos.copy();
      this.playerNumber = playerNumber;
      this.speed = speed;
      this.inaccuracy = inaccuracy;
      this.team = team;
    }

    static get SIZE(): number {
      return 20;
    }
    static get RADIUS(): number {
      return (canvas.width * (30 / 90)) / 2;
    }

    shouldBeRunning(ball: Ball): boolean {
      return Vector.getDistance(ball.position, this.position) <= Player.RADIUS;
    }

    ballCollision(ball: Ball): boolean {
      const r: number = Player.SIZE + ball.radius;
      return Vector.getDistance(ball.position, this.position) <= r;
    }

    mouseCollision(): boolean {
      return Vector.getDistance(mouse, this.position) <= Player.SIZE;
    }

    init(_game: Game): void {
      document.addEventListener("click", (e) => {
        if (this.mouseCollision()) {
          this.showInformation();
        }
      });
    }

    makeSelectedPlayer(): void {
      const selectedPlayer: HTMLElement =
        document.getElementById("selectedPlayer");
      selectedPlayer.innerHTML =
        this.team === 1
          ? (-1 * this.playerNumber).toString()
          : this.playerNumber.toString();
    }

    showInformation(): void {
      this.makeSelectedPlayer();

      const numberEl: HTMLElement = document.getElementById("displayNumber");
      numberEl.innerHTML = this.playerNumber.toString();

      const teamEl: HTMLElement = document.getElementById("displayTeam");
      teamEl.innerHTML = this.team.toString();

      const inaccuracyEl: HTMLElement =
        document.getElementById("displayInaccuracy");
      inaccuracyEl.innerHTML = (this.inaccuracy * 100).toFixed(2) + "%";

      const speedEl: HTMLElement = document.getElementById("displaySpeed");
      speedEl.innerHTML = this.speed.toString();
    }

    update(game: Game): void {
      if (this.ballCollision(game.ball)) {
        game.activateShooting();
        game.ballPosession =
          this.team === 1 ? -1 * this.playerNumber : this.playerNumber;
        game.updateGameInfo();
        const shootBall: () => void = (): void => {
          const diff: Vector = Vector.getDifference(mouse, game.ball.position);

          const inaccuracy: number =
            randomBetween(-0.25, 0.25) * this.inaccuracy;
          const angle: number = Math.atan2(diff.y, diff.x) + inaccuracy;
          const vx: number = Math.cos(angle);
          const vy: number = Math.sin(angle);
          const vel: Vector = new Vector(vx, vy).scale(15);

          game.ball.vel = vel.copy();

          // ensure ball is outside of player
          while (this.ballCollision(game.ball)) {
            game.ball.position.add(vel);
          }

          game.state = GameState.RUNNING;

          canvas.removeEventListener("click", shootBall);
        };
        canvas.addEventListener("click", shootBall);
        return;
      }

      // check for collision with ball
      if (this.shouldBeRunning(game.ball)) {
        this.moveTowards(game.ball.position);
      } else {
        this.moveTowards(this.origPosition);
      }
    }
    render(ctx: CanvasRenderingContext2D, game: Game): void {
      const color: string = this.team === 1 ? game.team1Color : game.team2Color;

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.fillStyle = color;
      ctx.arc(
        this.position.x,
        this.position.y,
        Player.SIZE,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.font = "27px Arial";
      const digits: number = this.playerNumber.toString().length;
      ctx.fillText(
        this.playerNumber.toString(),
        this.position.x - 8 * digits,
        this.position.y + 10
      );

      const selectedPlayer: Player | undefined = game.getSelectedPlayer();
      if (selectedPlayer) {
        const isSelected: boolean = this.equals(selectedPlayer);
        if (isSelected) {
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "yellow";
          ctx.arc(
            this.position.x,
            this.position.y,
            Player.SIZE,
            0,
            2 * Math.PI,
            false
          );
          ctx.stroke();
        }
      }

      if (DEBUG) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.arc(
          this.position.x,
          this.position.y,
          Player.RADIUS,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
      }
    }

    equals(other: Player): boolean {
      return (
        other.playerNumber === this.playerNumber && other.team === this.team
      );
    }
  }
}
