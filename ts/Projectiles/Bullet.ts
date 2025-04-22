import Enemy from "../Enemies/Enemy.js";
import Vector from "../Vector.js";
import Projectile from "./Projectile.js";
import { canBeHit } from "../Interfaces/IHittable.js";
import Game from "../Game.js";

export default class Bullet extends Projectile {
    constructor(position: Vector, velocity: Vector, size: number) {
        super(position, size, size, size, size);
        this.velocity = velocity;
    }
    update(): void {
        this.move();    
        Enemy.forEach(enemy => {
            if(this.checkCollision(enemy)) {
                this.kill();
                if(canBeHit(enemy))
                    enemy.hit();
            }
        });
    }
    move() {
        this.position.add(this.velocity);
        if(!Game.activeScene.sceneBounds.isVectorInbound(this.position))
            this.kill();
    }
}