export default class Vector {
    static nullVector = new Vector(0, 0);
    x;
    y;
    constructor(x, y) {
        this.x = x ?? 0;
        this.y = y ?? 0;
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    setAngleDegrees(angle) {
        const radians = angle * Math.PI / 180;
        this.x = Math.cos(radians);
        this.y = Math.sin(radians);
        return this;
    }
    setAngleRadians(angle) {
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
        return this;
    }
    setLength(length) {
        this.x *= length;
        this.y *= length;
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
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    replicate(other) {
        other.x = this.x;
        other.y = this.y;
        return other;
    }
}
//# sourceMappingURL=Vector.js.map