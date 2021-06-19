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
var Advanced;
(function (Advanced) {
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
            Advanced.crc2.save();
            Advanced.crc2.translate(this.xPos, this.yPos);
            Advanced.crc2.scale(2, 2);
            Advanced.crc2.lineWidth = 2;
            Advanced.crc2.strokeStyle = "black";
            Advanced.crc2.fillStyle = "gold";
            Advanced.crc2.beginPath();
            Advanced.crc2.arc(0, 0, 8, 0, Math.PI * 2, false);
            Advanced.crc2.fill();
            Advanced.crc2.beginPath();
            Advanced.crc2.arc(0, 0, 8, 0, Math.PI * 2, false);
            Advanced.crc2.stroke();
            Advanced.crc2.beginPath();
            Advanced.crc2.rotate((-90 * Math.PI) / 180);
            Advanced.crc2.scale(3, 2);
            Advanced.crc2.arc(0, -1, 2, 0, Math.PI * 1, false);
            Advanced.crc2.stroke();
            Advanced.crc2.beginPath();
            Advanced.crc2.fillStyle = "white";
            if (this.time % 4 < 2) {
                Advanced.crc2.ellipse(2, 3, 2, 5, Math.PI / 1, 0, 2 * Math.PI);
            }
            else {
                Advanced.crc2.ellipse(2, 3, 2, 5, Math.PI / 1.07, 0, 2 * Math.PI);
            }
            Advanced.crc2.fill();
            Advanced.crc2.lineWidth = 1;
            Advanced.crc2.stroke();
            Advanced.crc2.beginPath();
            Advanced.crc2.fillStyle = "white";
            if (this.time % 4 < 2) {
                Advanced.crc2.ellipse(2, -3, 2, 5, Math.PI / 1, 0, 2 * Math.PI);
            }
            else {
                Advanced.crc2.ellipse(2, -3, 2, 5, Math.PI / 1.07, 0, 2 * Math.PI);
            }
            Advanced.crc2.fill();
            Advanced.crc2.lineWidth = 1;
            Advanced.crc2.stroke();
            Advanced.crc2.restore();
        };
        Bee.prototype.update = function () {
            if (this.xPos > Advanced.crc2.canvas.width || this.xPos < 0) {
                this.velocityX = -this.velocityX;
            }
            if (this.yPos > Advanced.crc2.canvas.height ||
                this.yPos < Advanced.crc2.canvas.height * 0.4) {
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
    }(Advanced.Moveable));
    Advanced.Bee = Bee;
})(Advanced || (Advanced = {}));
