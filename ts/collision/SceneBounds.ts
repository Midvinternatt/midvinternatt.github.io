import Rectangle from "./Rectangle.js";
import Vector from "../Vector.js";

export default class SceneBounds extends Rectangle {
    get x(): number {
        return this.left;
    }
    get y(): number {
        return this.top;
    }
    declare readonly width: number;
    declare readonly height: number;

    readonly left: number;
    readonly right: number;
    readonly top: number;
    readonly bottom: number;
    
    get position(): Vector {
        return new Vector(this.x + this.width / 2, this.y + this.height / 2);
    }

    constructor({x, y, width, height}: {x: number, y: number, width: number, height: number}) {
        super(width, height);
        
        this.left = x;
        this.right = x + width;
        this.top = y;
        this.bottom = y + height;
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
