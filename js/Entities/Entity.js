import CollisionBox from "./../collision/CollisionBox.js";
export default class Entity {
    position;
    collisionBox;
    width;
    height;
    sprite;
    constructor({ position, width, height, collisionWidth, collisionHeight }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.collisionBox = new CollisionBox({
            owner: this,
            width: collisionWidth ?? width,
            height: collisionHeight ?? height
        });
    }
    checkCollision(target) {
        return this.collisionBox.intersects(target.collisionBox);
    }
}
//# sourceMappingURL=Entity.js.map