import AssetsLoader from "../assets/AssetsLoader.js";
import Game from "../Game.js";
import GameScene from "../GameScene.js";
import IHittable from "../Interfaces/IHittable.js";
import Renderer, { CanvasLayer } from "../Renderer.js";
import Vector from "../Vector.js";
import Weapon from "../Weapons/Weapon.js";
import EnemyProjectile from "../Projectiles/EnemyProjectile.js";
import { Pattern } from "../levels/Pattern.js";
import Entity from "./Entity.js";
import { EnemyData } from "../GameData.js";

export default class Enemy extends Entity implements IHittable {
    pattern: Pattern;
    weapon: EnemyWeapon;
    lifetime: number;
    isDead: boolean= false;

    constructor({enemyData, position, pattern, lifetime}: {enemyData: EnemyData, position: Vector, pattern: Pattern, lifetime: number}) {
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
            facing: Vector.fromPolar({angle: 90, length: enemyData.weapon.projectileSpeed}),
            fireRate: enemyData.weapon.fireRate * Game.maxFps
        });
        this.pattern = pattern;
        this.lifetime = lifetime;
    }

    hit(): void {
        this.kill();
    }
    
    kill(): void {
        this.isDead = true;
    }

    move(): void {
        this.pattern.update(this.position);
    }

    update(scene: GameScene): void {
        this.lifetime--;

        if(this.lifetime <= 0)
            this.kill();
        else {
            this.move();
            if(this.weapon.isReady)
                this.weapon.shoot(scene);
            this.sprite.update();
        }

    }

    draw(renderer: Renderer): void {
        this.sprite.draw({
            layer: CanvasLayer.Entities,
            renderer,
            x: this.position.x - (this.width / 2),
            y: this.position.y - (this.height / 2)
        });
    }
}

class EnemyWeapon extends Weapon {
    facing: Vector;

    constructor({owner, attachmentPosition, facing, fireRate}: {
        owner: Enemy,
        attachmentPosition: Vector,
        facing: Vector,
        fireRate: number
    }) {
        super({owner, attachmentPosition, fireRate});
        this.facing = facing;
    }

    override shoot(scene: GameScene) {
        this.lastFired = Game.time;
        scene.spawnProjectile(new DroneProjectile({
                position: this.attachmentPosition.copy().add(this.owner.position),
                velocity: this.facing
        }));
    }
}

class DroneProjectile extends EnemyProjectile {
    constructor({position, velocity}: {position: Vector, velocity: Vector}) {
        super({
            position,
            velocity,
            width: 6,
            height: 6,
            collisionWidth: 6,
            collisionHeight: 6
        });
    }
    draw(renderer: Renderer) {
        renderer.drawRect({
            layer: CanvasLayer.Projectiles,
            x: this.position.x - (this.width / 2),
            y: this.position.y - (this.height / 2),
            width: this.width,
            height: this.height
        });
    }
}