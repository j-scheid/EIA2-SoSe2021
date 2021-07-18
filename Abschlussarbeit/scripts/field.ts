namespace Final {
  export class Field {
    width: number;
    height: number;

    goalTeam1: Rectangle;
    goalTeam2: Rectangle;

    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;

      const goalWidth: number = 200;
      const goalHeight: number = 30;
      this.goalTeam1 = new Rectangle(
        new Vector((this.width - goalWidth) / 2, 0),
        goalWidth,
        goalHeight
      );
      this.goalTeam2 = new Rectangle(
        new Vector((this.width - goalWidth) / 2, this.height - goalHeight),
        goalWidth,
        goalHeight
      );
    }

    update(game: Game): void {
      if (this.checkGoal1(game.ball)) {
        game.scoreTeam2 += 1;
        game.updateGameInfo();
        game.resetBall(2);
      } else if (this.checkGoal2(game.ball)) {
        game.scoreTeam1 += 1;
        game.updateGameInfo();
        game.resetBall(1);
      }

      if (this.outOfPlay(game)) {
        game.resetBall();
      }
    }

    outOfPlay(game: Game): boolean {
      const fieldRect: Rectangle = new Rectangle(
        new Vector(0, 0),
        this.width,
        this.height
      );
      return !this.checkRectangleBallCollision(game.ball, fieldRect);
    }

    checkRectangleBallCollision(ball: Ball, rect: Rectangle): boolean {
      var distX: number = Math.abs(
        ball.position.x - rect.position.x - rect.width / 2
      );
      var distY: number = Math.abs(
        ball.position.y - rect.position.y - rect.height / 2
      );

      if (distX > rect.width / 2 + ball.radius) return false;
      if (distY > rect.height / 2 + ball.radius) return false;

      if (distX <= rect.width / 2) return true;
      if (distY <= rect.height / 2) return true;

      var dx: number = distX - rect.width / 2;
      var dy: number = distY - rect.height / 2;

      return dx * dx + dy * dy <= ball.radius * ball.radius;
    }

    checkGoal1(ball: Ball): boolean {
      return this.checkRectangleBallCollision(ball, this.goalTeam1);
    }
    checkGoal2(ball: Ball): boolean {
      return this.checkRectangleBallCollision(ball, this.goalTeam2);
    }

    render(ctx: CanvasRenderingContext2D, game: Game): void {
      // middle line
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, this.height / 2);
      ctx.lineTo(this.width, this.height / 2);
      ctx.stroke();

      // border
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.strokeRect(0, 0, this.width, this.height);

      // middle circle
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(this.width / 2, this.height / 2, 100, 0, 2 * Math.PI, false);
      ctx.stroke();

      // goals
      ctx.strokeStyle = game.team1Color;
      ctx.lineWidth = 4;
      ctx.strokeRect(
        this.goalTeam1.position.x,
        this.goalTeam1.position.y,
        this.goalTeam1.width,
        this.goalTeam1.height
      );
      ctx.strokeStyle = game.team2Color;
      ctx.strokeRect(
        this.goalTeam2.position.x,
        this.goalTeam2.position.y,
        this.goalTeam2.width,
        this.goalTeam2.height
      );
    }
  }
}
