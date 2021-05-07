/*
Aufgabe: A08.1 GenerativeKunst
Name: Jonas Scheid
Matrikel: 267316
Datum: 08.10.2021
Quellen: http://www.java2s.com/Tutorials/Javascript/Canvas_How_to/Shape/Draw_random_circles.htm
*/
var generatingArt;
(function (generatingArt) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        var canvas = document.querySelector("canvas");
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            dSqu(ctx, canvas);
        }
        else {
            document.write("Your Browser does not support Canvas!");
        }
    }
    function dSqu(ctx, canvas) {
        ctx.fillStyle =
            "rgb(" +
                Math.random() * 100 +
                "," +
                Math.random() * 100 +
                "," +
                Math.random() * 100 +
                ")";
        ctx.fillRect(75, 75, 137, 137);
        var numCircles = 1550;
        var maxRadius = 1;
        var minRadius = 0.3;
        for (var n = 0; n < numCircles; n++) {
            var xPos = Math.random() * canvas.width;
            var yPos = Math.random() * canvas.height;
            var radius = minRadius + Math.random() * (maxRadius - minRadius);
            var colorNumber = Math.random() * 190;
            drawCircle(ctx, xPos, yPos, radius, colorNumber);
        }
        var numScribbles = 10;
        for (var i = 0; i < numScribbles; i++) {
            var scribbleXPos = Math.random() * canvas.width;
            var scribbleYPos = Math.random() * canvas.height;
            var scribbleColorNumber = Math.random() * 255;
            scribble(ctx, scribbleXPos, scribbleYPos, scribbleColorNumber);
        }
    }
    function drawCircle(ctx, xPos, yPos, radius, colorNumber) {
        var startAngle = (Math.PI / 180) * 0;
        var endAngle = (Math.PI / 180) * 360;
        ctx.shadowColor = "gray";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(xPos, yPos, radius, startAngle, endAngle, false);
        ctx.fillStyle =
            "rgb(" + colorNumber + "," + colorNumber + "," + colorNumber + ")";
        ctx.fill();
    }
    function scribble(ctx, scribbleXPos, scribbleYPos, colorNumber) {
        ctx.moveTo(scribbleXPos, scribbleYPos);
        ctx.lineTo(288, 92);
        ctx.lineTo(288, 94);
        ctx.lineTo(288, 96);
        ctx.lineTo(287, 100);
        ctx.lineTo(286, 104);
        ctx.lineTo(286, 107);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "rgb(" + colorNumber + "," + colorNumber + "," + colorNumber + ")";
        ctx.stroke();
    }
})(generatingArt || (generatingArt = {}));
