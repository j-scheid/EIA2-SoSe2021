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
    var SecondFlower = /** @class */ (function (_super) {
        __extends(SecondFlower, _super);
        function SecondFlower(_xPos, _yPos, _opacity) {
            var _this = _super.call(this, _xPos, _yPos, _opacity) || this;
            _this.nectarCurr = 0;
            _this.nectarMax = 10;
            _this.draw(_xPos, _yPos, _opacity);
            return _this;
        }
        SecondFlower.prototype.draw = function (xPos, y, opacity) {
            var randomColor = "rgba(255, 20, 100, " + opacity + ")";
            var randomScale = 0.5 + Math.random() * (0.8 - 0.5);
            Advanced.crc2.save();
            Advanced.crc2.translate(xPos, y);
            Advanced.crc2.scale(randomScale, randomScale);
            Advanced.crc2.fillStyle = "green";
            Advanced.crc2.fillRect(0, 0, 5, 40);
            Advanced.crc2.beginPath();
            Advanced.crc2.moveTo(0, 0);
            Advanced.crc2.lineTo(-15, -5);
            Advanced.crc2.lineTo(-25, -30);
            Advanced.crc2.lineTo(-10, -20);
            Advanced.crc2.lineTo(0, -40);
            Advanced.crc2.lineTo(10, -20);
            Advanced.crc2.lineTo(25, -30);
            Advanced.crc2.lineTo(15, -5);
            Advanced.crc2.closePath();
            Advanced.crc2.fillStyle = randomColor;
            Advanced.crc2.fill();
            Advanced.crc2.restore();
        };
        return SecondFlower;
    }(Advanced.Flower));
    Advanced.SecondFlower = SecondFlower;
})(Advanced || (Advanced = {}));
