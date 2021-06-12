/*
Aufgabe: A10.2_BlumenwiesePolymorphie
Name: Jonas Scheid
Matrikel: 267316
Datum: 12.06.2021
Quellen: EIAsteroids
*/
var Polymorphie;
(function (Polymorphie) {
    Polymorphie.golden = 0.62;
    var moveables = [];
    var flowers = [];
    var imageData;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        var canvas = document.querySelector("canvas");
        Polymorphie.crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createBees(10);
        createBackground();
        createFlowers();
        createCloud();
        imageData = Polymorphie.crc2.getImageData(0, 0, canvas.width, canvas.height);
        animate();
    }
    function createBackground() {
        Polymorphie.drawBackground();
        Polymorphie.drawSun({ x: Polymorphie.crc2.canvas.width / 1.3, y: Polymorphie.crc2.canvas.height * 0.17 });
        Polymorphie.drawMountains({ x: 0, y: Polymorphie.crc2.canvas.height * Polymorphie.golden }, 200, 300, "grey");
        Polymorphie.drawMountains({ x: 0, y: Polymorphie.crc2.canvas.height * Polymorphie.golden }, 150, 200, "lightgrey");
        Polymorphie.drawTree(0, 15, 50, 20, 50);
        Polymorphie.drawBeeHive();
    }
    function createFlowers() {
        var xPos = 0;
        do {
            flowers.push(new Polymorphie.Flower(Math.floor(Math.random() * 2) + 1, "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6), xPos, 50 + (Polymorphie.crc2.canvas.height * Polymorphie.golden), Polymorphie.crc2.canvas.height * 0.9));
            xPos += 10 + Math.random() * (50 - 10);
        } while (xPos < Polymorphie.crc2.canvas.width);
    }
    function createBees(_nBee) {
        for (var index = 0; index < _nBee; index++) {
            var randomVelocityX = (Math.random() - 0.5) * 5;
            var randomVelocityY = (Math.random() - 0.5) * 5;
            moveables.push(new Polymorphie.Bee({ x: Polymorphie.crc2.canvas.width / 2, y: Polymorphie.crc2.canvas.height * Polymorphie.golden }, { x: randomVelocityX, y: randomVelocityY }));
        }
    }
    function createCloud() {
        moveables.push(new Polymorphie.Cloud({ x: Polymorphie.crc2.canvas.width * .10, y: Polymorphie.crc2.canvas.height * .10 }));
        moveables.push(new Polymorphie.Cloud({ x: Polymorphie.crc2.canvas.width * .5, y: Polymorphie.crc2.canvas.height * .05 }));
    }
    function animate() {
        requestAnimationFrame(animate);
        Polymorphie.crc2.clearRect(0, 0, Polymorphie.crc2.canvas.width, Polymorphie.crc2.canvas.height);
        Polymorphie.crc2.putImageData(imageData, 0, 0);
        for (var index = 0; index < moveables.length; index++) {
            //if (moveables[index] instanceof Cloud) {
            moveables[index].update();
        }
    }
})(Polymorphie || (Polymorphie = {}));
