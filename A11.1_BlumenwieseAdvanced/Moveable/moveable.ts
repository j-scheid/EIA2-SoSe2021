namespace Advanced {
  export abstract class Moveable {
    protected xPos: number;
    protected yPos: number;
    protected velocityX: number;
    protected velocityY: number;

    protected yRandomMin: number;
    protected yRandomMax: number;

    constructor(_position: Vector) {
      this.yPos = _position.y;
      this.xPos = _position.x;
    }

    public update(): void {
      if (this.xPos > crc2.canvas.width || this.xPos < 0) {
        this.velocityX = -this.velocityX;
      }
      this.xPos += this.velocityX;
    }
  }
}
