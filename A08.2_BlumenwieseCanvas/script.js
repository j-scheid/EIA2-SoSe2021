/*
Aufgabe: A08.2 BlumenwieseCanvas
Name: Jonas Scheid
Matrikel: 267316
Datum: 15.05.2021
Quellen: https://www.victoriakirst.com/beziertool/, Gina Crivellin
*/
var BlumenwieseCanvas;
(function (BlumenwieseCanvas) {
    window.addEventListener("load", handleLoad);
    var ctx;
    var canvas = document.querySelector("canvas");
    function handleLoad() {
        var canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        ctx = canvas.getContext("2d");
        drawMountains(canvas.height * 0.4, "#414447", "#a3adb5");
        drawBackground();
        drawMountains(200, "#5b6166", "#b7c1c9");
        drawGround({ x: 50, y: 1100 });
        for (var y = 0; y < 4; y++) {
            drawFlower("#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6));
        }
        drawBeehive({ x: -50, y: -150 });
    }
    function drawBackground() {
        var gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, "#ccf0fc");
        gradient.addColorStop(1, "#04f2da");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    function drawGround(_position) {
        var radius = 1000;
        ctx.beginPath();
        ctx.arc(_position.x, _position.y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "#63b57c";
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#003300";
        ctx.stroke();
    }
    function drawBeehive(_position) {
        ctx.beginPath();
        ctx.moveTo(383 + _position.x, 242 + _position.y);
        ctx.bezierCurveTo(371 + _position.x, 231 + _position.y, 334 + _position.x, 224 + _position.y, 302 + _position.x, 233 + _position.y);
        ctx.bezierCurveTo(291 + _position.x, 235 + _position.y, 270 + _position.x, 247 + _position.y, 290 + _position.x, 258 + _position.y);
        ctx.bezierCurveTo(265 + _position.x, 258 + _position.y, 270 + _position.x, 282 + _position.y, 285 + _position.x, 285 + _position.y);
        ctx.bezierCurveTo(260 + _position.x, 291 + _position.y, 263 + _position.x, 312 + _position.y, 280 + _position.x, 319 + _position.y);
        ctx.bezierCurveTo(265 + _position.x, 318 + _position.y, 398 + _position.x, 325 + _position.y, 383 + _position.x, 324 + _position.y);
        ctx.bezierCurveTo(381 + _position.x, 339 + _position.y, 385 + _position.x, 229 + _position.y, 383 + _position.x, 244 + _position.y);
        ctx.stroke();
        ctx.fillStyle = "#b2aa0e";
        ctx.fill();
    }
    function drawMountains(_height, _colorLow, _colorHigh) {
        var min = 70;
        var max = 200;
        var stepMin = 50;
        var stepMax = 150;
        var x = 0;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-1000, window.innerHeight * 1);
        ctx.lineTo(0, _height);
        ctx.translate(0, _height);
        do {
            x += stepMin + Math.random() * (stepMax - stepMin);
            var y = -min - Math.random() * (max - min);
            ctx.lineTo(x, y);
        } while (x < ctx.canvas.width);
        ctx.lineTo(window.innerWidth, window.innerHeight * 1500);
        ctx.closePath();
        var gradient = ctx.createLinearGradient(0, 0, 0, -max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.9, _colorHigh);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
    function drawFlower(_color) {
        var placeTulipsX = Math.random() * canvas.width - 1;
        var placeTulipsY = Math.random() * (canvas.height - canvas.height * 0.6) +
            canvas.height * 0.6;
        console.log(placeTulipsX);
        console.log(placeTulipsY);
        var placestemx = Math.random() * (30 - 10 + 10);
        var placestemy = Math.random() * (30 - 20 + 20);
        console.log(placestemx);
        console.log(placestemy);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(placeTulipsX, placeTulipsY);
        ctx.translate(placeTulipsX, placeTulipsY);
        ctx.quadraticCurveTo(-10, 5, -10, 20);
        ctx.strokeStyle = "#355233";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.beginPath();
        moveTo(10, 20);
        ctx.arc(0, 0, 8, 0, 2 * Math.PI);
        ctx.fillStyle = "#e0d343";
        ctx.strokeStyle = "#e0d343";
        ctx.fill();
        ctx.stroke();
        for (var i = 90; i > 10; i -= 10) {
            ctx.beginPath();
            moveTo(10, 20);
            ctx.rotate((45 * Math.PI) / 20);
            ctx.arc(10, 0, 5, 0, 2 * Math.PI);
            ctx.fillStyle = _color;
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.fill();
            ctx.stroke();
        }
        ctx.restore();
    }
})(BlumenwieseCanvas || (BlumenwieseCanvas = {}));
