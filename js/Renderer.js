export var CanvasLayer;
(function (CanvasLayer) {
    CanvasLayer[CanvasLayer["Background"] = 0] = "Background";
    CanvasLayer[CanvasLayer["Entities"] = 1] = "Entities";
    CanvasLayer[CanvasLayer["Menu"] = 2] = "Menu";
    CanvasLayer[CanvasLayer["Projectiles"] = 3] = "Projectiles";
    CanvasLayer[CanvasLayer["UserInterface"] = 4] = "UserInterface";
})(CanvasLayer || (CanvasLayer = {}));
export default class Renderer {
    _gameContainer;
    _width;
    _height;
    _canvasList;
    _contextList;
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    constructor(gameContainer, width, height) {
        while (gameContainer.firstElementChild) {
            gameContainer.firstElementChild.remove();
        }
        this._gameContainer = gameContainer;
        this._gameContainer.style.width = `${width}px`;
        this._gameContainer.style.height = `${height}px`;
        this._width = width;
        this._height = height;
        this._canvasList = new Map();
        this._contextList = new Map();
        function addLayer(renderer, layer, options) {
            const canvas = document.createElement("canvas");
            canvas.width = renderer._width;
            canvas.height = renderer._height;
            // canvas.style.width = "${renderer._width}px";
            // canvas.style.height = "${renderer._height}px";
            const context = canvas.getContext("2d", options);
            context.imageSmoothingEnabled = false;
            renderer._canvasList.set(layer, canvas);
            renderer._contextList.set(layer, context);
            renderer._gameContainer.appendChild(canvas);
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
    clearCanvas() {
        this._canvasList.forEach((canvas, layer) => {
            this._contextList.get(layer).clearRect(0, 0, canvas.width, canvas.height);
        });
        // this.backgroundContext.clearRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height);
        // this.projectileContext.clearRect(0, 0, this.projectileCanvas.width, this.projectileCanvas.height);
        // Scene.ProjectileContext.save();
        // Scene.ProjectileContext.setTransform(1, 0, 0, 1, 0, 0);
        // Scene.ProjectileContext.clearRect(0, 0, Scene.ProjectileCanvas.width, Scene.ProjectileCanvas.height);
        // Scene.ProjectileContext.restore();
    }
    drawSprite(layer, image, x, y, frameIndex, width, height) {
        this._contextList.get(layer).drawImage(image, frameIndex * width, 0, width, height, x | 0, y | 0, width, height);
    }
    drawImage(layer, image, x, y) {
        this._contextList.get(layer).drawImage(image, x | 0, y | 0);
    }
    drawRect(layer, x, y, w, h, color) {
        if (color)
            this._contextList.get(layer).fillStyle = color;
        this._contextList.get(layer).fillRect(x | 0, y | 0, w | 0, h | 0);
    }
    drawText(layer, text, x, y, style) {
        if (style.font)
            this._contextList.get(layer).font = style.font;
        if (style.color)
            this._contextList.get(layer).fillStyle = style.color;
        const measure = this._contextList.get(layer).measureText(text);
        this._contextList.get(layer).fillText(text, x - measure.width / 2, y);
    }
}
//# sourceMappingURL=Renderer.js.map