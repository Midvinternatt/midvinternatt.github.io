import Rectangle from "./Rectangle.js";
import Vector from "./Vector.js";

export default class SceneBounds extends Rectangle {
    readonly x: number;
    readonly y: number;
    override readonly width: number;
    override readonly height: number;

    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly bottom: number;

    /**
     * Creates a new object centered at screen-coordinates (x, y)
     */
    constructor(x: number, y: number, width: number, height: number) {
        super(width, height);
        this.x = x;
        this.y = y;
        
        this.left = this.x - (this.width / 2) | 0;
        this.right = this.x + (this.width / 2) | 0;
        this.top = this.y - (this.height / 2) | 0;
        this.bottom = this.y + (this.height / 2) | 0;
    }

    containsVector(vector: Vector): boolean {
        return (
            this.left <= vector.x && vector.x <= this.right &&
            this.top <= vector.y && vector.y <= this.bottom
        );
    }
    containsCoordinate(x: number, y: number): boolean {
        return (
            this.left <= x && x <= this.right &&
            this.top <= y && y <= this.bottom
        );
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