var Polymorphie;
(function (Polymorphie) {
    function drawBackground() {
        var gradient = Polymorphie.crc2.createLinearGradient(0, 0, 0, Polymorphie.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(Polymorphie.golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%)");
        Polymorphie.crc2.fillStyle = gradient;
        Polymorphie.crc2.fillRect(0, 0, Polymorphie.crc2.canvas.width, Polymorphie.crc2.canvas.height);
    }
    Polymorphie.drawBackground = drawBackground;
    function drawSun(_position) {
        Polymorphie.crc2.save();
        Polymorphie.crc2.translate(_position.x, _position.y);
        Polymorphie.crc2.fillStyle = "yellow";
        Polymorphie.crc2.arc(0, 0, 100, 0, 2 * Math.PI);
        Polymorphie.crc2.fill();
        Polymorphie.crc2.restore();
    }
    Polymorphie.drawSun = drawSun;
    function drawMountains(_position, _min, _max, _color) {
        var stepMin = 50;
        var stepMax = 100;
        var x = 0;
        Polymorphie.crc2.save();
        Polymorphie.crc2.translate(_position.x, _position.y);
        Polymorphie.crc2.beginPath();
        Polymorphie.crc2.moveTo(0, 0);
        Polymorphie.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax);
            var y = -_min - Math.random() * (_max - _min);
            Polymorphie.crc2.lineTo(x, y);
        } while (x < Polymorphie.crc2.canvas.width);
        Polymorphie.crc2.lineTo(x, 0);
        Polymorphie.crc2.closePath();
        Polymorphie.crc2.fillStyle = _color;
        Polymorphie.crc2.fill();
        Polymorphie.crc2.restore();
    }
    Polymorphie.drawMountains = drawMountains;
    function drawTree(_xPos, _xRandomMin, _xRandomMax, _yRandomMin, _yRandomMax) {
        do {
            var randomScale = 0.8 + Math.random() * (1.3 - 0.8);
            var yTree1 = -50;
            var yTree2 = -150;
            var y = _yRandomMin + Math.random() * (_yRandomMax - _yRandomMin);
            var treeColor = ["#154f31", "#1a5838", "#1e5d3c"];
            Polymorphie.crc2.save();
            Polymorphie.crc2.translate(_xPos, y + Polymorphie.crc2.canvas.height * 0.62);
            Polymorphie.crc2.scale(randomScale, randomScale);
            Polymorphie.crc2.fillStyle = "brown";
            Polymorphie.crc2.fillRect(0, 0, 10, -200);
            for (var index = 0; index < 3; index++) {
                Polymorphie.crc2.beginPath();
                Polymorphie.crc2.moveTo(-25, yTree1);
                Polymorphie.crc2.lineTo(35, yTree1);
                Polymorphie.crc2.lineTo(5, yTree2);
                Polymorphie.crc2.closePath();
                Polymorphie.crc2.fillStyle = treeColor[index];
                Polymorphie.crc2.fill();
                yTree1 -= 50;
                yTree2 -= 30;
            }
            _xPos += _xRandomMin + Math.random() * (_xRandomMax - _xRandomMin);
            Polymorphie.crc2.restore();
        } while (_xPos < Polymorphie.crc2.canvas.width);
    }
    Polymorphie.drawTree = drawTree;
    function drawBeeHive() {
        Polymorphie.crc2.save();
        Polymorphie.crc2.translate(Polymorphie.crc2.canvas.width / 2, Polymorphie.crc2.canvas.height * 0.7);
        Polymorphie.crc2.scale(8, 8);
        Polymorphie.crc2.lineWidth = 0.5;
        Polymorphie.crc2.strokeStyle = "black";
        Polymorphie.crc2.beginPath();
        Polymorphie.crc2.moveTo(0, 0);
        Polymorphie.crc2.lineTo(-5.5, -1);
        Polymorphie.crc2.quadraticCurveTo(-6, -6, -4, -8.5);
        Polymorphie.crc2.quadraticCurveTo(-3.5, -10.5, -1.5, -11);
        Polymorphie.crc2.quadraticCurveTo(0, -12, 1.5, -11);
        Polymorphie.crc2.quadraticCurveTo(3.5, -10.5, 4, -8.5);
        Polymorphie.crc2.quadraticCurveTo(3.5, -10.5, 4, -8.5);
        Polymorphie.crc2.quadraticCurveTo(6, -6, 5.5, -1);
        Polymorphie.crc2.fillStyle = "yellow";
        Polymorphie.crc2.fill();
        Polymorphie.crc2.closePath();
        Polymorphie.crc2.stroke();
        Polymorphie.crc2.beginPath();
        Polymorphie.crc2.arc(0, -8, 1.5, 0, 2 * Math.PI);
        Polymorphie.crc2.fillStyle = "black";
        Polymorphie.crc2.fill();
        Polymorphie.crc2.closePath();
        Polymorphie.crc2.restore();
    }
    Polymorphie.drawBeeHive = drawBeeHive;
})(Polymorphie || (Polymorphie = {}));
