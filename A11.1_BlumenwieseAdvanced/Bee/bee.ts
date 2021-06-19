namespace Advanced {
  export class Bee extends Moveable {
    protected randomNumber: number = Math.floor(Math.random() * 2000) + 1000;
    protected counter: number = 0;
    protected time: number;
    protected changeTime: number;

    constructor(_position: Vector, _velocity: Vector) {
      super(_position);

      this.velocityX = _velocity.x;
      this.velocityY = _velocity.y;

      this.time = 0;
      this.changeTime = Math.random() * 50 + 40;
    }

    public draw(): void {
      crc2.save();
      crc2.translate(this.xPos, this.yPos);

      crc2.scale(2, 2);
      crc2.lineWidth = 2;
      crc2.strokeStyle = "black";
      crc2.fillStyle = "gold";
      crc2.beginPath();
      crc2.arc(0, 0, 8, 0, Math.PI * 2, false);
      crc2.fill();
      crc2.beginPath();
      crc2.arc(0, 0, 8, 0, Math.PI * 2, false);
      crc2.stroke();

      crc2.beginPath();
      crc2.rotate((-90 * Math.PI) / 180);
      crc2.scale(3, 2);
      crc2.arc(0, -1, 2, 0, Math.PI * 1, false);
      crc2.stroke();

      crc2.beginPath();
      crc2.fillStyle = "white";
      if (this.time % 4 < 2) {
        crc2.ellipse(2, 3, 2, 5, Math.PI / 1, 0, 2 * Math.PI);
      } else {
        crc2.ellipse(2, 3, 2, 5, Math.PI / 1.07, 0, 2 * Math.PI);
      }
      crc2.fill();
      crc2.lineWidth = 1;
      crc2.stroke();

      crc2.beginPath();
      crc2.fillStyle = "white";
      if (this.time % 4 < 2) {
        crc2.ellipse(2, -3, 2, 5, Math.PI / 1, 0, 2 * Math.PI);
      } else {
        crc2.ellipse(2, -3, 2, 5, Math.PI / 1.07, 0, 2 * Math.PI);
      }
      crc2.fill();
      crc2.lineWidth = 1;
      crc2.stroke();

      crc2.restore();
    }

    public update(): void {
      if (this.xPos > crc2.canvas.width || this.xPos < 0) {
        this.velocityX = -this.velocityX;
      }

      if (
        this.yPos > crc2.canvas.height ||
        this.yPos < crc2.canvas.height * 0.4
      ) {
        this.velocityY = -this.velocityY;
      }

      if (this.counter == this.randomNumber) {
        this.velocityX = -this.velocityX;
        this.velocityY = -this.velocityY;
        this.counter = 0;
        this.randomNumber = Math.floor(Math.random() * 2000) + 1000;
      }

      this.xPos += this.velocityX;
      this.yPos += this.velocityY;
      this.counter++;
      this.time += 0.5;

      this.draw();
    }
  }
}
