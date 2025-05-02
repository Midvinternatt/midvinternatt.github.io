import Enemy from "../Enemies/Enemy.js";
import Projectile from "./Projectile.js";
import { canBeHit } from "../Interfaces/IHittable.js";
export default class Bullet extends Projectile {
    constructor(position, velocity, size) {
        super(position, size, size, size, size);
        this.velocity = velocity;
    }
    update(scene) {
        this.move(scene.sceneBounds);
        Enemy.forEach(enemy => {
            if (this.checkCollision(enemy)) {
                this.kill();
                if (canBeHit(enemy))
                    enemy.hit();
            }
        });
    }
    move(sceneBounds) {
        this.position.add(this.velocity);
        if (!sceneBounds.containsVector(this.position))
            this.kill();
    }
}
//# sourceMappingURL=Bullet.js.map