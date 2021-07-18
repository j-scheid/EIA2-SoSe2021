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
        function Referee(pos) {
            return _super.call(this, pos, 4) || this;
        }
        Object.defineProperty(Referee, "SIZE", {
            get: function () {
                return 20;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Referee, "RADIUS", {
            get: function () {
                return (Final.canvas.width * (60 / 90)) / 2;
            },
            enumerable: false,
            configurable: true
        });
        Referee.prototype.shouldBeRunning = function (ball) {
            return Final.Vector.getDistance(ball.position, this.position) > Referee.RADIUS;
        };
        Referee.prototype.init = function (game) { return null; };
        Referee.prototype.update = function (game) {
            if (this.shouldBeRunning(game.ball)) {
                this.moveTowards(game.ball.position);
            }
        };
        Referee.prototype.render = function (ctx, game) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.fillStyle = "#23231f";
            ctx.arc(this.position.x, this.position.y, Referee.SIZE, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.fillStyle = "#efef15";
            ctx.arc(this.position.x, this.position.y, Referee.SIZE / 2, 0, 2 * Math.PI, false);
            ctx.fill();
            if (Final.DEBUG) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "pink";
                ctx.arc(this.position.x, this.position.y, Referee.RADIUS, 0, 2 * Math.PI, false);
                ctx.stroke();
            }
        };
        return Referee;
    }(Final.Movable));
    Final.Referee = Referee;
})(Final || (Final = {}));
