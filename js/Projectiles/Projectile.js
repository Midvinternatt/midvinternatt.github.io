import CollisionBox from "../collision/CollisionBox.js";
export default class Projectile {
    position;
    velocity;
    width;
    height;
    isDead;
    collisionBox;
    sprite;
    constructor({ position, velocity, width, height, collisionWidth, collisionHeight }) {
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.isDead = false;
        this.collisionBox = new CollisionBox({
            owner: this,
            width: collisionWidth ?? width,
            height: collisionHeight ?? height
        });
    }
    checkCollision(target) {
        return this.collisionBox.intersects(target.collisionBox);
    }
    move() {
        this.position.add(this.velocity);
    }
    kill() {
        this.isDead = true;
    }
}
//# sourceMappingURL=Projectile.js.map