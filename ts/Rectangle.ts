export default abstract class Rectangle {
    width: number;
    height: number;

    abstract get x(): number;
    abstract get y(): number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    /**
     * Returns true if this completely encompasses the passed rectangle
     */
    contains(other: Rectangle): boolean {
        return (
            other.x >= this.x &&
            other.y >= this.y &&
            (other.x + other.width) <= (this.x + this.width) &&
            (other.y + other.height) <= (this.y + this.height)
        );
    }

    /**
     * Returns true if this and the passed rectangle overlap at any point
     */
    intersects(other: Rectangle): boolean {
        return (
            (this.x - this.width / 2) < (other.x + other.width / 2) &&
            (this.x + this.width / 2) > (other.x - other.width / 2) &&
            (this.y - this.height / 2) < (other.y + other.height / 2) &&
            (this.y + this.height / 2) > (other.y - other.height / 2)
        );
    }

    getIntersection(other: Rectangle): Rectangle | null {
        if (!this.intersects(other))
            return null;
    
        const x1 = Math.max(this.x - this.width / 2, other.x - other.width / 2);
        const y1 = Math.max(this.y - this.height / 2, other.y - other.height / 2);
        const x2 = Math.min(this.x + this.width / 2, other.x + other.width / 2);
        const y2 = Math.min(this.y + this.height / 2, other.y + other.height / 2);
    
        return new IntersectionRectangle(
            (x1 + x2) / 2,
            (y1 + y2) / 2,
            x2 - x1,
            y2 - y1
        );
    }
}

export class IntersectionRectangle extends Rectangle {
    x: number;
    y: number;

    constructor(x: number, y: number, width: number, height: number) {
        super(width, height);
        this.x = x;
        this.y = y;
    }
}
