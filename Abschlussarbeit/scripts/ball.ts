namespace Final {
  export class Ball extends Movable {
    public radius: number;
    public vel: Vector = new Vector(0, 0);

    public constructor(_radius: number, _pos: Vector) {
      super(_pos, 0);
      this.radius = _radius;
    }

    public init(_game: Game): void {
      return null;
    }

    public update(_game: Game): void {
      this.position.add(this.vel);
      this.vel.scale(0.95);
    }
    
    public render(_ctx: CanvasRenderingContext2D, _game: Game): void {
      _ctx.beginPath();
      _ctx.lineWidth = 2;
      _ctx.fillStyle = "white";
      _ctx.arc(
        this.position.x,
        this.position.y,
        this.radius,
        0,
        2 * Math.PI,
        false
      );
      _ctx.fill();
    }
  }
}
