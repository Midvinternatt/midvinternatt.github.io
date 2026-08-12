import Entity from "../Entity.js";
import Vector from "../../Vector.js";

export default abstract class Enemy extends Entity {
    isDead: boolean;

    constructor({position, width, height}: {
        position: Vector,
        width: number,
        height: number
    }) {
        super({position, width, height});
        this.isDead = false;
    }
    kill(): void {
        this.isDead = true;
    }
}