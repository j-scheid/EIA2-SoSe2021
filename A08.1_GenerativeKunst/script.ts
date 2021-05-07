/*
Aufgabe: A08.1 GenerativeKunst
Name: Jonas Scheid
Matrikel: 267316
Datum: 08.10.2021
Quellen: http://www.java2s.com/Tutorials/Javascript/Canvas_How_to/Shape/Draw_random_circles.htm
*/
namespace generatingArt {
  window.addEventListener("load", handleLoad);

  function handleLoad(_event: Event): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");

    if (canvas.getContext) {
      var ctx: CanvasRenderingContext2D = canvas.getContext("2d");

      dSqu(ctx, canvas);
    } else {
      document.write("Your Browser does not support Canvas!");
    }
  }

  function dSqu(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ): void {
    ctx.fillStyle =
      "rgb(" +
      Math.random() * 100 +
      "," +
      Math.random() * 100 +
      "," +
      Math.random() * 100 +
      ")";
    ctx.fillRect(75, 75, 137, 137);

    var numCircles: number = 1550;
    var maxRadius: number = 1;
    var minRadius: number = 0.3;

    for (var n: number = 0; n < numCircles; n++) {
      var xPos: number = Math.random() * canvas.width;
      var yPos: number = Math.random() * canvas.height;
      var radius: number = minRadius + Math.random() * (maxRadius - minRadius);
      let colorNumber: number = Math.random() * 190;
      drawCircle(ctx, xPos, yPos, radius, colorNumber);
    }

    var numScribbles: number = 10;

    for (var i: number = 0; i < numScribbles; i++) {
      var scribbleXPos: number = Math.random() * canvas.width;
      var scribbleYPos: number = Math.random() * canvas.height;
      let scribbleColorNumber: number = Math.random() * 255;
      scribble(ctx, scribbleXPos, scribbleYPos, scribbleColorNumber);
    }
  }
  function drawCircle(ctx: CanvasRenderingContext2D, xPos: number, yPos: number, radius: number, colorNumber: number): void {
    var startAngle: number = (Math.PI / 180) * 0;
    var endAngle: number = (Math.PI / 180) * 360;
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

  function scribble(ctx: CanvasRenderingContext2D, scribbleXPos: number, scribbleYPos: number, colorNumber: number): void {
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
}
