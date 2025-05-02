import Rectangle from "./Rectangle.js";
export default class SceneBounds extends Rectangle {
    constructor(x, y, width, height) {
        super(width, height);
        this.x = x;
        this.y = y;
    }
    containsVector(vector) {
        return (0 < vector.x && vector.x < this.width) && (0 < vector.y && vector.y < this.height);
    }
    containsCoordinate(x, y) {
        return (0 < x && x < this.width) && (0 < y && y < this.height);
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