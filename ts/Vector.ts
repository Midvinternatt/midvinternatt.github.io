export default class Vector {
    static nullVector: Vector = new Vector(0, 0);

    x: number;
    y: number;

    /**
     * Creates a new two-dimensional vector
     */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    
    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get angle(): number {
        return Math.atan2(this.y, this.x);
    }
    // set angle(newValue: number) {
    //     this.x = Math.cos(newValue);
    //     this.y = Math.sin(newValue);
    // }

    setAngle(angle: number, length?: number): Vector {
        this.x = Math.cos(angle) * (length ?? 1);
        this.y = Math.sin(angle) * (length ?? 1);
        return this;
    }
    setLength(length: number) {

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
    add(other: Vector): Vector {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    subtract(other: Vector): Vector {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    dot(other: Vector): Vector {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }
    
    /**
     * Returns true if this vectors data matches the passed vector
     */
    equals(other: Vector): boolean {
        return this.x === other.x && this.y === other.y
    }
    /**
     * Creates a new Vector object with the same data as this vector
     */
    copy(): Vector {
        return new Vector(this.x, this.y);
    }
    /**
     * Replicates the data of this vector onto the passed vector
     */
    replicate(other: Vector): Vector {
        other.x = this.x;
        other.y = this.y;
        return other;
    }
}