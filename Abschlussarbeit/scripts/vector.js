var Final;
(function (Final) {
    var Vector = /** @class */ (function () {
        function Vector(_x, _y) {
            if (_x === void 0) { _x = 0; }
            if (_y === void 0) { _y = 0; }
            this.set(_x, _y);
        }
        Vector.getDifference = function (_v0, _v1) {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        };
        Vector.getDistanceSqrd = function (_v0, _v1) {
            return Math.pow((_v0.x - _v1.x), 2) + Math.pow((_v0.y - _v1.y), 2);
        };
        Vector.getDistance = function (_v0, _v1) {
            return Math.sqrt(Vector.getDistanceSqrd(_v0, _v1));
        };
        Vector.getRandom = function (_minLength, _maxLength) {
            var length = _minLength + Math.random() * (_maxLength - _minLength);
            var direction = Math.random() * 2 * Math.PI;
            return Vector.getPolar(direction, length);
        };
        Vector.getPolar = function (_angle, _length) {
            var vector = new Vector();
            vector.set(Math.cos(_angle), Math.sin(_angle));
            vector.scale(_length);
            return vector;
        };
        Object.defineProperty(Vector.prototype, "length", {
            get: function () {
                return Math.hypot(this.x, this.y);
            },
            enumerable: false,
            configurable: true
        });
        Vector.prototype.set = function (_x, _y) {
            this.x = _x;
            this.y = _y;
            return this;
        };
        Vector.prototype.scale = function (_factor) {
            this.x *= _factor;
            this.y *= _factor;
            return this;
        };
        Vector.prototype.add = function (_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
            return this;
        };
        Vector.prototype.copy = function () {
            return new Vector(this.x, this.y);
        };
        return Vector;
    }());
    Final.Vector = Vector;
})(Final || (Final = {}));
