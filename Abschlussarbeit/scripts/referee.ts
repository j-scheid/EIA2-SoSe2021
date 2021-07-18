namespace Final {
  export class Referee extends Movable {
    constructor(pos: Vector) {
      super(pos, 4);
    }

    static get SIZE(): number {
      return 20;
    }
    static get RADIUS(): number {
      return (canvas.width * (60 / 90)) / 2;
    }

    shouldBeRunning(ball: Ball): boolean {
      return Vector.getDistance(ball.position, this.position) > Referee.RADIUS;
    }

    init(game: Game): void { return null; }

    update(game: Game): void {
      if (this.shouldBeRunning(game.ball)) {
        this.moveTowards(game.ball.position);
      }
    }
    render(ctx: CanvasRenderingContext2D, game: Game): void {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.fillStyle = "orange";
      ctx.arc(
        this.position.x,
        this.position.y,
        Referee.SIZE,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.fillStyle = "yellow";
      ctx.arc(
        this.position.x,
        this.position.y,
        Referee.SIZE / 2,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();

      if (DEBUG) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "pink";
        ctx.arc(
          this.position.x,
          this.position.y,
          Referee.RADIUS,
          0,
          2 * Math.PI,
          false
        );
        ctx.stroke();
      }
    }
  }
}
