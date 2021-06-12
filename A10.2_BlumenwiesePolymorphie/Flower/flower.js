var Polymorphie;
(function (Polymorphie) {
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
            Polymorphie.crc2.save();
            Polymorphie.crc2.translate(this.xPos, y);
            Polymorphie.crc2.scale(randomScale, randomScale);
            Polymorphie.crc2.fillStyle = "green";
            Polymorphie.crc2.fillRect(0, 0, 5, 40);
            if (this.flowerType == 1) {
                for (var index = 0; index < 4; index++) {
                    Polymorphie.crc2.beginPath();
                    Polymorphie.crc2.rotate(Math.PI / 2);
                    Polymorphie.crc2.moveTo(0, 0);
                    Polymorphie.crc2.lineTo(-15, -15);
                    Polymorphie.crc2.lineTo(-5, -10);
                    Polymorphie.crc2.lineTo(0, -15);
                    Polymorphie.crc2.lineTo(5, -10);
                    Polymorphie.crc2.lineTo(15, -15);
                    Polymorphie.crc2.closePath();
                    Polymorphie.crc2.fillStyle = this.flowerColor;
                    Polymorphie.crc2.fill();
                }
                Polymorphie.crc2.restore();
            }
            else {
                Polymorphie.crc2.beginPath();
                Polymorphie.crc2.moveTo(0, 0);
                Polymorphie.crc2.lineTo(-15, -5);
                Polymorphie.crc2.lineTo(-25, -30);
                Polymorphie.crc2.lineTo(-10, -20);
                Polymorphie.crc2.lineTo(0, -40);
                Polymorphie.crc2.lineTo(10, -20);
                Polymorphie.crc2.lineTo(25, -30);
                Polymorphie.crc2.lineTo(15, -5);
                Polymorphie.crc2.closePath();
                Polymorphie.crc2.fillStyle = this.flowerColor;
                Polymorphie.crc2.fill();
                Polymorphie.crc2.restore();
            }
        };
        return Flower;
    }());
    Polymorphie.Flower = Flower;
})(Polymorphie || (Polymorphie = {}));
