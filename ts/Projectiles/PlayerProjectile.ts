import Projectile from "./Projectile.js";
import { canBeHit } from "../Interfaces/IHittable.js";
import GameScene from "../GameScene.js";

export default abstract class PlayerProjectile extends Projectile {
    update(scene: GameScene): void {
        this.move();

        for (let i = scene.enemies.length-1; i >= 0; i--){
            const enemy = scene.enemies[i];
            if(this.checkCollision(enemy)) {
                this.kill();
                if(canBeHit(enemy))
                    enemy.hit();
                return;
            }
        }
        
        this.sprite.update();

        if(!scene.sceneBounds.containsVector(this.position))
            this.kill();
    }
}