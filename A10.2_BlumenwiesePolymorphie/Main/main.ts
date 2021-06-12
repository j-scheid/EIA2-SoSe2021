/*
Aufgabe: A10.2_BlumenwiesePolymorphie
Name: Jonas Scheid
Matrikel: 267316
Datum: 12.06.2021
Quellen: EIAsteroids
*/

namespace Polymorphie {
    
    export let crc2: CanvasRenderingContext2D;
    export let golden: number = 0.62;
    export interface Vector {
        x: number;
        y: number;
    }

    let moveables: Moveable[] = [];
    let flowers: Flower[] = [];
    let imageData: ImageData;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createBees(10);
        createBackground();
        createFlowers();
        createCloud();
        imageData =  crc2.getImageData(0, 0, canvas.width, canvas.height);
        animate();
    }   

    function createBackground(): void {
        drawBackground();
        drawSun({x: crc2.canvas.width / 1.3, y: crc2.canvas.height * 0.17});
        drawMountains({x: 0, y: crc2.canvas.height * golden}, 200, 300, "grey");
        drawMountains({x: 0, y: crc2.canvas.height * golden}, 150, 200, "lightgrey");
        drawTree(0, 15, 50, 20, 50);
        drawBeeHive();
    }

    function createFlowers(): void {
        let xPos: number = 0;
        do {
            flowers.push(new Flower(Math.floor(Math.random() * 2) + 1, "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6), xPos, 50 + (crc2.canvas.height * golden), crc2.canvas.height * 0.9));
            xPos += 10 + Math.random() * (50 - 10);
        }
        while (xPos < crc2.canvas.width);
    }

    function createBees (_nBee: number): void {
        for (let index: number = 0; index < _nBee; index++) {
            let randomVelocityX: number = (Math.random() - 0.5) * 5;
            let randomVelocityY: number = (Math.random() - 0.5) * 5;

            moveables.push(new Bee({ x: crc2.canvas.width / 2, y: crc2.canvas.height * golden }, { x: randomVelocityX, y: randomVelocityY }));
        }

        
        
    }

    function createCloud (): void {
        moveables.push(new Cloud({ x: crc2.canvas.width * .10, y: crc2.canvas.height * .10 }));
        moveables.push(new Cloud({ x: crc2.canvas.width * .5, y: crc2.canvas.height * .05 }));
    }

    function animate(): void {
        requestAnimationFrame(animate);
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.putImageData(imageData, 0, 0);
        for (let index: number = 0; index < moveables.length; index ++) {
            //if (moveables[index] instanceof Cloud) {
                moveables[index].update();
        }
    }
}