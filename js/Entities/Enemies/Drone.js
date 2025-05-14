import Emitter from "../../Emitters/Emitter.js";
import Game from "../../Game.js";
import Projectile from "../../Projectiles/Projectile.js";
import { CanvasLayer } from "../../Renderer.js";
import Sprite from "../../Sprite.js";
import Vector from "../../Vector.js";
import Enemy from "./Enemy.js";
export default class Drone extends Enemy {
    velocity;
    weapon;
    sprite;
    constructor(position) {
        super(position, 64, 64);
        this.weapon = new DroneEmitter(this, new Vector(0, 26), new Vector(0, 1));
        this.velocity = new Vector(4, 0);
        let animations = {
            idle: { frameCount: 10, frameDuration: 6, loop: true }
        };
        this.sprite = new Sprite(document.getElementById("DRONE"), 64, 64, animations);
        this.sprite.playAnimation("idle");
    }
    hit() {
        this.weapon.kill();
        this.kill();
    }
    move(sceneBounds) {
        if (this.position.x <= sceneBounds.left + 32 || this.position.x >= sceneBounds.right - 32)
            this.velocity.x = this.velocity.x * -1;
        this.position.add(this.velocity);
    }
    update(scene) {
        this.move(scene.sceneBounds);
        this.sprite.update();
    }
    draw(renderer) {
        this.sprite.draw(CanvasLayer.Entities, renderer, this.position.x - (this.width / 2), this.position.y - (this.height / 2));
    }
}
class DroneEmitter extends Emitter {
    owner;
    triggerRate = 60;
    lastTriggered = 0;
    constructor(owner, deltaPosition, facing) {
        super(deltaPosition, facing, () => { });
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
        super(position, 6, 6);
        this.velocity = velocity;
    }
    update(scene) {
        this.move(scene.sceneBounds);
        if (this.checkCollision(scene.player))
            this.kill();
    }
    move(sceneBounds) {
        this.position.add(this.velocity);
        if (!sceneBounds.containsVector(this.position))
            this.kill();
    }
    draw(renderer) {
        renderer.drawRect(CanvasLayer.Projectiles, this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    }
}
//# sourceMappingURL=Drone.js.map