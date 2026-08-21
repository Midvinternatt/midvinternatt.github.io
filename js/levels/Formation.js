import Vector from "../Vector.js";
export class LineFormation {
    origin;
    amount;
    spacing;
    direction;
    constructor({ position, amount, spacing, direction }) {
        this.origin = new Vector(position.x, position.y);
        this.amount = amount;
        this.spacing = spacing;
        this.direction = direction;
    }
    getPosition(index) {
        const offset = Vector.fromPolar({ angle: this.direction, length: this.spacing * index });
        return this.origin.copy().add(offset);
    }
}
//# sourceMappingURL=Formation.js.map