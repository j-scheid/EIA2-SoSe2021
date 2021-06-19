var Advanced;
(function (Advanced) {
    function drawBackground() {
        var gradient = Advanced.crc2.createLinearGradient(0, 0, 0, Advanced.crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(Advanced.golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%)");
        Advanced.crc2.fillStyle = gradient;
        Advanced.crc2.fillRect(0, 0, Advanced.crc2.canvas.width, Advanced.crc2.canvas.height);
    }
    Advanced.drawBackground = drawBackground;
    function drawSun(_position) {
        Advanced.crc2.save();
        Advanced.crc2.translate(_position.x, _position.y);
        Advanced.crc2.fillStyle = "yellow";
        Advanced.crc2.arc(0, 0, 100, 0, 2 * Math.PI);
        Advanced.crc2.fill();
        Advanced.crc2.restore();
    }
    Advanced.drawSun = drawSun;
    function drawMountains(_position, _min, _max, _color) {
        var stepMin = 50;
        var stepMax = 100;
        var x = 0;
        Advanced.crc2.save();
        Advanced.crc2.translate(_position.x, _position.y);
        Advanced.crc2.beginPath();
        Advanced.crc2.moveTo(0, 0);
        Advanced.crc2.lineTo(0, -_max);
        do {
            x += stepMin + Math.random() * (stepMax);
            var y = -_min - Math.random() * (_max - _min);
            Advanced.crc2.lineTo(x, y);
        } while (x < Advanced.crc2.canvas.width);
        Advanced.crc2.lineTo(x, 0);
        Advanced.crc2.closePath();
        Advanced.crc2.fillStyle = _color;
        Advanced.crc2.fill();
        Advanced.crc2.restore();
    }
    Advanced.drawMountains = drawMountains;
    function drawTree(_xPos, _xRandomMin, _xRandomMax, _yRandomMin, _yRandomMax) {
        do {
            var randomScale = 0.8 + Math.random() * (1.3 - 0.8);
            var yTree1 = -50;
            var yTree2 = -150;
            var y = _yRandomMin + Math.random() * (_yRandomMax - _yRandomMin);
            var treeColor = ["#154f31", "#1a5838", "#1e5d3c"];
            Advanced.crc2.save();
            Advanced.crc2.translate(_xPos, y + Advanced.crc2.canvas.height * 0.62);
            Advanced.crc2.scale(randomScale, randomScale);
            Advanced.crc2.fillStyle = "brown";
            Advanced.crc2.fillRect(0, 0, 10, -200);
            for (var index = 0; index < 3; index++) {
                Advanced.crc2.beginPath();
                Advanced.crc2.moveTo(-25, yTree1);
                Advanced.crc2.lineTo(35, yTree1);
                Advanced.crc2.lineTo(5, yTree2);
                Advanced.crc2.closePath();
                Advanced.crc2.fillStyle = treeColor[index];
                Advanced.crc2.fill();
                yTree1 -= 50;
                yTree2 -= 30;
            }
            _xPos += _xRandomMin + Math.random() * (_xRandomMax - _xRandomMin);
            Advanced.crc2.restore();
        } while (_xPos < Advanced.crc2.canvas.width);
    }
    Advanced.drawTree = drawTree;
    function drawBeeHive() {
        Advanced.crc2.save();
        Advanced.crc2.translate(Advanced.crc2.canvas.width / 2, Advanced.crc2.canvas.height * 0.7);
        Advanced.crc2.scale(8, 8);
        Advanced.crc2.lineWidth = 0.5;
        Advanced.crc2.strokeStyle = "black";
        Advanced.crc2.beginPath();
        Advanced.crc2.moveTo(0, 0);
        Advanced.crc2.lineTo(-5.5, -1);
        Advanced.crc2.quadraticCurveTo(-6, -6, -4, -8.5);
        Advanced.crc2.quadraticCurveTo(-3.5, -10.5, -1.5, -11);
        Advanced.crc2.quadraticCurveTo(0, -12, 1.5, -11);
        Advanced.crc2.quadraticCurveTo(3.5, -10.5, 4, -8.5);
        Advanced.crc2.quadraticCurveTo(3.5, -10.5, 4, -8.5);
        Advanced.crc2.quadraticCurveTo(6, -6, 5.5, -1);
        Advanced.crc2.fillStyle = "yellow";
        Advanced.crc2.fill();
        Advanced.crc2.closePath();
        Advanced.crc2.stroke();
        Advanced.crc2.beginPath();
        Advanced.crc2.arc(0, -8, 1.5, 0, 2 * Math.PI);
        Advanced.crc2.fillStyle = "black";
        Advanced.crc2.fill();
        Advanced.crc2.closePath();
        Advanced.crc2.restore();
    }
    Advanced.drawBeeHive = drawBeeHive;
})(Advanced || (Advanced = {}));
