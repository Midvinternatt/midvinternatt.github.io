import { Collidable } from "./ICollidable.js";
import Rectangle from "./Rectangle.js";

export default class CollisionBox extends Rectangle {
    #owner: Collidable;

    get x(): number {
        return this.#owner.position.x;
    }
    get y(): number {
        return this.#owner.position.y;
    }
    
    constructor({owner, width, height}: {owner: Collidable, width: number, height: number}) {
        super(width, height);
        this.#owner = owner;
    }
}
