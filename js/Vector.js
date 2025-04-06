class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get angle() {
        // Osäker vilken vinkel jag vill ha?
        return Math.atan2(this.x, this.y); // * (180/Math.PI);
    }
    setRadial(angle, length) {
        // Ska potentiellt avrundas till heltal
        this.x = length * Math.cos(angle);
        this.y = length * Math.sin(angle);
        return this;
    }
    scale(scaleValue) {
        // Ska potentiellt avrundas till heltal
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