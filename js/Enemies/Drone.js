import Game from "../Game.js";
import Projectile from "../Projectiles/Projectile.js";
import Vector from "../Vector.js";
import Weapon from "../Weapons/Weapon.js";
import Enemy from "./Enemy.js";
export default class Drone extends Enemy {
    constructor(position) {
        super(position, 50, 50);
        this.weapon = new DroneWeapon(this);
    }
    update() {
        if (this.weapon.isReady)
            this.weapon.shoot();
        // this._position.add(this._velocity);
    }
    move() {
    }
    kill() {
    }
    draw(context) {
        context.fillRect(this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    }
}
class DroneWeapon extends Weapon {
    constructor(owner) {
        super(owner, new Vector(0, 0), 1000);
        this._ready = true;
    }
    shoot() {
        new DroneBullet(this.owner.position.copy(), new Vector(0, 8));
        this._ready = false;
        this.cooldownTimer = setTimeout((weapon) => {
            weapon._ready = true;
        }, this.cooldown, this);
    }
}
class DroneBullet extends Projectile {
    constructor(position, velocity) {
        super(position, 10, 10, 10);
        this.velocity = velocity;
    }
    update() {
        this.move();
        if (this.checkCollision(Game.player))
            this.kill();
    }
    move() {
        this.position.add(this.velocity);
        if (this.position.x < 0 || this.position.x > 1024
            || this.position.y < 0 || this.position.y > 1024)
            this.kill();
    }
}
//# sourceMappingURL=Drone.js.map