var Final;
(function (Final) {
    var Movable = /** @class */ (function () {
        function Movable(_position, _speed) {
            this.position = _position.copy();
            this.speed = _speed;
        }
        Movable.prototype.moveTowards = function (target, variableAngle) {
            var diff = Final.Vector.getDifference(target, this.position);
            var angle = Math.atan2(diff.y, diff.x) + (variableAngle || 0);
            var vx = Math.cos(angle);
            var vy = Math.sin(angle);
            var vel = new Final.Vector(vx, vy).scale(this.speed);
            this.position.add(vel);
        };
        return Movable;
    }());
    Final.Movable = Movable;
})(Final || (Final = {}));
