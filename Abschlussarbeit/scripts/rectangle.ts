namespace Final {
  export class Rectangle {
    public position: Vector;
    public width: number;
    public height: number;

    public constructor(_position: Vector, _width: number, _height: number) {
      this.position = _position;
      this.width = _width;
      this.height = _height;
    }
  }
}
