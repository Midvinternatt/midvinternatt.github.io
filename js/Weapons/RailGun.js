import Bullet from "../Projectiles/Bullet.js";
import Vector from "../Vector.js";
import Weapon from "./Weapon.js";
import GAMEDATA from "../Config.js";
import Game from "../Game.js";
export default class Railgun extends Weapon {
    constructor({ owner, attachmentPosition }) {
        super({
            owner,
            attachmentPosition,
            fireRate: GAMEDATA.RAILGUN_COOLDOWN
        });
    }
    shoot() {
        this.lastFired = Game.time;
        return new Bullet({
            position: this.attachmentPosition.copy().add(this.owner.position),
            velocity: new Vector(0, -8),
            size: 6
        });
    }
}
//# sourceMappingURL=RailGun.js.map