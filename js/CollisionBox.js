import Rectangle from "./Rectangle.js";
export default class CollisionBox extends Rectangle {
    _owner;
    get x() {
        return this._owner.position.x;
    }
    get y() {
        return this._owner.position.y;
    }
    constructor({ owner, width, height }) {
        super(width, height);
        this._owner = owner;
    }
}
//# sourceMappingURL=CollisionBox.js.map