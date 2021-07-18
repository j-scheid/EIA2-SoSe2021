namespace Final {
  export class Game {
    field: Field;
    ball: Ball;
    entities: Movable[];

    team1Color: string;
    team2Color: string;

    scoreTeam1: number = 0;
    scoreTeam2: number = 0;
    ballPosession?: number; // player number (negative => t1, positiv => t2)

    state: GameState = GameState.RUNNING;

    constructor() {
      this.field = new Field(canvas.width, canvas.height);
      this.ball = new Ball(
        15,
        new Vector(this.field.width / 2 - 70, this.field.height / 2 - 70)
      );
      this.entities = [];

      this.team1Color = "#F38A5E";
      this.team2Color = "#5194E1";

      this.initSoccer();
      this.initGUI();
      this.initArrowKeys();
    }

    getPlayers(): Player[] {
      return this.entities.filter((e) => e instanceof Player) as Player[];
    }

    initArrowKeys(): void {
      document.addEventListener("keydown", (event) => {
        const selectedPlayer: Player = this.getSelectedPlayer();
        const index: number = selectedPlayer
          ? this.getPlayers().indexOf(selectedPlayer)
          : 0;

        let nextIndex: number = 0;
        if (event.key === "ArrowLeft") {
          nextIndex = index - 1;
          if (nextIndex < 0) nextIndex = this.getPlayers().length - 1;
        } else if (event.key === "ArrowRight") {
          nextIndex = index + 1;
          if (nextIndex >= this.getPlayers().length) nextIndex = 0;
        }
        const newPlayer: Player = this.getPlayers()[nextIndex];
        newPlayer.makeSelectedPlayer();
        newPlayer.showInformation();
      });
    }

    initSoccer(): void {
      // PLAYER
      let counter: number = 1;
      for (let row: number = 0; row < 6; row++) {
        if (row % 2 === 0) {
          for (let i: number = 0; i < 4; i++) {
            const team: Team = counter % 2 == 0 ? 1 : 2;
            const speed: number = this.getSpeedFromSettings();
            const inaccuracy: number = this.getInaccuracyFromSettings();

            const pos: Vector = new Vector(
              i * (this.field.width / 4) + this.field.width / 4 / 2,
              row * (this.field.height / 6) + this.field.height / 6 / 2
            );
            const player: Player = new Player(
              pos,
              counter,
              speed,
              inaccuracy,
              team
            );
            this.entities.push(player);

            counter += 1;
          }
        } else {
          for (let i: number = 0; i < 3; i++) {
            const team: Team = counter % 2 == 0 ? 1 : 2;
            const speed: number = this.getSpeedFromSettings();
            const inaccuracy: number = this.getInaccuracyFromSettings();

            const pos: Vector = new Vector(
              i * (this.field.width / 3) + this.field.width / 3 / 2,
              row * (this.field.height / 6) + this.field.height / 6 / 2
            );
            const player: Player = new Player(
              pos,
              counter,
              speed,
              inaccuracy,
              team
            );
            this.entities.push(player);

            counter += 1;
          }
        }
      }

      // REFEREE
      const referee: Referee = new Referee(
        new Vector(
          this.field.width / 2 - Referee.SIZE / 2,
          this.field.height / 2 - Referee.SIZE / 2
        )
      );
      this.entities.push(referee);

      // LINESMEN
      const linesman1: Linesman = new Linesman(
        new Vector(0, this.ball.position.y)
      );
      const linesman2: Linesman = new Linesman(
        new Vector(this.field.width, this.ball.position.y)
      );
      this.entities.push(linesman1);
      this.entities.push(linesman2);

      this.entities.forEach((e) => e.init(this));
    }

    getInaccuracyFromSettings(): number {
      const minInaccuracy: number =
        parseInt(
          (document.getElementById("minInaccuracy") as HTMLInputElement).value
        ) / 100;
      const maxInaccuracy: number =
        parseInt(
          (document.getElementById("maxInaccuracy") as HTMLInputElement).value
        ) / 100;

      return randomBetween(minInaccuracy, maxInaccuracy);
    }

    getSelectedPlayer(): Player | undefined {
      const selectedPlayerEl: HTMLElement = document.getElementById("selectedPlayer");
      if (!selectedPlayerEl) return;
      const selectedPlayer: number = parseInt(selectedPlayerEl.innerHTML);

      const team: number = selectedPlayer < 0 ? 1 : 2;
      return this.entities
        .filter((e) => e instanceof Player)
        .filter((e) => (e as Player).team === team)
        .find(
          (e) => (e as Player).playerNumber === Math.abs(selectedPlayer)
        ) as Player;
    }

    getSpeedFromSettings(): number {
      const minSpeed: number = parseInt(
        (document.getElementById("minSpeed") as HTMLInputElement).value
      );
      const maxSpeed: number = parseInt(
        (document.getElementById("maxSpeed") as HTMLInputElement).value
      );

      return Math.floor(randomBetween(minSpeed, maxSpeed + 1));
    }

    initGUI(): void {
      // COLOR PICKER
      const picker1: HTMLInputElement = document.getElementById(
        "color1"
      ) as HTMLInputElement;
      const picker2: HTMLInputElement = document.getElementById(
        "color2"
      ) as HTMLInputElement;
      picker1.value = this.team1Color;
      picker2.value = this.team2Color;
      picker1.addEventListener("change", (e) => {
        this.team1Color = picker1.value;
      });
      picker2.addEventListener("change", (e) => {
        this.team2Color = picker2.value;
      });

      // PLAYER ATTRIBUTES
      const form: HTMLElement = document.querySelector("#settingsDialog form");
      form.addEventListener("submit", () => {
        this.entities
          .filter((e) => e instanceof Player)
          .forEach((e) => {
            const player: Player = e as Player;
            player.speed = this.getSpeedFromSettings();
            player.inaccuracy = this.getInaccuracyFromSettings();
          });
      });

      // PLAYER REMOVAL
      const removeBtn: HTMLElement = document.getElementById("removeBtn");
      removeBtn.addEventListener("click", (e) => {
        const selectedPlayer: Player | undefined = this.getSelectedPlayer();
        if (!selectedPlayer) return;
        const idx: number = this.entities.indexOf(selectedPlayer);
        this.entities.splice(idx, 1);
      });

      // PLAYER ADDING
      const addBtn: HTMLElement = document.getElementById("addBtn");
      addBtn.addEventListener("click", (e) => {
        this.state = GameState.ADD_PLAYER;
        const addPlayer: () => void = (): void => {
          const selectedPlayer: Player | undefined = this.getSelectedPlayer();
          const team: Team = selectedPlayer ? selectedPlayer.team : 1;

          let playerNumber: number;
          while (true) {
            playerNumber = Math.floor(
              randomBetween(0, this.entities.length + 1)
            );

            const existing: Player | undefined = this.getPlayers().find(
              (p) => (p as Player).playerNumber === playerNumber
            );
            if (!existing) break;
          }
          const speed: number = this.getSpeedFromSettings();
          const inaccuracy: number = this.getInaccuracyFromSettings();
          const newPlayer: Player = new Player(
            mouse,
            playerNumber,
            speed,
            inaccuracy,
            team
          );
          this.entities.push(newPlayer);

          this.state = GameState.RUNNING;

          canvas.removeEventListener("click", addPlayer);
        };
        canvas.addEventListener("click", addPlayer);
      });
    }

    updateGameInfo(): void {
      const scoreDisplay: HTMLElement = document.getElementById("displayScore");
      scoreDisplay.innerHTML = `${this.scoreTeam1} : ${this.scoreTeam2}`;

      if (this.ballPosession === undefined) return;
      const posessionDisplay: HTMLElement =
        document.getElementById("displayPosession");
      const team: Team = this.ballPosession < 0 ? 1 : 2;
      posessionDisplay.innerHTML = `${Math.abs(this.ballPosession)} (T${team})`;
    }

    resetBall(team?: number): void {
      if (this.ballPosession === undefined) return;

      if (!team) {
        team = this.ballPosession < 0 ? 1 : 2;
      }
      const players: Player[] = this.getPlayers().filter(
        (player) => player.team !== team
      ) as Player[];
      const idx: number = Math.floor(randomBetween(0, players.length));
      const player: Player = players[idx];
      this.ball.position = player.position.copy();
    }

    activateShooting(): void {
      this.state = GameState.SHOOTING;
    }

    update(): void {
      if (this.state === GameState.RUNNING) {
        this.field.update(this);
        this.ball.update(this);
        this.entities.forEach((e) => e.update(this));
      } else if (this.state === GameState.SHOOTING) {
        //
      }
    }
    render(ctx: CanvasRenderingContext2D): void {
      this.field.render(ctx, this);
      this.entities.forEach((e) => e.render(ctx, this));
      this.ball.render(ctx, this);

      if (this.state === GameState.SHOOTING) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.arc(mouse.x, mouse.y, this.ball.radius, 0, 2 * Math.PI, false);
        ctx.stroke();
      } else if (this.state === GameState.ADD_PLAYER) {
        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.arc(mouse.x, mouse.y, this.ball.radius, 0, 2 * Math.PI, false);
        ctx.stroke();
      }
    }
  }
}
