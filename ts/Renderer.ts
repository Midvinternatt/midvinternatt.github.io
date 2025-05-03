import Sprite from "./Sprite.js";

export enum CanvasLayer {
    Background,
    Entities,
    Menu,
    Projectiles,
    UserInterface
}

export default class Renderer {
    private gameContainer: HTMLElement;
    private _width: number;
    private _height: number;
    private canvasList: Map<CanvasLayer, HTMLCanvasElement>;
    private contextList: Map<CanvasLayer, CanvasRenderingContext2D>;

    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }

    constructor(gameContainer: HTMLElement, width: number, height: number) {
        while(gameContainer.firstElementChild) { gameContainer.firstElementChild.remove(); }
        
        gameContainer.style.width = width.toString() + "px"; // Ta bort senare
        gameContainer.style.height = height.toString() + "px"; // Ta bort senare

        this.gameContainer = gameContainer;
        this._width = width;
        this._height = height;
        this.canvasList = new Map<CanvasLayer, HTMLCanvasElement>();
        this.contextList = new Map<CanvasLayer, CanvasRenderingContext2D>();

        function addLayer(renderer: Renderer, layer: CanvasLayer, options?: CanvasRenderingContext2DSettings) {
            let canvas = document.createElement("canvas");
                // canvas.style.background = "#000";
                canvas.width = renderer._width;
                canvas.height = renderer._height;
                canvas.style.width = "${renderer._width}px";
                canvas.style.height = "${renderer._height}px";
            let context = canvas.getContext("2d", options);
                context.imageSmoothingEnabled = false;
            renderer.canvasList.set(layer, canvas);
            renderer.contextList.set(layer, context);
            renderer.gameContainer.appendChild(canvas);

            context.fillStyle = "#fff";
        }

        addLayer(this, CanvasLayer.Entities, { alpha: true });
        addLayer(this, CanvasLayer.Projectiles, { alpha: true });

        /*
        let canvas = document.createElement("canvas");
            canvas.style.background = "#000";
            canvas.width = width;
            canvas.height = height;
        let context = canvas.getContext("2d");
            context.imageSmoothingEnabled = false;
        this.canvasList.set(CanvasLayer.Entities, canvas);
        this.contextList.set(CanvasLayer.Entities, context);
        this.canvasList.set(CanvasLayer.Projectiles, canvas); // Skapa egna till dessa
        this.contextList.set(CanvasLayer.Projectiles, context); // Skapa egna till dessa
        this.gameContainer.appendChild(canvas);
        */

        // context.fillStyle = "#fff"; // Ta bort senare
        
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
    addCanvasLayer(layer: CanvasLayer, imageSmoothingEnabled: boolean = false) {
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

    drawText(layer: CanvasLayer, text: string, x: number, y: number, style?: {font: string, color: string}) {
        if(style.font) this.contextList.get(layer).font = style.font;
        if(style.color) this.contextList.get(layer).fillStyle = style.color;
        const measure = this.contextList.get(layer).measureText(text);
        this.contextList.get(layer).fillText(text, x - measure.width / 2, y);
    }
}