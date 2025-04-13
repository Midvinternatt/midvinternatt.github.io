export default class Vector {
    static nullVector: Vector = new Vector(0, 0);

    constructor(public x: number, public y: number) { }
    
    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get angle(): number {
        return Math.atan2(this.y, this.x);
    }
    set angle(newValue: number) {
        this.x = Math.cos(newValue);
        this.y = Math.sin(newValue);
    }

    setAngle(angle: number, length?: number): Vector {
        this.x = Math.cos(angle) * (length ?? 1);
        this.y = Math.sin(angle) * (length ?? 1);
        return this;
    }
    scale(scaleValue: number): Vector {
        this.x *= scaleValue;
        this.y *= scaleValue;
        return this;
    }
    normalize(): Vector {
        let l = this.length;
        this.x = this.x / l || 0;
        this.y = this.y / l || 0;
        return this;
    }
    add(otherVector: Vector): Vector {
        this.x += otherVector.x;
        this.y += otherVector.y;
        return this;
    }
    subtract(otherVector: Vector): Vector {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
        return this;
    }
    dot(otherVector: Vector): Vector {
        this.x *= otherVector.x;
        this.y *= otherVector.y;
        return this;
    }
    
    equals(otherVector: Vector): boolean {
        return this.x === otherVector.x && this.y === otherVector.y
    }
    copy(): Vector {
        return new Vector(this.x, this.y);
    }
}