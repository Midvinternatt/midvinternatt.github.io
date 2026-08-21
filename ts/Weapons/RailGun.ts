import Vector from "../Vector.js";
import Weapon from "./Weapon.js";
import Player from "../entities/Player.js";
import Game from "../Game.js";
import GameScene from "../GameScene.js";
import Bullet from "../Projectiles/Bullet.js";

export default class Railgun extends Weapon {
    constructor({owner, attachmentPosition}: {owner: Player, attachmentPosition: Vector}) {
        super({
            owner,
            attachmentPosition,
            fireRate: 10
        })
    }
    shoot(scene: GameScene) {
        this.lastFired = Game.time;
        scene.spawnProjectile(new Bullet({
            position: this.attachmentPosition.copy().add(this.owner.position),
            velocity: new Vector(0, -8)
        }));
    }
}