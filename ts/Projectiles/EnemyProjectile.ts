import Projectile from "./Projectile.js";
import GameScene from "../GameScene.js";

export default abstract class EnemyProjectile extends Projectile {
    update(scene: GameScene): void {
        this.move();

        if(!scene.sceneBounds.containsVector(this.position))
            this.kill();
        else if(this.checkCollision(scene.player)) {
            scene.player.hit();
            this.kill();
        }
    }
}