namespace Advanced {
    export abstract class Flower {
        public xPos: number;
        public yPos: number;
        public opacity: number;

        public nectarCurr: number;

        constructor(_xPos: number, _yPos: number, _opacity: number) {
            this.xPos = _xPos;
            this.yPos = _yPos;
            this.opacity = _opacity;
        }

        public abstract draw(xPos: number, yPos: number, opacity: number): void;
    }
}