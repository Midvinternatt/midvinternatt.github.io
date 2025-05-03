import Renderer, { CanvasLayer } from "../Renderer.js";

export default class Button {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    text: string;
    selected: boolean;
    readonly trigger: () => void;
    // private sprite;

    constructor(text: string, x: number, y: number, width: number, height: number, triggerCallback: () => void) {
        this.text = text;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this.selected = false;
        this.trigger = triggerCallback;
    }

    draw(renderer: Renderer) {
        if(this.selected) {
            renderer.drawRect(CanvasLayer.Entities, this._x, this._y, this._width, this._height, "#fff");
            renderer.drawText(CanvasLayer.Entities, this.text, this._x + this._width / 2, this._y + this._height / 2 + 10, {font: "bold 40px Courier New", color: "#f00"});
        }
        else {
            renderer.drawRect(CanvasLayer.Entities, this._x, this._y, this._width, this._height, "#666");
            renderer.drawText(CanvasLayer.Entities, this.text, this._x + this._width / 2, this._y + this._height / 2 + 10, {font: "bold 40px Courier New", color: "#600"});
        }
    }
}