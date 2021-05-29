var Bees;
(function (Bees) {
    var Flower = /** @class */ (function () {
        function Flower(_flowerType, _flowerColor, _xPos, _yRandomMin, _yRandomMax) {
            this.xPos = _xPos;
            this.flowerType = _flowerType;
            this.flowerColor = _flowerColor;
            this.yRandomMax = _yRandomMax;
            this.yRandomMin = _yRandomMin;
            this.draw();
        }
        Flower.prototype.draw = function () {
            var randomScale = 0.5 + Math.random() * (0.8 - 0.5);
            var y = this.yRandomMin + Math.random() * (this.yRandomMax - this.yRandomMin);
            Bees.crc2.save();
            Bees.crc2.translate(this.xPos, y);
            Bees.crc2.scale(randomScale, randomScale);
            Bees.crc2.fillStyle = "green";
            Bees.crc2.fillRect(0, 0, 5, 40);
            if (this.flowerType == 1) {
                for (var index = 0; index < 4; index++) {
                    Bees.crc2.beginPath();
                    Bees.crc2.rotate(Math.PI / 2);
                    Bees.crc2.moveTo(0, 0);
                    Bees.crc2.lineTo(-15, -15);
                    Bees.crc2.lineTo(-5, -10);
                    Bees.crc2.lineTo(0, -15);
                    Bees.crc2.lineTo(5, -10);
                    Bees.crc2.lineTo(15, -15);
                    Bees.crc2.closePath();
                    Bees.crc2.fillStyle = this.flowerColor;
                    Bees.crc2.fill();
                }
                Bees.crc2.restore();
            }
            else {
                Bees.crc2.beginPath();
                Bees.crc2.moveTo(0, 0);
                Bees.crc2.lineTo(-15, -5);
                Bees.crc2.lineTo(-25, -30);
                Bees.crc2.lineTo(-10, -20);
                Bees.crc2.lineTo(0, -40);
                Bees.crc2.lineTo(10, -20);
                Bees.crc2.lineTo(25, -30);
                Bees.crc2.lineTo(15, -5);
                Bees.crc2.closePath();
                Bees.crc2.fillStyle = this.flowerColor;
                Bees.crc2.fill();
                Bees.crc2.restore();
            }
        };
        return Flower;
    }());
    Bees.Flower = Flower;
})(Bees || (Bees = {}));
