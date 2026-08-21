import CollisionBox from "../collision/CollisionBox.js";
import Sprite from "../Sprite.js";
export default class Entity {
    position;
    width;
    height;
    sprite;
    collisionBox;
    constructor({ position, sprite, width, height }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.sprite = new Sprite(sprite.data);
        this.collisionBox = new CollisionBox({ owner: this, width, height });
    }
    checkCollision(target) {
        return this.collisionBox.intersects(target.collisionBox);
    }
}
//# sourceMappingURL=Entity.js.map