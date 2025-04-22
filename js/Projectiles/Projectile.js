import CollisionBox from "../CollisionBox.js";
import { CanvasLayer } from "../Renderer.js";
class Projectile {
    static get count() {
        return Projectile._projectileList.length;
    }
    constructor(position, width, height, collisionWidth, collisionHeight) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.collisionBox = new CollisionBox(this, collisionWidth !== null && collisionWidth !== void 0 ? collisionWidth : width, collisionHeight !== null && collisionHeight !== void 0 ? collisionHeight : height);
        Projectile._projectileList.push(this);
    }
    checkCollision(target) {
        return this.collisionBox.checkForCollision(target.collisionBox);
    }
    kill() {
        Projectile._projectileList.splice(Projectile._projectileList.indexOf(this), 1);
    }
    draw(renderer) {
        renderer.drawRect(CanvasLayer.Projectiles, this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    }
    static forEach(callback) {
        Projectile._projectileList.forEach(callback);
    }
}
Projectile._projectileList = new Array();
export default Projectile;
//# sourceMappingURL=Projectile.js.map