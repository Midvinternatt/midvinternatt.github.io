import Enemy from "../Enemies/Enemy.js";
import Vector from "../Vector.js";
import Projectile from "./Projectile.js";

export default class Bullet extends Projectile {
    constructor(position: Vector, velocity: Vector, size: number) {
        super(position, size, size, size);
        this.velocity = velocity;
    }
    update(): void {
        this.move();    
        Enemy.getAllEnemies().forEach(enemy => {
            if(this.checkCollision(enemy))
                this.kill();
        });
    }
    move() {
        this.position.add(this.velocity);

        if(this.position.x < 0 || this.position.x > 1024
        || this.position.y < 0 || this.position.y > 1024)
            this.kill();
    }
}