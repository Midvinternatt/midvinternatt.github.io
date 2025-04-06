export default class Vector {
    static nullVector: Vector = new Vector(0, 0);
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get angle(): number {
        // Osäker vilken vinkel jag vill ha?
        return Math.atan2(this.x, this.y);// * (180/Math.PI);
    }

    setRadial(angle: number, length: number): Vector {
        // Ska potentiellt avrundas till heltal
        this.x = length * Math.cos(angle);
        this.y = length * Math.sin(angle);
        return this;
    }
    scale(scaleValue: number): Vector {
        // Ska potentiellt avrundas till heltal
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
    
    equals(otherVector: Vector): boolean {
        return this.x === otherVector.x && this.y === otherVector.y
    }
    copy(): Vector {
        return new Vector(this.x, this.y);
    }
}