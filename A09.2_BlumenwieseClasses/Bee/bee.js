var Bees;
(function (Bees) {
    var Bee = /** @class */ (function () {
        function Bee(_position, _velocity) {
            this.randomNumber = Math.floor(Math.random() * 2000) + 1000;
            this.counter = 0;
            this.xPos = _position.x;
            this.yPos = _position.y;
            this.velocityX = _velocity.x;
            this.velocityY = _velocity.y;
            this.time = 0;
            this.changeTime = Math.random() * 50 + 40;
        }
        Bee.prototype.draw = function () {
            Bees.crc2.save();
            Bees.crc2.translate(this.xPos, this.yPos);
            Bees.crc2.scale(2, 2);
            Bees.crc2.lineWidth = 2;
            Bees.crc2.strokeStyle = "black";
            Bees.crc2.fillStyle = "gold";
            Bees.crc2.beginPath();
            Bees.crc2.arc(0, 0, 8, 0, Math.PI * 2, false);
            Bees.crc2.fill();
            Bees.crc2.beginPath();
            Bees.crc2.arc(0, 0, 8, 0, Math.PI * 2, false);
            Bees.crc2.stroke();
            Bees.crc2.beginPath();
            Bees.crc2.rotate((-90 * Math.PI) / 180);
            Bees.crc2.scale(3, 2);
            Bees.crc2.arc(0, -1, 2, 0, Math.PI * 1, false);
            Bees.crc2.stroke();
            Bees.crc2.beginPath();
            Bees.crc2.fillStyle = "white";
            if (this.time % 4 < 2) {
                Bees.crc2.ellipse(2, 3, 2, 5, Math.PI / 1, 0, 2 * Math.PI);
            }
            else {
                Bees.crc2.ellipse(2, 3, 2, 5, Math.PI / 1.07, 0, 2 * Math.PI);
            }
            Bees.crc2.fill();
            Bees.crc2.lineWidth = 1;
            Bees.crc2.stroke();
            Bees.crc2.beginPath();
            Bees.crc2.fillStyle = "white";
            if (this.time % 4 < 2) {
                Bees.crc2.ellipse(2, -3, 2, 5, Math.PI / 1, 0, 2 * Math.PI);
            }
            else {
                Bees.crc2.ellipse(2, -3, 2, 5, Math.PI / 1.07, 0, 2 * Math.PI);
            }
            Bees.crc2.fill();
            Bees.crc2.lineWidth = 1;
            Bees.crc2.stroke();
            Bees.crc2.restore();
        };
        Bee.prototype.update = function () {
            if (this.xPos > Bees.crc2.canvas.width || this.xPos < 0) {
                this.velocityX = -this.velocityX;
            }
            if (this.yPos > Bees.crc2.canvas.height ||
                this.yPos < Bees.crc2.canvas.height * 0.4) {
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
        };
        return Bee;
    }());
    Bees.Bee = Bee;
})(Bees || (Bees = {}));
