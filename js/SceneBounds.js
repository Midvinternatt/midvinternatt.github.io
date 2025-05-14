import Rectangle from "./Rectangle.js";
export default class SceneBounds extends Rectangle {
    x;
    y;
    left;
    right;
    top;
    bottom;
    /**
     * Creates a new object centered at screen-coordinates (x, y)
     */
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
/*
export default class SceneBounds {
    width: number;
    height: number;
    // outerWidth: number;
    // outerHeight: number;

    constructor(width: number, height: number, outerWidth?, outerHeight?) {
        this.width = width;
        this.height = height;
        // this.outerWidth = outerWidth;
        // this.outerHeight = outerHeight;
    }

    isVectorInbound(vector: Vector): boolean {
        return (0 < vector.x && vector.x < this.width) && (0 < vector.y && vector.y < this.height);
    }
    isCoordinateInbound(x: number, y: number): boolean {
        return (0 < x && x < this.width) && (0 < y && y < this.height);
    }
}
*/ 
//# sourceMappingURL=SceneBounds.js.map