import { CanvasLayer } from "../Renderer.js";
export default class Button {
    _x;
    _y;
    _width;
    _height;
    text;
    selected;
    trigger;
    // private sprite;
    constructor(text, x, y, width, height, triggerCallback) {
        this.text = text;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this.selected = false;
        this.trigger = triggerCallback;
    }
    draw(renderer) {
        if (this.selected) {
            renderer.drawRect(CanvasLayer.Entities, this._x, this._y, this._width, this._height, "#fff");
            renderer.drawText(CanvasLayer.Entities, this.text, this._x + this._width / 2, this._y + this._height / 2 + 10, { font: "bold 40px Courier New", color: "#f00" });
        }
        else {
            renderer.drawRect(CanvasLayer.Entities, this._x, this._y, this._width, this._height, "#666");
            renderer.drawText(CanvasLayer.Entities, this.text, this._x + this._width / 2, this._y + this._height / 2 + 10, { font: "bold 40px Courier New", color: "#600" });
        }
    }
}
//# sourceMappingURL=Button.js.map