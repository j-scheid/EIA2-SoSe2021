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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        function Player(pos, playerNumber, speed, inaccuracy, team) {
            var _this = _super.call(this, pos, speed) || this;
            _this.origPosition = pos.copy();
            _this.playerNumber = playerNumber;
            _this.speed = speed;
            _this.inaccuracy = inaccuracy;
            _this.team = team;
            return _this;
        }
        Object.defineProperty(Player, "SIZE", {
            get: function () {
                return 20;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Player, "RADIUS", {
            get: function () {
                return (Final.canvas.width * (30 / 90)) / 2;
            },
            enumerable: false,
            configurable: true
        });
        Player.prototype.shouldBeRunning = function (ball) {
            return Final.Vector.getDistance(ball.position, this.position) <= Player.RADIUS;
        };
        Player.prototype.ballCollision = function (ball) {
            var r = Player.SIZE + ball.radius;
            return Final.Vector.getDistance(ball.position, this.position) <= r;
        };
        Player.prototype.mouseCollision = function () {
            return Final.Vector.getDistance(Final.mouse, this.position) <= Player.SIZE;
        };
        Player.prototype.init = function (_game) {
            var _this = this;
            document.addEventListener("click", function (e) {
                if (_this.mouseCollision()) {
                    _this.showInformation();
                }
            });
        };
        Player.prototype.makeSelectedPlayer = function () {
            var selectedPlayer = document.getElementById("selectedPlayer");
            selectedPlayer.innerHTML =
                this.team === 1
                    ? (-1 * this.playerNumber).toString()
                    : this.playerNumber.toString(); //???
        };
        Player.prototype.showInformation = function () {
            this.makeSelectedPlayer();
            var numberEl = document.getElementById("displayNumber");
            numberEl.innerHTML = this.playerNumber.toString();
            var teamEl = document.getElementById("displayTeam");
            teamEl.innerHTML = this.team.toString();
            var inaccuracyEl = document.getElementById("displayInaccuracy");
            inaccuracyEl.innerHTML = (this.inaccuracy * 100).toFixed(2) + "%";
            var speedEl = document.getElementById("displaySpeed");
            speedEl.innerHTML = this.speed.toString();
        };
        Player.prototype.update = function (game) {
            var _this = this;
            if (this.ballCollision(game.ball)) {
                game.activateShooting();
                game.ballPosession =
                    this.team === 1 ? -1 * this.playerNumber : this.playerNumber;
                game.updateGameInfo();
                var shootBall_1 = function () {
                    var diff = Final.Vector.getDifference(Final.mouse, game.ball.position);
                    var inaccuracy = Final.randomBetween(-0.25, 0.25) * _this.inaccuracy;
                    var angle = Math.atan2(diff.y, diff.x) + inaccuracy;
                    var vx = Math.cos(angle);
                    var vy = Math.sin(angle);
                    var vel = new Final.Vector(vx, vy).scale(15);
                    game.ball.vel = vel.copy();
                    // ensure ball is outside of player
                    while (_this.ballCollision(game.ball)) {
                        game.ball.position.add(vel);
                    }
                    game.state = Final.GameState.RUNNING;
                    Final.canvas.removeEventListener("click", shootBall_1);
                };
                Final.canvas.addEventListener("click", shootBall_1);
                return;
            }
            // check for collision with ball
            if (this.shouldBeRunning(game.ball)) {
                this.moveTowards(game.ball.position);
            }
            else {
                this.moveTowards(this.origPosition);
            }
        };
        Player.prototype.render = function (ctx, game) {
            var color = this.team === 1 ? game.team1Color : game.team2Color;
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.fillStyle = color;
            ctx.arc(this.position.x, this.position.y, Player.SIZE, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.font = "27px Arial";
            var digits = this.playerNumber.toString().length;
            ctx.fillText(this.playerNumber.toString(), this.position.x - 8 * digits, this.position.y + 10);
            var selectedPlayer = game.getSelectedPlayer();
            if (selectedPlayer) {
                var isSelected = this.equals(selectedPlayer);
                if (isSelected) {
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "yellow";
                    ctx.arc(this.position.x, this.position.y, Player.SIZE, 0, 2 * Math.PI, false);
                    ctx.stroke();
                }
            }
            if (Final.DEBUG) {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "red";
                ctx.arc(this.position.x, this.position.y, Player.RADIUS, 0, 2 * Math.PI, false);
                ctx.stroke();
            }
        };
        Player.prototype.equals = function (other) {
            return (other.playerNumber === this.playerNumber && other.team === this.team);
        };
        return Player;
    }(Final.Movable));
    Final.Player = Player;
})(Final || (Final = {}));
