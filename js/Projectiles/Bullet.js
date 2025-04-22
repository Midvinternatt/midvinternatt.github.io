import Enemy from "../Enemies/Enemy.js";
import Projectile from "./Projectile.js";
import { canBeHit } from "../Interfaces/IHittable.js";
import Game from "../Game.js";
export default class Bullet extends Projectile {
    constructor(position, velocity, size) {
        super(position, size, size, size, size);
        this.velocity = velocity;
    }
    update() {
        this.move();
        Enemy.forEach(enemy => {
            if (this.checkCollision(enemy)) {
                this.kill();
                if (canBeHit(enemy))
                    enemy.hit();
            }
        });
    }
    move() {
        this.position.add(this.velocity);
        if (!Game.activeScene.sceneBounds.isVectorInbound(this.position))
            this.kill();
    }
}
//# sourceMappingURL=Bullet.js.map