namespace Bees {
    export class Cloud {
        xPos: number;
        yPos: number; 
        velocityX: number = 0.5;

        constructor(_position: Vector) {
            this.yPos = _position.y;
            this.xPos = _position.x;
        }

        draw(): void {

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

        update(): void {
           
            if (this.xPos > crc2.canvas.width || this.xPos < 0) {
                this.velocityX = -this.velocityX;
            }
            
            this.xPos += this.velocityX;
            
            this.draw();
        }
    }
}