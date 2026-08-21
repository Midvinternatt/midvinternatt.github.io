import Projectile from "./Projectile.js";
export default class EnemyProjectile extends Projectile {
    update(scene) {
        this.move();
        if (!scene.sceneBounds.containsVector(this.position))
            this.kill();
        else if (this.checkCollision(scene.player)) {
            scene.player.hit();
            this.kill();
        }
    }
}
//# sourceMappingURL=EnemyProjectile.js.map