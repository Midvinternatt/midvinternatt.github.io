import Emitter, { IWeapon } from "../../Emitters/Emitter.js";
import Game from "../../Game.js";
import GameScene from "../../GameScene.js";
import IHittable from "../../Interfaces/IHittable.js";
import Projectile from "../../Projectiles/Projectile.js";
import Renderer, { CanvasLayer } from "../../Renderer.js";
import SceneBounds from "../../SceneBounds.js";
import Sprite, { SPRITE } from "../../Sprite.js";
import Vector from "../../Vector.js";
import Enemy from "./Enemy.js";

export default class Drone extends Enemy implements IHittable {
    velocity: Vector;
    weapon: DroneEmitter;
    sprite: Sprite;

    constructor(position: Vector) {
        super(position, 100, 100);
        this.sprite = Sprite.getSprite(SPRITE.DRONE);
        this.weapon = new DroneEmitter(this, new Vector(0, 50), new Vector(0, 1));
    }

    hit(): void {
        this.weapon.kill();
        this.kill();
    }
    update(): void { }
    draw(renderer: Renderer): void {
        renderer.drawImage(CanvasLayer.Entities, this.sprite.bitmap, this.position.x - (this.width / 2), this.position.y - (this.height / 2));
    }
}

class DroneEmitter extends Emitter implements IWeapon {
    owner: Drone;
    triggerRate: number = 60;
    lastTriggered: number = 0;

    constructor(owner: Drone, deltaPosition: Vector, facing: Vector) {
        super(deltaPosition, facing, () => {});
        this.direction.scale(8)
        this.owner = owner;
    }
    get isReady(): boolean {
        return this.lastTriggered + this.triggerRate < Game.time;
    }
    override update(): void {
        if(this.isReady)
            this.trigger();
    }
    override trigger(): void {
        this.lastTriggered = Game.time;
        new DroneBullet(this.owner.position.copy().add(this.position), this.direction);
    }
}

class DroneBullet extends Projectile {
    constructor(position: Vector, velocity: Vector) {
        super(position, 10, 10);
        this.velocity = velocity;
    }
    update(scene: GameScene): void {
        this.move(scene.sceneBounds);
        if(this.checkCollision(scene.player))
            this.kill();
    }
    move(sceneBounds: SceneBounds): void {
        this.position.add(this.velocity);
        if(!sceneBounds.containsVector(this.position))
            this.kill();
    }
    draw(renderer: Renderer) {
        renderer.drawRect(CanvasLayer.Projectiles, this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    }
}