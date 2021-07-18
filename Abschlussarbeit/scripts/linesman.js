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
        function Linesman(pos) {
            return _super.call(this, pos, 5) || this;
        }
        Object.defineProperty(Linesman, "SIZE", {
            get: function () {
                return 20;
            },
            enumerable: false,
            configurable: true
        });
        Linesman.prototype.init = function (game) {
            return null;
        };
        Linesman.prototype.update = function (game) {
            if (game.ball.position.y < this.position.y) {
                this.position.y -= this.speed;
            }
            else if (game.ball.position.y > this.position.y) {
                this.position.y += this.speed;
            }
        };
        Linesman.prototype.render = function (ctx, game) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.fillStyle = "green";
            ctx.arc(this.position.x, this.position.y, Linesman.SIZE, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.fillStyle = "#88FF00";
            ctx.arc(this.position.x, this.position.y, Linesman.SIZE / 2, 0, 2 * Math.PI, false);
            ctx.fill();
        };
        return Linesman;
    }(Final.Movable));
    Final.Linesman = Linesman;
})(Final || (Final = {}));
