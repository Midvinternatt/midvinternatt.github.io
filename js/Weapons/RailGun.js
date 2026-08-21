import Vector from "../Vector.js";
import Weapon from "./Weapon.js";
import Game from "../Game.js";
import Bullet from "../Projectiles/Bullet.js";
export default class Railgun extends Weapon {
    constructor({ owner, attachmentPosition }) {
        super({
            owner,
            attachmentPosition,
            fireRate: 10
        });
    }
    shoot(scene) {
        this.lastFired = Game.time;
        scene.spawnProjectile(new Bullet({
            position: this.attachmentPosition.copy().add(this.owner.position),
            velocity: new Vector(0, -8)
        }));
    }
}
//# sourceMappingURL=RailGun.js.map