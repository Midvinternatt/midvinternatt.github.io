export var CanvasLayer;
(function (CanvasLayer) {
    CanvasLayer[CanvasLayer["Background"] = 0] = "Background";
    CanvasLayer[CanvasLayer["Entities"] = 1] = "Entities";
    CanvasLayer[CanvasLayer["Projectiles"] = 2] = "Projectiles";
    CanvasLayer[CanvasLayer["UserInterface"] = 3] = "UserInterface";
})(CanvasLayer || (CanvasLayer = {}));
export default class Renderer {
    constructor(gameContainer) {
        // while(document.getElementById("game").firstElementChild) { document.getElementById("game").firstElementChild.remove(); }
        gameContainer.style.height = "" + window.innerHeight;
        gameContainer.style.width = "" + window.innerWidth;
        this.entityCanvas = document.createElement("canvas");
        this.entityCanvas.style.background = "#000";
        this.entityCanvas.height = window.innerHeight;
        this.entityCanvas.width = window.innerWidth;
        // Scene.BackgroundContext = Scene.BackgroundCanvas.getContext("2d", { alpha: false });
        this.entityContext = this.entityCanvas.getContext("2d"); // , { willreadfrequently: true }
        // Scene.ProjectileContext = Scene.ProjectileCanvas.getContext("2d"); // , { willreadfrequently: true }
        // Scene.BackgroundContext.imageSmoothingEnabled = false;
        this.entityContext.imageSmoothingEnabled = false;
        // Scene.ProjectileContext.imageSmoothingEnabled = false;
        gameContainer.appendChild(this.entityCanvas);
        this.entityContext.fillStyle = "#fff";
        // window.addEventListener("resize",function(){
        //     Game.canvas.height = window.innerHeight;
        //     Game.canvas.width = window.innerWidth;
        // });
    }
    clearCanvas() {
        // this.backgroundContext.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
        this.entityContext.clearRect(0, 0, this.entityCanvas.width, this.entityCanvas.height);
        // this.projectileContext.clearRect(0, 0, this.projectileCanvas.width, this.projectileCanvas.height);
        // Scene.ProjectileContext.save();
        // Scene.ProjectileContext.setTransform(1, 0, 0, 1, 0, 0);
        // Scene.ProjectileContext.clearRect(0, 0, Scene.ProjectileCanvas.width, Scene.ProjectileCanvas.height);
        // Scene.ProjectileContext.restore();
    }
    drawSprite(layer, sprite) {
    }
    drawImage(layer, image, dx, dy) {
        this.entityContext.drawImage(image, dx, dy);
    }
    drawRect(layer, x, y, w, h) {
        this.entityContext.fillRect(Math.floor(x), Math.floor(y), w, h);
    }
}
//# sourceMappingURL=Renderer.js.map