namespace Advanced {
    export class Cloud extends Moveable {
        protected velocityX: number = 0.5;

        public draw(): void {
            crc2.beginPath();
            crc2.save();
            crc2.scale(1.5, 1.5);
            crc2.arc(this.xPos, this.yPos, 25, 0, Math.PI * 2);
            crc2.arc(this.xPos + 25, this.yPos - 10, 25, 0, Math.PI * 2);
            crc2.arc(this.xPos + 60, this.yPos, 20, 0, Math.PI * 2);
            crc2.arc(this.xPos + 25, this.yPos, 25, 0, Math.PI * 2);
            crc2.arc(this.xPos + 45, this.yPos, 20, 0, Math.PI * 2);
            crc2.fillStyle = "rgba(255,255,255,0.7)";
            crc2.fill();
            crc2.restore();
        }
    }
}