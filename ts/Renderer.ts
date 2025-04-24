import Sprite from "./Sprite.js";

export enum CanvasLayer {
    Background,
    Entities,
    Projectiles,
    UserInterface
}

export default class Renderer {
    private gameContainer: HTMLElement;
    screenWidth: number;
    screenHeight: number;
    private canvasList: Map<CanvasLayer, HTMLCanvasElement>;
    private contextList: Map<CanvasLayer, CanvasRenderingContext2D>;

    constructor(gameContainer: HTMLElement, width: number, height: number) {
        while(gameContainer.firstElementChild) { gameContainer.firstElementChild.remove(); }
        
        gameContainer.style.width = width.toString(); // Ta bort senare
        gameContainer.style.height = height.toString(); // Ta bort senare

        this.gameContainer = gameContainer;
        this.screenWidth = width;
        this.screenHeight = height;
        this.canvasList = new Map<CanvasLayer, HTMLCanvasElement>();
        this.contextList = new Map<CanvasLayer, CanvasRenderingContext2D>();

        let canvas = document.createElement("canvas");
            canvas.style.background = "#000";
            canvas.width = this.screenWidth;
            canvas.height = this.screenHeight;
        let context = canvas.getContext("2d");
            context.imageSmoothingEnabled = false;
        this.canvasList.set(CanvasLayer.Entities, canvas);
        this.contextList.set(CanvasLayer.Entities, context);
        this.canvasList.set(CanvasLayer.Projectiles, canvas); // Skapa egna till dessa
        this.contextList.set(CanvasLayer.Projectiles, context); // Skapa egna till dessa
        this.gameContainer.appendChild(canvas);

        context.fillStyle = "#fff"; // Ta bort senare
        
        // Scene.BackgroundContext = Scene.BackgroundCanvas.getContext("2d", { alpha: false });
        // this.entityContext = this.entityCanvas.getContext("2d"); // , { willreadfrequently: true }
        // Scene.ProjectileContext = Scene.ProjectileCanvas.getContext("2d"); // , { willreadfrequently: true }
        // Scene.BackgroundContext.imageSmoothingEnabled = false;
        // this.entityContext.imageSmoothingEnabled = false;
        // Scene.ProjectileContext.imageSmoothingEnabled = false;

        // window.addEventListener("resize",function(){
        //     Game.canvas.height = window.innerHeight;
        //     Game.canvas.width = window.innerWidth;
        // });
    }
    clearCanvas() {
        this.canvasList.forEach((canvas, layer) => {
            this.contextList.get(layer).clearRect(0, 0, canvas.width, canvas.height);
        });
        // this.backgroundContext.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
        // this.projectileContext.clearRect(0, 0, this.projectileCanvas.width, this.projectileCanvas.height);

        
        // Scene.ProjectileContext.save();
        // Scene.ProjectileContext.setTransform(1, 0, 0, 1, 0, 0);
        // Scene.ProjectileContext.clearRect(0, 0, Scene.ProjectileCanvas.width, Scene.ProjectileCanvas.height);
        // Scene.ProjectileContext.restore();
    }

    drawSprite(layer: CanvasLayer, sprite: Sprite) {

    }

    drawImage(layer: CanvasLayer, image: CanvasImageSource, dx: number, dy: number) {
        this.contextList.get(layer).drawImage(image, dx, dy);
    }

    drawRect(layer: CanvasLayer, x: number, y: number, w: number, h: number, color?: string) {
        if(color) this.contextList.get(layer).fillStyle = color;
        this.contextList.get(layer).fillRect(Math.floor(x), Math.floor(y), w, h);
    }

    drawText(layer: CanvasLayer, text: string, x: number, y: number) {
        this.contextList.get(layer).fillText(text, x, y);
    }
}