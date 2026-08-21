export class LinePattern {
    elapsed = 0;
    velocity;
    constructor(velocity) {
        this.velocity = velocity;
    }
    update(position) {
        this.elapsed++;
        position.add(this.velocity);
    }
}
export class CirclePattern {
    elapsed = 0;
    update() { }
}
//# sourceMappingURL=Pattern.js.map