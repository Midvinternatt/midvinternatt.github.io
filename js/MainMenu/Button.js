import { CanvasLayer } from "../Renderer.js";
export default class Button {
    // private sprite;
    constructor(text, x, y, width, height, triggerCallback) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.selected = false;
        this.trigger = triggerCallback;
    }
    draw(renderer) {
        if (this.selected) {
            renderer.drawRect(CanvasLayer.Entities, this.x, this.y, this.width, this.height, "#fff");
            renderer.drawText(CanvasLayer.Entities, this.text, this.x + this.width / 2, this.y + this.height / 2 + 10, { font: "bold 40px Courier New", color: "#f00" });
        }
        else {
            renderer.drawRect(CanvasLayer.Entities, this.x, this.y, this.width, this.height, "#666");
            renderer.drawText(CanvasLayer.Entities, this.text, this.x + this.width / 2, this.y + this.height / 2 + 10, { font: "bold 40px Courier New", color: "#600" });
        }
    }
}
//# sourceMappingURL=Button.js.map