namespace Final {
  export class Rectangle {
    public position: Vector;
    public width: number;
    public height: number;

    public constructor(_pos: Vector, _width: number, _height: number) {
      this.position = _pos;
      this.width = _width;
      this.height = _height;
    }
  }
}
