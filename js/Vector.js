class Vector {
    /**
     * Creates a new two-dimensional vector
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    // set angle(newValue: number) {
    //     this.x = Math.cos(newValue);
    //     this.y = Math.sin(newValue);
    // }
    setAngle(angle, length) {
        this.x = Math.cos(angle) * (length !== null && length !== void 0 ? length : 1);
        this.y = Math.sin(angle) * (length !== null && length !== void 0 ? length : 1);
        return this;
    }
    setLength(length) {
    }
    scale(scaleValue) {
        this.x *= scaleValue;
        this.y *= scaleValue;
        return this;
    }
    normalize() {
        let l = this.length;
        this.x = this.x / l || 0;
        this.y = this.y / l || 0;
        return this;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
    dot(other) {
        this.x *= other.x;
        this.y *= other.y;
        return this;
    }
    /**
     * Returns true if this vectors data matches the passed vector
     */
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    /**
     * Creates a new Vector object with the same data as this vector
     */
    copy() {
        return new Vector(this.x, this.y);
    }
    /**
     * Replicates the data of this vector onto the passed vector
     */
    replicate(other) {
        other.x = this.x;
        other.y = this.y;
        return other;
    }
}
Vector.nullVector = new Vector(0, 0);
export default Vector;
//# sourceMappingURL=Vector.js.map