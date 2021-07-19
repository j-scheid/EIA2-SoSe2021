namespace Final {
  export abstract class Movable {
    public position: Vector;
    public speed: number;

    protected constructor(_position: Vector, _speed: number) {
      this.position = _position.copy();
      this.speed = _speed;
    }

    public abstract init(_game: Game): void;

    public abstract update(_game: Game): void;

    public abstract render(_ctx: CanvasRenderingContext2D, _game: Game): void;

    public moveTowards(target: Vector, variableAngle?: number): void {
      const diff: Vector = Vector.getDifference(target, this.position);

      const angle: number = Math.atan2(diff.y, diff.x) + (variableAngle || 0);
      const vx: number = Math.cos(angle);
      const vy: number = Math.sin(angle);

      const vel: Vector = new Vector(vx, vy).scale(this.speed);
      this.position.add(vel);
    }
  }
}
