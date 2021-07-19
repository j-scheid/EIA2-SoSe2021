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
        function Player(_position, _playerNumber, _speed, _inaccuracy, _team) {
            var _this = _super.call(this, _position, _speed) || this;
            _this.origPosition = _position.copy();
            _this.playerNumber = _playerNumber;
            _this.speed = _speed;
            _this.inaccuracy = _inaccuracy;
            _this.team = _team;
            return _this;
        }
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
                    : this.playerNumber.toString();
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
        Player.prototype.update = function (_game) {
            var _this = this;
            if (this.ballCollision(_game.ball)) {
                _game.activateShooting();
                _game.ballPosession =
                    this.team === 1 ? -1 * this.playerNumber : this.playerNumber;
                _game.updateGameInfo();
                var shootBall_1 = function () {
                    var diff = Final.Vector.getDifference(Final.mouse, _game.ball.position);
                    var inaccuracy = Final.randomBetween(-0.25, 0.25) * _this.inaccuracy;
                    var angle = Math.atan2(diff.y, diff.x) + inaccuracy;
                    var vx = Math.cos(angle);
                    var vy = Math.sin(angle);
                    var vel = new Final.Vector(vx, vy).scale(15);
                    _game.ball.vel = vel.copy();
                    // ensure ball is outside of player
                    while (_this.ballCollision(_game.ball)) {
                        _game.ball.position.add(vel);
                    }
                    _game.state = Final.GameState.RUNNING;
                    Final.canvas.removeEventListener("click", shootBall_1);
                };
                Final.canvas.addEventListener("click", shootBall_1);
                return;
            }
            // check for collision with ball
            if (this.shouldBeRunning(_game.ball)) {
                this.moveTowards(_game.ball.position);
            }
            else {
                this.moveTowards(this.origPosition);
            }
        };
        Player.prototype.render = function (_ctx, _game) {
            var color = this.team === 1 ? _game.team1Color : _game.team2Color;
            _ctx.beginPath();
            _ctx.lineWidth = 2;
            _ctx.fillStyle = color;
            _ctx.arc(this.position.x, this.position.y, 20, //20 = Player size
            0, 2 * Math.PI, false);
            _ctx.fill();
            _ctx.fillStyle = "black";
            _ctx.font = "27px Arial";
            var digits = this.playerNumber.toString().length;
            _ctx.fillText(this.playerNumber.toString(), this.position.x - 8 * digits, this.position.y + 10);
            var selectedPlayer = _game.getSelectedPlayer();
            if (selectedPlayer) {
                var isSelected = this.equals(selectedPlayer);
                if (isSelected) {
                    _ctx.beginPath();
                    _ctx.lineWidth = 2;
                    _ctx.strokeStyle = "yellow";
                    _ctx.arc(this.position.x, this.position.y, 20, //20 = Player size
                    0, 2 * Math.PI, false);
                    _ctx.stroke();
                }
            }
            if (Final.DEBUG) {
                _ctx.beginPath();
                _ctx.lineWidth = 2;
                _ctx.strokeStyle = "red";
                _ctx.arc(this.position.x, this.position.y, (Final.canvas.width * (30 / 90)) / 2, //Radius
                0, 2 * Math.PI, false);
                _ctx.stroke();
            }
        };
        Player.prototype.shouldBeRunning = function (_ball) {
            return Final.Vector.getDistance(_ball.position, this.position) <= (Final.canvas.width * (30 / 90)) / 2;
        };
        Player.prototype.ballCollision = function (_ball) {
            var r = 20 + _ball.radius; //20 = Player size
            return Final.Vector.getDistance(_ball.position, this.position) <= r;
        };
        Player.prototype.mouseCollision = function () {
            return Final.Vector.getDistance(Final.mouse, this.position) <= 20; //20 = Player size
        };
        Player.prototype.equals = function (_other) {
            return (_other.playerNumber === this.playerNumber && _other.team === this.team);
        };
        return Player;
    }(Final.Movable));
    Final.Player = Player;
})(Final || (Final = {}));
