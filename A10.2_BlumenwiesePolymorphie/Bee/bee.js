var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Polymorphie;
(function (Polymorphie) {
    var Bee = /** @class */ (function (_super) {
        __extends(Bee, _super);
        function Bee(_position, _velocity) {
            var _this = _super.call(this, _position) || this;
            _this.randomNumber = Math.floor(Math.random() * 2000) + 1000;
            _this.counter = 0;
            _this.velocityX = _velocity.x;
            _this.velocityY = _velocity.y;
            _this.time = 0;
            _this.changeTime = Math.random() * 50 + 40;
            return _this;
        }
        Bee.prototype.draw = function () {
            Polymorphie.crc2.save();
            Polymorphie.crc2.translate(this.xPos, this.yPos);
            Polymorphie.crc2.scale(2, 2);
            Polymorphie.crc2.lineWidth = 2;
            Polymorphie.crc2.strokeStyle = "black";
            Polymorphie.crc2.fillStyle = "gold";
            Polymorphie.crc2.beginPath();
            Polymorphie.crc2.arc(0, 0, 8, 0, Math.PI * 2, false);
            Polymorphie.crc2.fill();
            Polymorphie.crc2.beginPath();
            Polymorphie.crc2.arc(0, 0, 8, 0, Math.PI * 2, false);
            Polymorphie.crc2.stroke();
            Polymorphie.crc2.beginPath();
            Polymorphie.crc2.rotate((-90 * Math.PI) / 180);
            Polymorphie.crc2.scale(3, 2);
            Polymorphie.crc2.arc(0, -1, 2, 0, Math.PI * 1, false);
            Polymorphie.crc2.stroke();
            Polymorphie.crc2.beginPath();
            Polymorphie.crc2.fillStyle = "white";
            if (this.time % 4 < 2) {
                Polymorphie.crc2.ellipse(2, 3, 2, 5, Math.PI / 1, 0, 2 * Math.PI);
            }
            else {
                Polymorphie.crc2.ellipse(2, 3, 2, 5, Math.PI / 1.07, 0, 2 * Math.PI);
            }
            Polymorphie.crc2.fill();
            Polymorphie.crc2.lineWidth = 1;
            Polymorphie.crc2.stroke();
            Polymorphie.crc2.beginPath();
            Polymorphie.crc2.fillStyle = "white";
            if (this.time % 4 < 2) {
                Polymorphie.crc2.ellipse(2, -3, 2, 5, Math.PI / 1, 0, 2 * Math.PI);
            }
            else {
                Polymorphie.crc2.ellipse(2, -3, 2, 5, Math.PI / 1.07, 0, 2 * Math.PI);
            }
            Polymorphie.crc2.fill();
            Polymorphie.crc2.lineWidth = 1;
            Polymorphie.crc2.stroke();
            Polymorphie.crc2.restore();
        };
        //brauche ich noch für den Flügelschlag
        Bee.prototype.update = function () {
            if (this.xPos > Polymorphie.crc2.canvas.width || this.xPos < 0) {
                this.velocityX = -this.velocityX;
            }
            if (this.yPos > Polymorphie.crc2.canvas.height ||
                this.yPos < Polymorphie.crc2.canvas.height * 0.4) {
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
    }(Polymorphie.Moveable));
    Polymorphie.Bee = Bee;
})(Polymorphie || (Polymorphie = {}));
