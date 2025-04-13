class Vector {
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
    set angle(newValue) {
        this.x = Math.cos(newValue);
        this.y = Math.sin(newValue);
    }
    setAngle(angle, length) {
        this.x = Math.cos(angle) * (length !== null && length !== void 0 ? length : 1);
        this.y = Math.sin(angle) * (length !== null && length !== void 0 ? length : 1);
        return this;
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
    add(otherVector) {
        this.x += otherVector.x;
        this.y += otherVector.y;
        return this;
    }
    subtract(otherVector) {
        this.x -= otherVector.x;
        this.y -= otherVector.y;
        return this;
    }
    dot(otherVector) {
        this.x *= otherVector.x;
        this.y *= otherVector.y;
        return this;
    }
    equals(otherVector) {
        return this.x === otherVector.x && this.y === otherVector.y;
    }
    copy() {
        return new Vector(this.x, this.y);
    }
}
Vector.nullVector = new Vector(0, 0);
export default Vector;
//# sourceMappingURL=Vector.js.map