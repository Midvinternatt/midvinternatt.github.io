import Rectangle from "./Rectangle.js";
export default class SceneBounds extends Rectangle {
    x;
    y;
    left;
    right;
    top;
    bottom;
    constructor(x, y, width, height) {
        super(width, height);
        this.x = x;
        this.y = y;
        this.left = this.x - (this.width / 2) | 0;
        this.right = this.x + (this.width / 2) | 0;
        this.top = this.y - (this.height / 2) | 0;
        this.bottom = this.y + (this.height / 2) | 0;
    }
    containsVector(vector) {
        return (this.left <= vector.x && vector.x <= this.right &&
            this.top <= vector.y && vector.y <= this.bottom);
    }
    containsCoordinate(x, y) {
        return (this.left <= x && x <= this.right &&
            this.top <= y && y <= this.bottom);
    }
}
//# sourceMappingURL=SceneBounds.js.map