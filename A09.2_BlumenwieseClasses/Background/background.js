var Bees;
(function (Bees) {
    function drawBackground() {
        var gradient = Bees.crc2.createLinearGradient(0, 0, 0, Bees.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(Bees.golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%)");
        Bees.crc2.fillStyle = gradient;
        Bees.crc2.fillRect(0, 0, Bees.crc2.canvas.width, Bees.crc2.canvas.height);
    }
    Bees.drawBackground = drawBackground;
    function drawSun(_position) {
        Bees.crc2.save();
        Bees.crc2.translate(_position.x, _position.y);
        Bees.crc2.fillStyle = "yellow";
        Bees.crc2.arc(0, 0, 100, 0, 2 * Math.PI);
        Bees.crc2.fill();
        Bees.crc2.restore();
    }
    Bees.drawSun = drawSun;
    function drawMountains(_position, _min, _max, _color) {
        var stepMin = 50;
        var stepMax = 100;
        var x = 0;
        Bees.crc2.save();
        Bees.crc2.translate(_position.x, _position.y);
        Bees.crc2.beginPath();
        Bees.crc2.moveTo(0, 0);
        Bees.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax);
            var y = -_min - Math.random() * (_max - _min);
            Bees.crc2.lineTo(x, y);
        } while (x < Bees.crc2.canvas.width);
        Bees.crc2.lineTo(x, 0);
        Bees.crc2.closePath();
        Bees.crc2.fillStyle = _color;
        Bees.crc2.fill();
        Bees.crc2.restore();
    }
    Bees.drawMountains = drawMountains;
    function drawTree(_xPos, _xRandomMin, _xRandomMax, _yRandomMin, _yRandomMax) {
        do {
            var randomScale = 0.8 + Math.random() * (1.3 - 0.8);
            var yTree1 = -50;
            var yTree2 = -150;
            var y = _yRandomMin + Math.random() * (_yRandomMax - _yRandomMin);
            var treeColor = ["#154f31", "#1a5838", "#1e5d3c"];
            Bees.crc2.save();
            Bees.crc2.translate(_xPos, y + Bees.crc2.canvas.height * 0.62);
            Bees.crc2.scale(randomScale, randomScale);
            Bees.crc2.fillStyle = "brown";
            Bees.crc2.fillRect(0, 0, 10, -200);
            for (var index = 0; index < 3; index++) {
                Bees.crc2.beginPath();
                Bees.crc2.moveTo(-25, yTree1);
                Bees.crc2.lineTo(35, yTree1);
                Bees.crc2.lineTo(5, yTree2);
                Bees.crc2.closePath();
                Bees.crc2.fillStyle = treeColor[index];
                Bees.crc2.fill();
                yTree1 -= 50;
                yTree2 -= 30;
            }
            _xPos += _xRandomMin + Math.random() * (_xRandomMax - _xRandomMin);
            Bees.crc2.restore();
        } while (_xPos < Bees.crc2.canvas.width);
    }
    Bees.drawTree = drawTree;
    function drawBeeHive() {
        Bees.crc2.save();
        Bees.crc2.translate(Bees.crc2.canvas.width / 2, Bees.crc2.canvas.height * 0.7);
        Bees.crc2.scale(8, 8);
        Bees.crc2.lineWidth = 0.5;
        Bees.crc2.strokeStyle = "black";
        Bees.crc2.beginPath();
        Bees.crc2.moveTo(0, 0);
        Bees.crc2.lineTo(-5.5, -1);
        Bees.crc2.quadraticCurveTo(-6, -6, -4, -8.5);
        Bees.crc2.quadraticCurveTo(-3.5, -10.5, -1.5, -11);
        Bees.crc2.quadraticCurveTo(0, -12, 1.5, -11);
        Bees.crc2.quadraticCurveTo(3.5, -10.5, 4, -8.5);
        Bees.crc2.quadraticCurveTo(3.5, -10.5, 4, -8.5);
        Bees.crc2.quadraticCurveTo(6, -6, 5.5, -1);
        Bees.crc2.fillStyle = "yellow";
        Bees.crc2.fill();
        Bees.crc2.closePath();
        Bees.crc2.stroke();
        Bees.crc2.beginPath();
        Bees.crc2.arc(0, -8, 1.5, 0, 2 * Math.PI);
        Bees.crc2.fillStyle = "black";
        Bees.crc2.fill();
        Bees.crc2.closePath();
        Bees.crc2.restore();
    }
    Bees.drawBeeHive = drawBeeHive;
})(Bees || (Bees = {}));
