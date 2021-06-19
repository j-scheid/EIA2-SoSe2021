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
    var Cloud = /** @class */ (function (_super) {
        __extends(Cloud, _super);
        function Cloud() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.velocityX = 0.5;
            return _this;
        }
        Cloud.prototype.draw = function () {
            Advanced.crc2.beginPath();
            Advanced.crc2.save();
            Advanced.crc2.scale(1.5, 1.5);
            Advanced.crc2.arc(this.xPos, this.yPos, 25, 0, Math.PI * 2);
            Advanced.crc2.arc(this.xPos + 25, this.yPos - 10, 25, 0, Math.PI * 2);
            Advanced.crc2.arc(this.xPos + 60, this.yPos, 20, 0, Math.PI * 2);
            Advanced.crc2.arc(this.xPos + 25, this.yPos, 25, 0, Math.PI * 2);
            Advanced.crc2.arc(this.xPos + 45, this.yPos, 20, 0, Math.PI * 2);
            Advanced.crc2.fillStyle = "rgba(255,255,255,0.7)";
            Advanced.crc2.fill();
            Advanced.crc2.restore();
        };
        return Cloud;
    }(Advanced.Moveable));
    Advanced.Cloud = Cloud;
})(Advanced || (Advanced = {}));
