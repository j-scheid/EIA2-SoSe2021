var Bees;
(function (Bees) {
    var Cloud = /** @class */ (function () {
        function Cloud(_position) {
            this.velocityX = 0.5;
            this.yPos = _position.y;
            this.xPos = _position.x;
        }
        Cloud.prototype.draw = function () {
            Bees.crc2.beginPath();
            Bees.crc2.save();
            Bees.crc2.scale(1.5, 1.5);
            Bees.crc2.arc(this.xPos, this.yPos, 25, 0, Math.PI * 2);
            Bees.crc2.arc(this.xPos + 25, this.yPos - 10, 25, 0, Math.PI * 2);
            Bees.crc2.arc(this.xPos + 60, this.yPos, 20, 0, Math.PI * 2);
            Bees.crc2.arc(this.xPos + 25, this.yPos, 25, 0, Math.PI * 2);
            Bees.crc2.arc(this.xPos + 45, this.yPos, 20, 0, Math.PI * 2);
            Bees.crc2.fillStyle = "rgba(255,255,255,0.7)";
            Bees.crc2.fill();
            Bees.crc2.restore();
        };
        Cloud.prototype.update = function () {
            if (this.xPos > Bees.crc2.canvas.width || this.xPos < 0) {
                this.velocityX = -this.velocityX;
            }
            this.xPos += this.velocityX;
            this.draw();
        };
        return Cloud;
    }());
    Bees.Cloud = Cloud;
})(Bees || (Bees = {}));
