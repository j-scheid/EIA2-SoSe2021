var Final;
(function (Final) {
    var Game = /** @class */ (function () {
        function Game() {
            this.scoreTeam1 = 0;
            this.scoreTeam2 = 0;
            this.state = Final.GameState.RUNNING;
            this.field = new Final.Field(Final.canvas.width, Final.canvas.height);
            this.ball = new Final.Ball(15, new Final.Vector(this.field.width / 2 - 70, this.field.height / 2 - 70));
            this.entities = [];
            this.team1Color = "#FF00FF";
            this.team2Color = "#0077FF";
            this.initSoccer();
            this.initGUI();
            this.initArrowKeys();
        }
        Game.prototype.getPlayers = function () {
            return this.entities.filter(function (e) { return e instanceof Final.Player; });
        };
        Game.prototype.initArrowKeys = function () {
            var _this = this;
            document.addEventListener("keydown", function (event) {
                var selectedPlayer = _this.getSelectedPlayer();
                var index = selectedPlayer
                    ? _this.getPlayers().indexOf(selectedPlayer)
                    : 0;
                var nextIndex = 0;
                if (event.key === "ArrowLeft") {
                    nextIndex = index - 1;
                    if (nextIndex < 0)
                        nextIndex = _this.getPlayers().length - 1;
                }
                else if (event.key === "ArrowRight") {
                    nextIndex = index + 1;
                    if (nextIndex >= _this.getPlayers().length)
                        nextIndex = 0;
                }
                var newPlayer = _this.getPlayers()[nextIndex];
                newPlayer.makeSelectedPlayer();
                newPlayer.showInformation();
            });
        };
        Game.prototype.initSoccer = function () {
            var _this = this;
            // PLAYER
            var counter = 1;
            for (var row = 0; row < 6; row++) {
                if (row % 2 === 0) {
                    for (var i = 0; i < 4; i++) {
                        var team = counter % 2 == 0 ? 1 : 2;
                        var speed = this.getSpeedFromSettings();
                        var inaccuracy = this.getInaccuracyFromSettings();
                        var pos = new Final.Vector(i * (this.field.width / 4) + this.field.width / 4 / 2, row * (this.field.height / 6) + this.field.height / 6 / 2);
                        var player = new Final.Player(pos, counter, speed, inaccuracy, team);
                        this.entities.push(player);
                        counter += 1;
                    }
                }
                else {
                    for (var i = 0; i < 3; i++) {
                        var team = counter % 2 == 0 ? 1 : 2;
                        var speed = this.getSpeedFromSettings();
                        var inaccuracy = this.getInaccuracyFromSettings();
                        var pos = new Final.Vector(i * (this.field.width / 3) + this.field.width / 3 / 2, row * (this.field.height / 6) + this.field.height / 6 / 2);
                        var player = new Final.Player(pos, counter, speed, inaccuracy, team);
                        this.entities.push(player);
                        counter += 1;
                    }
                }
            }
            // REFEREE
            var referee = new Final.Referee(new Final.Vector(this.field.width / 2 - Final.Referee.SIZE / 2, this.field.height / 2 - Final.Referee.SIZE / 2));
            this.entities.push(referee);
            // LINESMEN
            var linesman1 = new Final.Linesman(new Final.Vector(0, this.ball.position.y));
            var linesman2 = new Final.Linesman(new Final.Vector(this.field.width, this.ball.position.y));
            this.entities.push(linesman1);
            this.entities.push(linesman2);
            this.entities.forEach(function (e) { return e.init(_this); });
        };
        Game.prototype.getInaccuracyFromSettings = function () {
            var minInaccuracy = parseInt(document.getElementById("minInaccuracy").value) / 100;
            var maxInaccuracy = parseInt(document.getElementById("maxInaccuracy").value) / 100;
            return Final.randomBetween(minInaccuracy, maxInaccuracy);
        };
        Game.prototype.getSelectedPlayer = function () {
            var selectedPlayerEl = document.getElementById("selectedPlayer");
            if (!selectedPlayerEl)
                return;
            var selectedPlayer = parseInt(selectedPlayerEl.innerHTML);
            var team = selectedPlayer < 0 ? 1 : 2;
            return this.entities
                .filter(function (e) { return e instanceof Final.Player; })
                .filter(function (e) { return e.team === team; })
                .find(function (e) { return e.playerNumber === Math.abs(selectedPlayer); });
        };
        Game.prototype.getSpeedFromSettings = function () {
            var minSpeed = parseInt(document.getElementById("minSpeed").value);
            var maxSpeed = parseInt(document.getElementById("maxSpeed").value);
            return Math.floor(Final.randomBetween(minSpeed, maxSpeed + 1));
        };
        Game.prototype.initGUI = function () {
            var _this = this;
            // COLOR PICKER
            var picker1 = document.getElementById("color1");
            var picker2 = document.getElementById("color2");
            picker1.value = this.team1Color;
            picker2.value = this.team2Color;
            picker1.addEventListener("change", function (e) {
                _this.team1Color = picker1.value;
            });
            picker2.addEventListener("change", function (e) {
                _this.team2Color = picker2.value;
            });
            // PLAYER ATTRIBUTES
            var form = document.querySelector("#settingsDialog form");
            form.addEventListener("submit", function () {
                _this.entities
                    .filter(function (e) { return e instanceof Final.Player; })
                    .forEach(function (e) {
                    var player = e;
                    player.speed = _this.getSpeedFromSettings();
                    player.inaccuracy = _this.getInaccuracyFromSettings();
                });
            });
            // PLAYER REMOVAL
            var removeBtn = document.getElementById("removeBtn");
            removeBtn.addEventListener("click", function (e) {
                var selectedPlayer = _this.getSelectedPlayer();
                if (!selectedPlayer)
                    return;
                var idx = _this.entities.indexOf(selectedPlayer);
                _this.entities.splice(idx, 1);
            });
            // PLAYER ADDING
            var addBtn = document.getElementById("addBtn");
            addBtn.addEventListener("click", function (e) {
                _this.state = Final.GameState.ADD_PLAYER;
                var addPlayer = function () {
                    var selectedPlayer = _this.getSelectedPlayer();
                    var team = selectedPlayer ? selectedPlayer.team : 1;
                    var playerNumber;
                    while (true) {
                        playerNumber = Math.floor(Final.randomBetween(0, _this.entities.length + 1));
                        var existing = _this.getPlayers().find(function (p) { return p.playerNumber === playerNumber; });
                        if (!existing)
                            break;
                    }
                    var speed = _this.getSpeedFromSettings();
                    var inaccuracy = _this.getInaccuracyFromSettings();
                    var newPlayer = new Final.Player(Final.mouse, playerNumber, speed, inaccuracy, team);
                    _this.entities.push(newPlayer);
                    _this.state = Final.GameState.RUNNING;
                    Final.canvas.removeEventListener("click", addPlayer);
                };
                Final.canvas.addEventListener("click", addPlayer);
            });
        };
        Game.prototype.updateGameInfo = function () {
            var scoreDisplay = document.getElementById("displayScore");
            scoreDisplay.innerHTML = this.scoreTeam1 + " : " + this.scoreTeam2;
            if (this.ballPosession === undefined)
                return;
            var posessionDisplay = document.getElementById("displayPosession");
            var team = this.ballPosession < 0 ? 1 : 2;
            posessionDisplay.innerHTML = Math.abs(this.ballPosession) + " (T" + team + ")";
        };
        Game.prototype.resetBall = function (team) {
            if (this.ballPosession === undefined)
                return;
            if (!team) {
                team = this.ballPosession < 0 ? 1 : 2;
            }
            var players = this.getPlayers().filter(function (player) { return player.team !== team; });
            var idx = Math.floor(Final.randomBetween(0, players.length));
            var player = players[idx];
            this.ball.position = player.position.copy();
        };
        Game.prototype.activateShooting = function () {
            this.state = Final.GameState.SHOOTING;
        };
        Game.prototype.update = function () {
            var _this = this;
            if (this.state === Final.GameState.RUNNING) {
                this.field.update(this);
                this.ball.update(this);
                this.entities.forEach(function (e) { return e.update(_this); });
            }
            else if (this.state === Final.GameState.SHOOTING) {
                //
            }
        };
        Game.prototype.render = function (ctx) {
            var _this = this;
            this.field.render(ctx, this);
            this.entities.forEach(function (e) { return e.render(ctx, _this); });
            this.ball.render(ctx, this);
            if (this.state === Final.GameState.SHOOTING) {
                ctx.strokeStyle = "red";
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.arc(Final.mouse.x, Final.mouse.y, this.ball.radius, 0, 2 * Math.PI, false);
                ctx.stroke();
            }
            else if (this.state === Final.GameState.ADD_PLAYER) {
                ctx.strokeStyle = "green";
                ctx.beginPath();
                ctx.lineWidth = 3;
                ctx.arc(Final.mouse.x, Final.mouse.y, this.ball.radius, 0, 2 * Math.PI, false);
                ctx.stroke();
            }
        };
        return Game;
    }());
    Final.Game = Game;
})(Final || (Final = {}));
