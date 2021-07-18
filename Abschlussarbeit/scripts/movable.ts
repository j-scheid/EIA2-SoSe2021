namespace Final {
  export abstract class Movable {
    position: Vector;
    speed: number;

    constructor(pos: Vector, speed: number) {
      this.position = pos.copy();
      this.speed = speed;
    }

    abstract init(game: Game): void;

    abstract update(game: Game): void;

    abstract render(ctx: CanvasRenderingContext2D, game: Game): void;

    moveTowards(target: Vector, variableAngle?: number): void {
      const diff: Vector = Vector.getDifference(target, this.position);

      const angle: number = Math.atan2(diff.y, diff.x) + (variableAngle || 0);
      const vx: number = Math.cos(angle);
      const vy: number = Math.sin(angle);

      const vel: Vector = new Vector(vx, vy).scale(this.speed);
      this.position.add(vel);
    }
  }
}
