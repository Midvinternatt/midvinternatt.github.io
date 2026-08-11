import CollisionBox from "../CollisionBox.js";
export default class Projectile {
    position;
    velocity;
    width;
    height;
    isDead;
    collisionBox;
    sprite;
    constructor(position, width, height, collisionWidth, collisionHeight) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.isDead = false;
        this.collisionBox = new CollisionBox(this, collisionWidth ?? width, collisionHeight ?? height);
    }
    checkCollision(target) {
        return this.collisionBox.intersects(target.collisionBox);
    }
    kill() {
        this.isDead = true;
    }
}
//# sourceMappingURL=Projectile.js.map