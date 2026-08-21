import Vector from "../Vector.js";

export interface Formation {
    getPosition(index: number): Vector
}

export class LineFormation implements Formation {
    private readonly origin: Vector;
    readonly amount: number;
    private readonly spacing: number;
    private readonly direction: number;

    constructor({position, amount, spacing, direction}: {
        position: {x: number, y: number},
        amount: number,
        spacing: number,
        direction: number
    }) {
        this.origin = new Vector(position.x, position.y);
        this.amount = amount;
        this.spacing = spacing;
        this.direction = direction;
    }

    getPosition(index: number): Vector {
        const offset: Vector = Vector.fromPolar({angle: this.direction, length: this.spacing * index});
        return this.origin.copy().add(offset);
    }
}