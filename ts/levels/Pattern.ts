import Vector from "../Vector.js";

export interface Pattern {
    elapsed: number;
    update(velocity: Vector): void;
}

export class LinePattern implements Pattern {
    elapsed: number = 0;
    velocity: Vector;

    constructor(velocity: Vector) {
        this.velocity = velocity;
    }

    update(position: Vector): void {
        this.elapsed++;
        position.add(this.velocity)
    }
}

export class CirclePattern implements Pattern {
    elapsed: number = 0;
    update(): void {}
}