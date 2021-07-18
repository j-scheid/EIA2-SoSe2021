namespace Final {
  export class Linesman extends Movable {
    constructor(pos: Vector) {
      super(pos, 5);
    }

    static get SIZE(): number {
      return 20;
    }

    init(game: Game): void {
      return null;
    }

    update(game: Game): void {
      if (game.ball.position.y < this.position.y) {
        this.position.y -= this.speed;
      } else if (game.ball.position.y > this.position.y) {
        this.position.y += this.speed;
      }
    }
    render(ctx: CanvasRenderingContext2D, game: Game): void {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.fillStyle = "green";
      ctx.arc(this.position.x, this.position.y, Linesman.SIZE, 0, 2 * Math.PI, false);
      ctx.fill();

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.fillStyle = "#88FF00";
      ctx.arc(this.position.x, this.position.y, Linesman.SIZE / 2, 0, 2 * Math.PI, false);
      ctx.fill();
    }
  }
}
