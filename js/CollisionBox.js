export class CollisionBox {
    constructor(owner, width, height) {
        this._owner = owner;
        this._width = width;
        this._height = height;
    }
    checkForCollision(otherCollisionBox) {
        if ((this._owner.position.x - this._width / 2) < (otherCollisionBox._owner.position.x + otherCollisionBox._width / 2) &&
            (this._owner.position.x + this._width / 2) > (otherCollisionBox._owner.position.x - otherCollisionBox._width / 2) &&
            (this._owner.position.y - this._height / 2) < (otherCollisionBox._owner.position.y + otherCollisionBox._height / 2) &&
            (this._owner.position.y + this._height / 2) > (otherCollisionBox._owner.position.y - otherCollisionBox._height / 2))
            return true;
    }
}
//# sourceMappingURL=CollisionBox.js.map