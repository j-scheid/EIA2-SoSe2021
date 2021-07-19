/*
Aufgabe: Abschlussaufgabe S21
Name: Jonas Scheid
Matrikel: 267316
Datum: 19.07.2021
Quellen: EIAsteroids, https://www.w3schools.com/
Gruppe mit Maximilian Tabori
*/

namespace Final {
  export let canvas: HTMLCanvasElement | undefined;
  export let ctx: CanvasRenderingContext2D | undefined;

  export const DEBUG: boolean = false;

  export function randomBetween(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }

  export const mouse: Vector = new Vector(0, 0);

  export enum GameState {
    RUNNING,
    SHOOTING,
    ADD_PLAYER
  }

  let game: Game;

  function render(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.render(ctx);
  }
  function update(): void {
    game.update();
  }

  function init(): void {
    canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousemove", (e) => {
      mouse.set(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    });

    game = new Game();

    loop();
  }

  function loop(): void {
    render();
    update();

    window.requestAnimationFrame(loop);
  }
  window.onload = init;
}
