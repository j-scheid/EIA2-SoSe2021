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
    var Linesman = /** @class */ (function (_super) {
        __extends(Linesman, _super);
        function Linesman(_pos) {
            return _super.call(this, _pos, 5) || this;
        }
        Linesman.prototype.init = function (_game) {
            return null;
        };
        Linesman.prototype.update = function (_game) {
            if (_game.ball.position.y < this.position.y) {
                this.position.y -= this.speed;
            }
            else if (_game.ball.position.y > this.position.y) {
                this.position.y += this.speed;
            }
        };
        Linesman.prototype.render = function (_ctx, _game) {
            _ctx.beginPath();
            _ctx.lineWidth = 2;
            _ctx.fillStyle = "#353535";
            _ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
            _ctx.fill();
            _ctx.beginPath();
            _ctx.lineWidth = 2;
            _ctx.fillStyle = "#a0e5da";
            _ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
            _ctx.fill();
        };
        return Linesman;
    }(Final.Movable));
    Final.Linesman = Linesman;
})(Final || (Final = {}));
