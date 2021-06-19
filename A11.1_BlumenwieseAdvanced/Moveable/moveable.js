var Advanced;
(function (Advanced) {
    var Moveable = /** @class */ (function () {
        function Moveable(_position) {
            this.yPos = _position.y;
            this.xPos = _position.x;
        }
        Moveable.prototype.update = function () {
            if (this.xPos > Advanced.crc2.canvas.width || this.xPos < 0) {
                this.velocityX = -this.velocityX;
            }
            this.xPos += this.velocityX;
        };
        return Moveable;
    }());
    Advanced.Moveable = Moveable;
})(Advanced || (Advanced = {}));
