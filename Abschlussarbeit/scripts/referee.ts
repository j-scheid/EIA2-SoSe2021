namespace Final {
  export class Referee extends Movable {
    public constructor(_pos: Vector) {
      super(_pos, 4);
    }

    public init(_game: Game): void {
      return null;
    }

    public update(_game: Game): void {
      if (this.shouldBeRunning(_game.ball)) {
        this.moveTowards(_game.ball.position);
      }
    }

    public render(_ctx: CanvasRenderingContext2D, _game: Game): void {
      _ctx.beginPath();
      _ctx.lineWidth = 2;
      _ctx.fillStyle = "#23231f";
      _ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
      _ctx.fill();

      _ctx.beginPath();
      _ctx.lineWidth = 2;
      _ctx.fillStyle = "#efef15";
      _ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
      _ctx.fill();

      if (DEBUG) {
        _ctx.beginPath();
        _ctx.lineWidth = 2;
        _ctx.strokeStyle = "pink";
        _ctx.arc(
          this.position.x,
          this.position.y,
          (canvas.width * (60 / 90)) / 2, //radius
          0,
          2 * Math.PI,
          false
        );
        _ctx.stroke();
      }
    }

    private shouldBeRunning(_ball: Ball): boolean {
      return (
        Vector.getDistance(_ball.position, this.position) >
        (canvas.width * (60 / 90)) / 2
      ); //smaller than Referee Radius
    }
  }
}
