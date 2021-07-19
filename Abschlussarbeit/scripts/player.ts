namespace Final {
  export type Team = 1 | 2;
  export class Player extends Movable {
    public inaccuracy: number;
    public team: Team;
    public speed: number;
    public playerNumber: number;
    private origPosition: Vector;

    public constructor(
      _position: Vector,
      _playerNumber: number,
      _speed: number,
      _inaccuracy: number,
      _team: Team
    ) {
      super(_position, _speed);
      this.origPosition = _position.copy();
      this.playerNumber = _playerNumber;
      this.speed = _speed;
      this.inaccuracy = _inaccuracy;
      this.team = _team;
    }

    public init(_game: Game): void {
      document.addEventListener("click", (e) => {
        if (this.mouseCollision()) {
          this.showInformation();
        }
      });
    }

    public makeSelectedPlayer(): void {
      const selectedPlayer: HTMLElement =
        document.getElementById("selectedPlayer");
      selectedPlayer.innerHTML =
        this.team === 1
          ? (-1 * this.playerNumber).toString()
          : this.playerNumber.toString();
    }

    public showInformation(): void {
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

    public update(_game: Game): void {
      if (this.ballCollision(_game.ball)) {
        _game.activateShooting();
        _game.ballPosession =
          this.team === 1 ? -1 * this.playerNumber : this.playerNumber;
        _game.updateGameInfo();
        const shootBall: () => void = (): void => {
          const diff: Vector = Vector.getDifference(mouse, _game.ball.position);

          const inaccuracy: number =
            randomBetween(-0.25, 0.25) * this.inaccuracy;
          const angle: number = Math.atan2(diff.y, diff.x) + inaccuracy;
          const vx: number = Math.cos(angle);
          const vy: number = Math.sin(angle);
          const vel: Vector = new Vector(vx, vy).scale(15);

          _game.ball.vel = vel.copy();

          // ensure ball is outside of player
          while (this.ballCollision(_game.ball)) {
            _game.ball.position.add(vel);
          }

          _game.state = GameState.RUNNING;

          canvas.removeEventListener("click", shootBall);
        };
        canvas.addEventListener("click", shootBall);
        return;
      }

      // check for collision with ball
      if (this.shouldBeRunning(_game.ball)) {
        this.moveTowards(_game.ball.position);
      } else {
        this.moveTowards(this.origPosition);
      }
    }

    public render(_ctx: CanvasRenderingContext2D, _game: Game): void {
      const color: string =
        this.team === 1 ? _game.team1Color : _game.team2Color;

      _ctx.beginPath();
      _ctx.lineWidth = 2;
      _ctx.fillStyle = color;
      _ctx.arc(
        this.position.x,
        this.position.y,
        20, //20 = Player size
        0,
        2 * Math.PI,
        false
      );
      _ctx.fill();

      _ctx.fillStyle = "black";
      _ctx.font = "27px Arial";
      const digits: number = this.playerNumber.toString().length;
      _ctx.fillText(
        this.playerNumber.toString(),
        this.position.x - 8 * digits,
        this.position.y + 10
      );

      const selectedPlayer: Player | undefined = _game.getSelectedPlayer();
      if (selectedPlayer) {
        const isSelected: boolean = this.equals(selectedPlayer);
        if (isSelected) {
          _ctx.beginPath();
          _ctx.lineWidth = 2;
          _ctx.strokeStyle = "yellow";
          _ctx.arc(
            this.position.x,
            this.position.y,
            20, //20 = Player size
            0,
            2 * Math.PI,
            false
          );
          _ctx.stroke();
        }
      }

      if (DEBUG) {
        _ctx.beginPath();
        _ctx.lineWidth = 2;
        _ctx.strokeStyle = "red";
        _ctx.arc(
          this.position.x,
          this.position.y,
          (canvas.width * (30 / 90)) / 2, //Radius
          0,
          2 * Math.PI,
          false
        );
        _ctx.stroke();
      }
    }

    private shouldBeRunning(_ball: Ball): boolean {
      return (
        Vector.getDistance(_ball.position, this.position) <=
        (canvas.width * (30 / 90)) / 2
      );
    }

    private ballCollision(_ball: Ball): boolean {
      const r: number = 20 + _ball.radius; //20 = Player size
      return Vector.getDistance(_ball.position, this.position) <= r;
    }

    private mouseCollision(): boolean {
      return Vector.getDistance(mouse, this.position) <= 20; //20 = Player size
    }

    private equals(_other: Player): boolean {
      return (
        _other.playerNumber === this.playerNumber && _other.team === this.team
      );
    }
  }
}
