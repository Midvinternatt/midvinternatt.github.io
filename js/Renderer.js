export var CanvasLayer;
(function (CanvasLayer) {
    CanvasLayer[CanvasLayer["Entities"] = 0] = "Entities";
    CanvasLayer[CanvasLayer["Projectiles"] = 1] = "Projectiles";
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
    constructor({ gameContainer, width, height }) {
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
            const context = canvas.getContext("2d", options);
            context.imageSmoothingEnabled = false;
            renderer._canvasList.set(layer, canvas);
            renderer._contextList.set(layer, context);
            renderer._gameContainer.appendChild(canvas);
            context.fillStyle = "#fff";
        }
        addLayer(this, CanvasLayer.Entities, { alpha: true });
        addLayer(this, CanvasLayer.Projectiles, { alpha: true });
    }
    clearCanvas() {
        this._canvasList.forEach((canvas, layer) => {
            this._contextList.get(layer).clearRect(0, 0, canvas.width, canvas.height);
        });
    }
    drawSprite({ layer, image, x, y, width, height, frameIndex, row }) {
        this._contextList.get(layer).drawImage(image, 1 + frameIndex * (width + 1), 1 + row * (height + 1), width, height, x | 0, y | 0, width, height);
    }
    drawImage({ layer, image, x, y }) {
        this._contextList.get(layer).drawImage(image, x | 0, y | 0);
    }
    drawRect({ layer, x, y, width, height, color = "#FFF" }) {
        this._contextList.get(layer).fillStyle = color;
        this._contextList.get(layer).fillRect(x | 0, y | 0, width | 0, height | 0);
    }
    drawText(layer, text, x, y, style) {
        if (style) {
            this._contextList.get(layer).font = style.font;
            this._contextList.get(layer).fillStyle = style.color;
        }
        const measure = this._contextList.get(layer).measureText(text);
        this._contextList.get(layer).fillText(text, x - measure.width / 2, y);
    }
}
//# sourceMappingURL=Renderer.js.map