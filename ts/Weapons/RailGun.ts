import Bullet from "../Projectiles/Bullet.js";
import Vector from "../Vector.js";
import Weapon from "./Weapon.js";
import Entity from "../Entity.js";
import GAMEDATA from "../Config.js";

export default class Railgun extends Weapon {
    constructor(owner: Entity, deltaPosition: Vector) {
        super(owner, deltaPosition, GAMEDATA.RAILGUN_COOLDOWN)
        this._ready = true;
    }
    shoot() {
        new Bullet(this.deltaPosition.copy().add(this.owner.position), new Vector(0, -8), 10);
        this._ready = false;
        this.cooldownTimer = setTimeout((weapon: Railgun) => {
            weapon._ready = true;
        }, this.cooldown, this);
    }
}