/*
Aufgabe: A11.1_BlumenwieseAdvanced
Name: Jonas Scheid
Matrikel: 267316
Datum: 19.06.2021
Quellen: EIAsteroids
*/
var Advanced;
(function (Advanced) {
    Advanced.golden = 0.62;
    var moveables = [];
    var flowers = [];
    var imageData;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        var canvas = (document.querySelector("canvas"));
        Advanced.crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createBees(10);
        createBackground();
        createFlowers();
        createCloud();
        imageData = Advanced.crc2.getImageData(0, 0, canvas.width, canvas.height);
        animate();
    }
    function createBackground() {
        Advanced.drawBackground();
        Advanced.drawSun({ x: Advanced.crc2.canvas.width / 1.3, y: Advanced.crc2.canvas.height * 0.17 });
        Advanced.drawMountains({ x: 0, y: Advanced.crc2.canvas.height * Advanced.golden }, 200, 300, "grey");
        Advanced.drawMountains({ x: 0, y: Advanced.crc2.canvas.height * Advanced.golden }, 150, 200, "lightgrey");
        Advanced.drawTree(0, 15, 50, 20, 50);
        Advanced.drawBeeHive();
    }
    function createFlowers() {
        var xPos = 0;
        do {
            var randomY = 50 +
                Advanced.crc2.canvas.height * Advanced.golden +
                Math.random() *
                    (50 + Advanced.crc2.canvas.height * Advanced.golden - Advanced.crc2.canvas.height * 0.4);
            flowers.push(new Advanced.FirstFlower(xPos, randomY, 0));
            flowers.push(new Advanced.SecondFlower(xPos + Math.random() * 10, randomY + Math.random() * 100, 0));
            xPos += 10 + Math.random() * (50 - 10);
        } while (xPos < Advanced.crc2.canvas.width);
    }
    function createBees(_nBee) {
        for (var index = 0; index < _nBee; index++) {
            var randomVelocityX = (Math.random() - 0.5) * 5;
            var randomVelocityY = (Math.random() - 0.5) * 5;
            moveables.push(new Advanced.Bee({ x: Advanced.crc2.canvas.width / 2, y: Advanced.crc2.canvas.height * Advanced.golden }, { x: randomVelocityX, y: randomVelocityY }));
        }
    }
    function createCloud() {
        moveables.push(new Advanced.Cloud({ x: Advanced.crc2.canvas.width * 0.1, y: Advanced.crc2.canvas.height * 0.1 }));
        moveables.push(new Advanced.Cloud({ x: Advanced.crc2.canvas.width * 0.5, y: Advanced.crc2.canvas.height * 0.05 }));
    }
    function animate() {
        requestAnimationFrame(animate);
        Advanced.crc2.clearRect(0, 0, Advanced.crc2.canvas.width, Advanced.crc2.canvas.height);
        Advanced.crc2.putImageData(imageData, 0, 0);
        for (var index = 0; index < moveables.length; index++) {
            moveables[index].update();
        }
        for (var index = 0; index < flowers.length; index++) {
            flowers[index].draw(flowers[index].xPos, flowers[index].yPos, flowers[index].nectarCurr);
            console.log(flowers[index].nectarCurr);
        }
        updateNectar();
    }
    function updateNectar() {
        for (var index = 0; index < flowers.length; index++) {
            if (flowers[index].nectarCurr <= 1) {
                flowers[index].nectarCurr += 0.1;
            }
        }
        //await delay(3000);
    }
    //const delay = ms => new Promise(res => setTimeout(res, ms));
})(Advanced || (Advanced = {}));
