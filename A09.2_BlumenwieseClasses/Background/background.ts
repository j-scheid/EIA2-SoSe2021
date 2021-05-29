namespace Bees {
    export function drawBackground(): void {
        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%)");
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
    }

    export function drawSun(_position: Vector): void {
        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.fillStyle = "yellow";
        crc2.arc(0, 0, 100, 0, 2 * Math.PI);
        crc2.fill();

        crc2.restore();
    }

    export function drawMountains(_position: Vector, _min: number, _max: number, _color: string): void {
        let stepMin: number = 50;
        let stepMax: number = 100;
        let x: number = 0;

        crc2.save();
        crc2.translate(_position.x, _position.y);
        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(0, -_max);

        do {
            x += stepMin + Math.random() * (stepMax);
            let y: number = -_min - Math.random() * (_max - _min);

            crc2.lineTo(x, y);
        } while (x < crc2.canvas.width);

        crc2.lineTo(x, 0);
        crc2.closePath();

        crc2.fillStyle = _color;
        crc2.fill();

        crc2.restore();
    }

    export function drawTree(_xPos: number, _xRandomMin: number, _xRandomMax: number, _yRandomMin: number, _yRandomMax: number): void {
        do {
            let randomScale: number = 0.8 + Math.random() * (1.3 - 0.8);
            let yTree1: number = -50;
            let yTree2: number = -150;
            let y: number = _yRandomMin + Math.random() * (_yRandomMax - _yRandomMin);
            let treeColor: string[] = ["#154f31", "#1a5838", "#1e5d3c"];

            crc2.save();
            crc2.translate(_xPos, y + crc2.canvas.height * 0.62);
            crc2.scale(randomScale, randomScale);
            crc2.fillStyle = "brown";
            crc2.fillRect(0, 0, 10, -200);

            for (let index: number = 0; index < 3; index++) {
                crc2.beginPath();
                crc2.moveTo(-25, yTree1);
                crc2.lineTo(35, yTree1);
                crc2.lineTo(5, yTree2);
                crc2.closePath();
                crc2.fillStyle = treeColor[index];
                crc2.fill();
                yTree1 -= 50;
                yTree2 -= 30;
            }
            _xPos += _xRandomMin + Math.random() * (_xRandomMax - _xRandomMin);
            crc2.restore();
        }
        while (_xPos < crc2.canvas.width);
    }

    export function drawBeeHive(): void {
        crc2.save();
        crc2.translate(crc2.canvas.width / 2 , crc2.canvas.height * 0.7);

        crc2.scale(8, 8);
        crc2.lineWidth = 0.5;
        crc2.strokeStyle = "black";

        crc2.beginPath();
        crc2.moveTo(0, 0);
        crc2.lineTo(-5.5, -1);
        crc2.quadraticCurveTo(-6, -6, -4, -8.5);
        crc2.quadraticCurveTo(-3.5, -10.5, -1.5, -11);
        crc2.quadraticCurveTo(0, -12, 1.5, -11);
        crc2.quadraticCurveTo(3.5, -10.5, 4, -8.5);
        crc2.quadraticCurveTo(3.5, -10.5, 4, -8.5);
        crc2.quadraticCurveTo(6, -6, 5.5, -1);
        crc2.fillStyle = "yellow";
        crc2.fill();
        crc2.closePath();
        crc2.stroke();

        crc2.beginPath();
        crc2.arc(0, -8, 1.5, 0, 2 * Math.PI);
        crc2.fillStyle = "black";
        crc2.fill();
        crc2.closePath();
       
        crc2.restore();
    }

}