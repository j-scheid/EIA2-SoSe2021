/*
Aufgabe: A09.2 BlumenwieseClasses
Name: Jonas Scheid
Matrikel: 267316
Datum: 29.05.2021
Quellen: Huu-Thien, Max Buckel
Anmerkung: Meine Abgabe von letzter Woche war leider unbrauchbar und zu klein für die Animationen. Und, tut mir Leid, dass die Diagramme immer unordentlicher wurden, nächstes Mal wieder digital :D
*/
var Bees;
(function (Bees) {
    Bees.golden = 0.62;
    var bees = [];
    var flowers = [];
    var clouds = [];
    var imageData;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        var canvas = document.querySelector("canvas");
        Bees.crc2 = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createBees(10);
        createBackground();
        createFlowers();
        createCloud();
        imageData = Bees.crc2.getImageData(0, 0, canvas.width, canvas.height);
        animate();
    }
    function createBackground() {
        Bees.drawBackground();
        Bees.drawSun({ x: Bees.crc2.canvas.width / 1.3, y: Bees.crc2.canvas.height * 0.17 });
        Bees.drawMountains({ x: 0, y: Bees.crc2.canvas.height * Bees.golden }, 200, 300, "grey");
        Bees.drawMountains({ x: 0, y: Bees.crc2.canvas.height * Bees.golden }, 150, 200, "lightgrey");
        Bees.drawTree(0, 15, 50, 20, 50);
        Bees.drawBeeHive();
    }
    function createFlowers() {
        var xPos = 0;
        do {
            flowers.push(new Bees.Flower(Math.floor(Math.random() * 2) + 1, "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6), xPos, 50 + (Bees.crc2.canvas.height * Bees.golden), Bees.crc2.canvas.height * 0.9));
            xPos += 10 + Math.random() * (50 - 10);
        } while (xPos < Bees.crc2.canvas.width);
    }
    function createBees(_nBee) {
        for (var index = 0; index < _nBee; index++) {
            var randomVelocityX = (Math.random() - 0.5) * 5;
            var randomVelocityY = (Math.random() - 0.5) * 5;
            bees.push(new Bees.Bee({ x: Bees.crc2.canvas.width / 2, y: Bees.crc2.canvas.height * Bees.golden }, { x: randomVelocityX, y: randomVelocityY }));
        }
    }
    function createCloud() {
        clouds.push(new Bees.Cloud({ x: Bees.crc2.canvas.width * .10, y: Bees.crc2.canvas.height * .10 }));
        clouds.push(new Bees.Cloud({ x: Bees.crc2.canvas.width * .5, y: Bees.crc2.canvas.height * .05 }));
    }
    function animate() {
        requestAnimationFrame(animate);
        Bees.crc2.clearRect(0, 0, Bees.crc2.canvas.width, Bees.crc2.canvas.height);
        Bees.crc2.putImageData(imageData, 0, 0);
        for (var index = 0; index < bees.length; index++) {
            bees[index].update();
        }
        for (var index = 0; index < clouds.length; index++) {
            clouds[index].update();
        }
    }
})(Bees || (Bees = {}));
