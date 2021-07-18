namespace Final {
  export class Ball extends Movable {
    radius: number;
    vel: Vector = new Vector(0, 0);

    constructor(radius: number, pos: Vector) {
      super(pos, 0);
      this.radius = radius;
    }

    init(game: Game): void { return null; }

    update(_game: Game): void {
      this.position.add(this.vel);
      this.vel.scale(0.95);
    }
    render(ctx: CanvasRenderingContext2D, game: Game): void {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.fillStyle = "white";
      ctx.arc(
        this.position.x,
        this.position.y,
        this.radius,
        0,
        2 * Math.PI,
        false
      );
      ctx.fill();
    }
  }
}
