import Emitter from "../Emitters/Emitter.js";
import Game from "../Game.js";
import Projectile from "../Projectiles/Projectile.js";
import { CanvasLayer } from "../Renderer.js";
import Sprite, { SPRITE } from "../Sprite.js";
import Vector from "../Vector.js";
import Enemy from "./Enemy.js";
export default class Drone extends Enemy {
    constructor(position) {
        super(position, 100, 100);
        this.sprite = Sprite.getSprite(SPRITE.DRONE);
        this.weapon = new DroneEmitter(this, new Vector(0, 50), new Vector(0, 1));
    }
    hit() {
        this.weapon.kill();
        this.kill();
    }
    update() { }
    draw(renderer) {
        renderer.drawImage(CanvasLayer.Entities, this.sprite.bitmap, this.position.x - (this.width / 2), this.position.y - (this.height / 2));
    }
}
class DroneEmitter extends Emitter {
    constructor(owner, deltaPosition, facing) {
        super(deltaPosition, facing, () => { });
        this.triggerRate = 60;
        this.lastTriggered = 0;
        this.direction.scale(8);
        this.owner = owner;
    }
    get isReady() {
        return this.lastTriggered + this.triggerRate < Game.time;
    }
    update() {
        if (this.isReady)
            this.trigger();
    }
    trigger() {
        this.lastTriggered = Game.time;
        new DroneBullet(this.owner.position.copy().add(this.position), this.direction);
    }
}
class DroneBullet extends Projectile {
    constructor(position, velocity) {
        super(position, 10, 10);
        this.velocity = velocity;
    }
    update() {
        this.move();
        if (this.checkCollision(Game.activeScene.player))
            this.kill();
    }
    move() {
        this.position.add(this.velocity);
        if (!Game.activeScene.sceneBounds.isVectorInbound(this.position))
            this.kill();
    }
}
//# sourceMappingURL=Drone.js.map