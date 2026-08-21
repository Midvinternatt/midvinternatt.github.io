export default class Vector {
    static nullVector: Vector = new Vector(0, 0);

    /**
     * Creates a new two-dimensional vector
     */
    constructor(
        public x: number,
        public y: number
    ) {}
    
    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get angle(): number {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Takes angle as radians and returns a normalized vector
     */
    setAngleDegrees(angle: number): Vector {
        const radians = angle * Math.PI / 180;
        this.x = Math.cos(radians);
        this.y = Math.sin(radians);
        return this;
    }
    /**
     * Takes angle as degrees and returns a normalized vector
     */
    setAngleRadians(angle: number): Vector {
        // this.x = Math.cos(angle) * (length ?? 1);
        // this.y = Math.sin(angle) * (length ?? 1);
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
        return this;
    }
    setLength(length: number): Vector {
        this.x *= length;
        this.y *= length;
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
    static fromPolar({angle, length}: {angle: number, length: number}): Vector {
        const radians = angle * Math.PI / 180;
        return new Vector(Math.cos(radians) * length, Math.sin(radians) * length)
    }
}
