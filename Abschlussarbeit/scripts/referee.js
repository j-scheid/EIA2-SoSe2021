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
    var Referee = /** @class */ (function (_super) {
        __extends(Referee, _super);
        function Referee(_pos) {
            return _super.call(this, _pos, 4) || this;
        }
        Referee.prototype.init = function (_game) {
            return null;
        };
        Referee.prototype.update = function (_game) {
            if (this.shouldBeRunning(_game.ball)) {
                this.moveTowards(_game.ball.position);
            }
        };
        Referee.prototype.render = function (_ctx, _game) {
            _ctx.beginPath();
            _ctx.lineWidth = 2;
            _ctx.fillStyle = "#23231f";
            _ctx.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
            _ctx.fill();
            _ctx.beginPath();
            _ctx.lineWidth = 2;
            _ctx.fillStyle = "#efef15";
            _ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
            _ctx.fill();
            if (Final.DEBUG) {
                _ctx.beginPath();
                _ctx.lineWidth = 2;
                _ctx.strokeStyle = "pink";
                _ctx.arc(this.position.x, this.position.y, (Final.canvas.width * (60 / 90)) / 2, //radius
                0, 2 * Math.PI, false);
                _ctx.stroke();
            }
        };
        Referee.prototype.shouldBeRunning = function (_ball) {
            return (Final.Vector.getDistance(_ball.position, this.position) >
                (Final.canvas.width * (60 / 90)) / 2); //smaller than Referee Radius
        };
        return Referee;
    }(Final.Movable));
    Final.Referee = Referee;
})(Final || (Final = {}));
