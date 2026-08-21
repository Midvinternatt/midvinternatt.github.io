import AssetsLoader from "../assets/AssetsLoader.js";
import Game from "../Game.js";
import { CanvasLayer } from "../Renderer.js";
import Vector from "../Vector.js";
import Weapon from "../Weapons/Weapon.js";
import EnemyProjectile from "../Projectiles/EnemyProjectile.js";
import Entity from "./Entity.js";
export default class Enemy extends Entity {
    pattern;
    weapon;
    lifetime;
    isDead = false;
    constructor({ enemyData, position, pattern, lifetime }) {
        super({
            position,
            sprite: {
                data: AssetsLoader.getSpriteData(enemyData.sprite),
                defaultAnimation: "idle"
            },
            width: enemyData.collision.width,
            height: enemyData.collision.height
        });
        this.weapon = new EnemyWeapon({
            owner: this,
            attachmentPosition: new Vector(enemyData.weapon.offset.x, enemyData.weapon.offset.y),
            facing: Vector.fromPolar({ angle: 90, length: enemyData.weapon.projectileSpeed }),
            fireRate: enemyData.weapon.fireRate * Game.maxFps
        });
        this.pattern = pattern;
        this.lifetime = lifetime;
    }
    hit() {
        this.kill();
    }
    kill() {
        this.isDead = true;
    }
    move() {
        this.pattern.update(this.position);
    }
    update(scene) {
        this.lifetime--;
        if (this.lifetime <= 0)
            this.kill();
        else {
            this.move();
            if (this.weapon.isReady)
                this.weapon.shoot(scene);
            this.sprite.update();
        }
    }
    draw(renderer) {
        this.sprite.draw({
            layer: CanvasLayer.Entities,
            renderer,
            x: this.position.x - (this.width / 2),
            y: this.position.y - (this.height / 2)
        });
    }
}
class EnemyWeapon extends Weapon {
    facing;
    constructor({ owner, attachmentPosition, facing, fireRate }) {
        super({ owner, attachmentPosition, fireRate });
        this.facing = facing;
    }
    shoot(scene) {
        this.lastFired = Game.time;
        scene.spawnProjectile(new DroneProjectile({
            position: this.attachmentPosition.copy().add(this.owner.position),
            velocity: this.facing
        }));
    }
}
class DroneProjectile extends EnemyProjectile {
    constructor({ position, velocity }) {
        super({
            position,
            velocity,
            width: 6,
            height: 6,
            collisionWidth: 6,
            collisionHeight: 6
        });
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
//# sourceMappingURL=Enemy.js.map