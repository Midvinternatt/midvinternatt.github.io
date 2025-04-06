import Entity from "../Entity.js";
import Game from "../Game.js";
import Projectile from "../Projectiles/Projectile.js";
import Vector from "../Vector.js";
import Weapon from "../Weapons/Weapon.js";
import Enemy from "./Enemy.js";

export default class Drone extends Enemy {
    velocity: Vector;
    weapon: DroneWeapon;

    constructor(position: Vector) {
        super(position, 50, 50);
        this.weapon = new DroneWeapon(this);
    }

    update(): void {
        if(this.weapon.isReady)
            this.weapon.shoot();
        // this._position.add(this._velocity);
    }
    move(): void {

    }
    kill(): void {

    }
    draw(context: CanvasRenderingContext2D): void {
        context.fillRect(this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    }
}

class DroneWeapon extends Weapon {
    constructor(owner: Entity) {
        super(owner, new Vector(0, 0), 1000);
        this._ready = true;
    }

    shoot() {
        new DroneBullet(this.owner.position.copy(), new Vector(0, 8));
        this._ready = false;
        this.cooldownTimer = setTimeout((weapon: DroneWeapon) => {
            weapon._ready = true;
        }, this.cooldown, this);
    }
}

class DroneBullet extends Projectile {
    constructor(position: Vector, velocity: Vector) {
        super(position, 10, 10, 10);
        this.velocity = velocity;
    }
    update(): void {
        this.move();
        if(this.checkCollision(Game.player))
            this.kill();
    }
    move(): void {
        this.position.add(this.velocity);

        if(this.position.x < 0 || this.position.x > 1024
        || this.position.y < 0 || this.position.y > 1024)
            this.kill();
    }
}