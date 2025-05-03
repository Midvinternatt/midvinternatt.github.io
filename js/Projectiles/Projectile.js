import CollisionBox from "../CollisionBox.js";
class Projectile {
    // sprite: Sprite;
    static get count() {
        return Projectile._projectileList.length;
    }
    constructor(position, width, height, collisionWidth, collisionHeight) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.collisionBox = new CollisionBox(this, collisionWidth !== null && collisionWidth !== void 0 ? collisionWidth : width, collisionHeight !== null && collisionHeight !== void 0 ? collisionHeight : height);
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
Projectile._projectileList = new Array();
export default Projectile;
//# sourceMappingURL=Projectile.js.map