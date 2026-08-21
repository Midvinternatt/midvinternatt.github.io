import Rectangle from "./Rectangle.js";
import Vector from "../Vector.js";
export default class SceneBounds extends Rectangle {
    get x() {
        return this.left;
    }
    get y() {
        return this.top;
    }
    left;
    right;
    top;
    bottom;
    get position() {
        return new Vector(this.x + this.width / 2, this.y + this.height / 2);
    }
    constructor({ x, y, width, height }) {
        super(width, height);
        this.left = x;
        this.right = x + width;
        this.top = y;
        this.bottom = y + height;
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