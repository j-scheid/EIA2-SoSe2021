namespace Final {
  export class Linesman extends Movable {
    public constructor(_pos: Vector) {
      super(_pos, 5);
    }

    public init(_game: Game): void {
      return null;
    }

    public update(_game: Game): void {
      if (_game.ball.position.y < this.position.y) {
        this.position.y -= this.speed;
      } else if (_game.ball.position.y > this.position.y) {
        this.position.y += this.speed;
      }
    }
    public render(_ctx: CanvasRenderingContext2D, _game: Game): void {
      _ctx.beginPath();
      _ctx.lineWidth = 2;
      _ctx.fillStyle = "#353535";
      _ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
      _ctx.fill();

      _ctx.beginPath();
      _ctx.lineWidth = 2;
      _ctx.fillStyle = "#a0e5da";
      _ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
      _ctx.fill();
    }
  }
}
