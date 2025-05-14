import CollisionBox from "./../CollisionBox.js";
export default class Entity {
    position;
    collisionBox;
    width;
    height;
    // sprite: Sprite;
    constructor(position, width, height, collisionWidth, collisionHeight) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.collisionBox = new CollisionBox(this, collisionWidth ?? width, collisionHeight ?? height);
    }
    checkCollision(target) {
        return this.collisionBox.intersects(target.collisionBox);
    }
}
//# sourceMappingURL=Entity.js.map