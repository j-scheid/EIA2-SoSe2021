namespace Final {
  export class Rectangle {
    position: Vector;
    width: number;
    height: number;

    constructor(pos: Vector, width: number, height: number) {
      this.position = pos;
      this.width = width;
      this.height = height;
    }
  }
}
