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
var Final;
(function (Final) {
    var Ball = /** @class */ (function (_super) {
        __extends(Ball, _super);
        function Ball(_radius, _pos) {
            var _this = _super.call(this, _pos, 0) || this;
            _this.vel = new Final.Vector(0, 0);
            _this.radius = _radius;
            return _this;
        }
        Ball.prototype.init = function (_game) {
            return null;
        };
        Ball.prototype.update = function (_game) {
            this.position.add(this.vel);
            this.vel.scale(0.95);
        };
        Ball.prototype.render = function (_ctx, _game) {
            _ctx.beginPath();
            _ctx.lineWidth = 2;
            _ctx.fillStyle = "white";
            _ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            _ctx.fill();
        };
        return Ball;
    }(Final.Movable));
    Final.Ball = Ball;
})(Final || (Final = {}));
