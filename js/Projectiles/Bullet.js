import Enemy from "../Entities/Enemies/Enemy.js";
import Projectile from "./Projectile.js";
import { canBeHit } from "../Interfaces/IHittable.js";
import { CanvasLayer } from "../Renderer.js";
export default class Bullet extends Projectile {
    constructor({ position, velocity, size }) {
        super({
            position,
            width: size,
            height: size,
            collisionWidth: size,
            collisionHeight: size
        });
        this.velocity = velocity;
    }
    update(scene) {
        this.move(scene.sceneBounds);
        for (let i = scene.enemies.length - 1; i >= 0; i--) {
            const enemy = scene.enemies[i];
            if (this.checkCollision(enemy)) {
                this.kill();
                if (canBeHit(enemy))
                    enemy.hit();
            }
        }
    }
    move(sceneBounds) {
        this.position.add(this.velocity);
        if (!sceneBounds.containsVector(this.position))
            this.kill();
    }
    draw(renderer) {
        renderer.drawRect({
            layer: CanvasLayer.Projectiles,
            x: this.position.x - (this.width / 2),
            y: this.position.y - (this.height / 2),
            width: this.width,
            height: this.height
        });
    }
}
//# sourceMappingURL=Bullet.js.map