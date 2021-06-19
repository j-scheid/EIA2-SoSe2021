namespace Polymorphie {
  export class Moveable {
    xPos: number;
    yPos: number;
    velocityX: number;
    velocityY: number;

    yRandomMin: number;
    yRandomMax: number;

    constructor(_position: Vector) {
      this.yPos = _position.y;
      this.xPos = _position.x;
    }

    update(): void {
      if (this.xPos > crc2.canvas.width || this.xPos < 0) {
        this.velocityX = -this.velocityX;
      }

      this.xPos += this.velocityX;
    }
  }
}
