import Vector from "./Vector.js";

export default class ScreenBounds {
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