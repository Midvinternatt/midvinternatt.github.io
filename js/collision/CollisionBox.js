import Rectangle from "./Rectangle.js";
export default class CollisionBox extends Rectangle {
    #owner;
    get x() {
        return this.#owner.position.x;
    }
    get y() {
        return this.#owner.position.y;
    }
    constructor({ owner, width, height }) {
        super(width, height);
        this.#owner = owner;
    }
}
//# sourceMappingURL=CollisionBox.js.map