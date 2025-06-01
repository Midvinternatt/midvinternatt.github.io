import CollisionBox from "../CollisionBox.js";
export default class Projectile {
    static _projectileList = new Array();
    position;
    velocity;
    width;
    height;
    collisionBox;
    sprite;
    static get count() {
        return Projectile._projectileList.length;
    }
    constructor(position, width, height, collisionWidth, collisionHeight) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.collisionBox = new CollisionBox(this, collisionWidth ?? width, collisionHeight ?? height);
        if (Projectile.count < 10000)
            Projectile._projectileList.push(this);
    }
    checkCollision(target) {
        return this.collisionBox.intersects(target.collisionBox);
    }
    kill() {
        Projectile._projectileList.splice(Projectile._projectileList.indexOf(this), 1);
    }
    static forEach(callback) {
        Projectile._projectileList.forEach(callback);
    }
}
//# sourceMappingURL=Projectile.js.map