var Final;
(function (Final) {
    var Field = /** @class */ (function () {
        function Field(_width, _height) {
            this.width = _width;
            this.height = _height;
            var goalWidth = 200;
            var goalHeight = 5;
            this.goalTeam1 = new Final.Rectangle(new Final.Vector((this.width - goalWidth) / 2, 0), goalWidth, goalHeight);
            this.goalTeam2 = new Final.Rectangle(new Final.Vector((this.width - goalWidth) / 2, this.height - goalHeight), goalWidth, goalHeight);
            var penaltyWidth = 350;
            var penaltyHeight = 120;
            this.penaltyTeam1 = new Final.Rectangle(new Final.Vector((this.width - penaltyWidth) / 2, 0), penaltyWidth, penaltyHeight);
            this.penaltyTeam2 = new Final.Rectangle(new Final.Vector((this.width - penaltyWidth) / 2, this.height - penaltyHeight), penaltyWidth, penaltyHeight);
        }
        Field.prototype.update = function (_game) {
            // Sounds from https://www.freesoundslibrary.com/
            var cheer = new Audio("assets/Crowd-booing.mp3");
            var boo = new Audio("assets/aww-sound-effect.mp3");
            if (this.checkGoal1(_game.ball)) {
                _game.scoreTeam2 += 1;
                _game.updateGameInfo();
                _game.resetBall(2);
                cheer.play();
            }
            else if (this.checkGoal2(_game.ball)) {
                _game.scoreTeam1 += 1;
                _game.updateGameInfo();
                _game.resetBall(1);
                cheer.play();
            }
            if (this.outOfPlay(_game)) {
                _game.resetBall();
                boo.play();
            }
        };
        Field.prototype.render = function (_ctx, _game) {
            // middle line
            _ctx.strokeStyle = "white";
            _ctx.lineWidth = 2;
            _ctx.beginPath();
            _ctx.moveTo(0, this.height / 2);
            _ctx.lineTo(this.width, this.height / 2);
            _ctx.stroke();
            // border
            _ctx.strokeStyle = "white";
            _ctx.lineWidth = 4;
            _ctx.strokeRect(0, 0, this.width, this.height);
            // middle circle
            _ctx.strokeStyle = "white";
            _ctx.beginPath();
            _ctx.lineWidth = 2;
            _ctx.arc(this.width / 2, this.height / 2, 100, 0, 2 * Math.PI, false);
            _ctx.stroke();
            // goals
            _ctx.strokeStyle = _game.team1Color;
            _ctx.lineWidth = 5;
            _ctx.strokeRect(this.goalTeam1.position.x, this.goalTeam1.position.y, this.goalTeam1.width, this.goalTeam1.height);
            _ctx.strokeStyle = _game.team2Color;
            _ctx.strokeRect(this.goalTeam2.position.x, this.goalTeam2.position.y, this.goalTeam2.width, this.goalTeam2.height);
            // penalty area
            _ctx.strokeStyle = "white";
            _ctx.lineWidth = 2;
            _ctx.strokeRect(this.penaltyTeam1.position.x, this.penaltyTeam1.position.y, this.penaltyTeam1.width, this.penaltyTeam1.height);
            _ctx.strokeStyle = "white";
            _ctx.strokeRect(this.penaltyTeam2.position.x, this.penaltyTeam2.position.y, this.penaltyTeam2.width, this.penaltyTeam2.height);
        };
        Field.prototype.outOfPlay = function (_game) {
            var fieldRect = new Final.Rectangle(new Final.Vector(0, 0), this.width, this.height);
            return !this.checkRectangleBallCollision(_game.ball, fieldRect);
        };
        Field.prototype.checkRectangleBallCollision = function (_ball, _rect) {
            var distX = Math.abs(_ball.position.x - _rect.position.x - _rect.width / 2);
            var distY = Math.abs(_ball.position.y - _rect.position.y - _rect.height / 2);
            if (distX > _rect.width / 2 + _ball.radius)
                return false;
            if (distY > _rect.height / 2 + _ball.radius)
                return false;
            if (distX <= _rect.width / 2)
                return true;
            if (distY <= _rect.height / 2)
                return true;
            var dx = distX - _rect.width / 2;
            var dy = distY - _rect.height / 2;
            return dx * dx + dy * dy <= _ball.radius * _ball.radius;
        };
        Field.prototype.checkGoal1 = function (_ball) {
            return this.checkRectangleBallCollision(_ball, this.goalTeam1);
        };
        Field.prototype.checkGoal2 = function (_ball) {
            return this.checkRectangleBallCollision(_ball, this.goalTeam2);
        };
        return Field;
    }());
    Final.Field = Field;
})(Final || (Final = {}));
