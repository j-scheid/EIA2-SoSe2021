namespace Advanced {
  export class FirstFlower extends Flower {

    public nectarCurr: number = 0;
    public nectarMax: number = 10;

    constructor(_xPos: number, _yPos: number, _opacity: number) {
      super(_xPos, _yPos, _opacity);
      this.draw(_xPos, _yPos, _opacity);
    }

    public draw(xPos: number, y: number, opacity: number): void {
      let randomColor: string = "rgba(255, 200, 100, " + opacity + ")";
      let randomScale: number = 0.5 + Math.random() * (0.8 - 0.5);
      crc2.save();
      crc2.translate(xPos, y);
      crc2.scale(randomScale, randomScale);
      crc2.fillStyle = "green";
      crc2.fillRect(0, 0, 5, 40);

      for (let index: number = 0; index < 4; index++) {
        crc2.beginPath();
        crc2.rotate(Math.PI / 2);
        crc2.moveTo(0, 0);
        crc2.lineTo(-15, -15);
        crc2.lineTo(-5, -10);
        crc2.lineTo(0, -15);
        crc2.lineTo(5, -10);
        crc2.lineTo(15, -15);
        crc2.closePath();
        crc2.fillStyle = randomColor;
        crc2.fill();
      }
      crc2.restore();
    }

  }
}
