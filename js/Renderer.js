export var CanvasLayer;
(function (CanvasLayer) {
    CanvasLayer[CanvasLayer["Background"] = 0] = "Background";
    CanvasLayer[CanvasLayer["Entities"] = 1] = "Entities";
    CanvasLayer[CanvasLayer["Projectiles"] = 2] = "Projectiles";
    CanvasLayer[CanvasLayer["UserInterface"] = 3] = "UserInterface";
})(CanvasLayer || (CanvasLayer = {}));
export default class Renderer {
    // backgroundCanvas: HTMLCanvasElement;
    // entityCanvas: HTMLCanvasElement;
    // projectileCanvas: HTMLCanvasElement;
    // userInterfaceCanvas: HTMLCanvasElement;
    // backgroundContext: CanvasRenderingContext2D;
    // entityContext: CanvasRenderingContext2D;
    // projectileContext: CanvasRenderingContext2D;
    // userInterfaceContext: CanvasRenderingContext2D;
    constructor(gameContainer, width, height) {
        while (gameContainer.firstElementChild) {
            gameContainer.firstElementChild.remove();
        }
        gameContainer.style.width = width.toString(); // Ta bort senare
        gameContainer.style.height = height.toString(); // Ta bort senare
        this.gameContainer = gameContainer;
        this.screenWidth = width;
        this.screenHeight = height;
        this.canvasList = new Map();
        this.contextList = new Map();
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
    drawSprite(layer, sprite) {
    }
    drawImage(layer, image, dx, dy) {
        this.contextList.get(layer).drawImage(image, dx, dy);
    }
    drawRect(layer, x, y, w, h, color) {
        if (color)
            this.contextList.get(layer).fillStyle = color;
        this.contextList.get(layer).fillRect(Math.floor(x), Math.floor(y), w, h);
    }
    drawText(layer, text, x, y) {
        this.contextList.get(layer).fillText(text, x, y);
    }
}
//# sourceMappingURL=Renderer.js.map