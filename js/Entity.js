// import CollisionBox from "./CollisionBox.js";
// import ICollidable from "./Interfaces/ICollidable.js";
import { CollisionBox } from "./CollisionBox.js";
export default class Entity {
    constructor(position, width, height, collisionWidth, collisionHeight) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.collisionBox = new CollisionBox(this, collisionWidth !== null && collisionWidth !== void 0 ? collisionWidth : width, collisionHeight !== null && collisionHeight !== void 0 ? collisionHeight : height);
    }
    checkCollision(target) {
        return this.collisionBox.checkForCollision(target.collisionBox);
    }
}
//# sourceMappingURL=Entity.js.map