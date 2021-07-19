/*
Aufgabe: Abschlussaufgabe S21
Name: Jonas Scheid
Matrikel: 267316
Datum: 19.07.2021
Quellen: EIAsteroids, https://www.w3schools.com/
Gruppe mit Maximilian Tabori
*/
var Final;
(function (Final) {
    Final.DEBUG = false;
    function randomBetween(min, max) {
        return min + Math.random() * (max - min);
    }
    Final.randomBetween = randomBetween;
    Final.mouse = new Final.Vector(0, 0);
    var GameState;
    (function (GameState) {
        GameState[GameState["RUNNING"] = 0] = "RUNNING";
        GameState[GameState["SHOOTING"] = 1] = "SHOOTING";
        GameState[GameState["ADD_PLAYER"] = 2] = "ADD_PLAYER";
    })(GameState = Final.GameState || (Final.GameState = {}));
    var game;
    function render() {
        Final.ctx.clearRect(0, 0, Final.canvas.width, Final.canvas.height);
        game.render(Final.ctx);
    }
    function update() {
        game.update();
    }
    function init() {
        Final.canvas = document.getElementById("gameCanvas");
        Final.ctx = Final.canvas.getContext("2d");
        Final.canvas.addEventListener("mousemove", function (e) {
            Final.mouse.set(e.pageX - Final.canvas.offsetLeft, e.pageY - Final.canvas.offsetTop);
        });
        game = new Final.Game();
        loop();
    }
    function loop() {
        render();
        update();
        window.requestAnimationFrame(loop);
    }
    window.onload = init;
})(Final || (Final = {}));
