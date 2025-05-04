import Enemy from "../Entities/Enemies/Enemy.js";
import Vector from "../Vector.js";
import Projectile from "./Projectile.js";
import { canBeHit } from "../Interfaces/IHittable.js";
import GameScene from "../GameScene.js";
import SceneBounds from "../SceneBounds.js";
import Renderer, { CanvasLayer } from "../Renderer.js";

export default class Bullet extends Projectile {
    constructor(position: Vector, velocity: Vector, size: number) {
        super(position, size, size, size, size);
        this.velocity = velocity;
    }
    update(scene: GameScene): void {
        this.move(scene.sceneBounds);    
        Enemy.forEach(enemy => {
            if(this.checkCollision(enemy)) {
                this.kill();
                if(canBeHit(enemy))
                    enemy.hit();
            }
        });
    }
    move(sceneBounds: SceneBounds) {
        this.position.add(this.velocity);
        if(!sceneBounds.containsVector(this.position))
            this.kill();
    }
    draw(renderer: Renderer) {
        renderer.drawRect(CanvasLayer.Projectiles, this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    }
}