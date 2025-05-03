import Game from "../Game.js";
import Bullet from "../Projectiles/Bullet.js";
import Projectile from "../Projectiles/Projectile.js";
import { CanvasLayer } from "../Renderer.js";
class Emitter {
    constructor(position, direction, callback) {
        this.position = position;
        this.direction = direction;
        this.callback = callback;
        // this.speed = direction.length;
        Emitter._emitterList.push(this);
    }
    kill() {
        Emitter._emitterList.splice(Emitter._emitterList.indexOf(this), 1);
    }
    update(scene) {
        this.trigger();
        this.kill();
    }
    trigger() {
        this.callback(this.position, this.direction);
    }
    static forEach(callback) {
        this._emitterList.forEach(callback);
    }
}
Emitter._emitterList = new Array();
export default Emitter;
export class RepeatingEmitter extends Emitter {
    constructor(position, direction, triggerRate, callback) {
        super(position, direction, callback);
        this.triggerRate = triggerRate;
        this.lastTriggered = 0;
    }
    get isReady() {
        return (this.lastTriggered + this.triggerRate) < Game.time;
    }
    update() {
        if (this.isReady)
            this.trigger();
    }
    trigger() {
        this.lastTriggered = Game.time;
        super.trigger();
    }
}
export class RotatingEmitter extends RepeatingEmitter {
    constructor(position, direction, triggerRate, turnRate, callback) {
        super(position, direction, triggerRate, callback);
        this.turnRate = Math.PI / 180 * turnRate;
        this.turnAngle = direction.angle;
    }
    trigger() {
        this.direction.setAngle(this.turnAngle += this.turnRate, 1);
        super.trigger();
    }
}
export class BB extends RotatingEmitter {
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    constructor(position, direction, triggerRate, turnRate, callback) {
        super(position, direction, triggerRate, turnRate, callback);
        this.count = 4;
        this.color = this.getRandomColor();
    }
    update() {
        super.update();
    }
    trigger() {
        super.trigger();
        if (Projectile.count >= 10000)
            return;
        // let angle: Vector = this.direction.copy();
        // for (let i = 0; i < this.count; i++) {
        // let b: Bullet = new Bullet(Game.activeScene.player.position.copy().add(this.position), angle.copy(), 8);
        // console.log("hite");
        let b = new Bullet(this.position.copy(), this.direction.copy(), 8);
        b.draw = (renderer) => {
            renderer.drawRect(CanvasLayer.Projectiles, b.position.x - (b.width / 2), b.position.y - (b.height / 2), b.width, b.height, this.color);
        };
        b.update = (scene) => {
            b.move(scene.sceneBounds);
            if (b.checkCollision(scene.player)) {
                b.kill();
            }
        };
        // angle.setAngle(angle.angle + 2 * Math.PI / this.count, 3);
        // }
    }
}
export class CircleEmitter extends Emitter {
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    constructor(deltaPosition, direction, callback) {
        super(deltaPosition, direction.scale(3), callback);
        this.count = 4;
        this.triggerRate = 5;
        this.lastTriggered = 0;
        this.turnRate = Math.PI / 14;
        this.turnAngle = 0;
        // this.turnRate = Math.PI/(Math.random()*8);
        this.color = this.getRandomColor();
    }
    get isReady() {
        return (this.lastTriggered + this.triggerRate) < Game.time;
    }
    update() {
        if (this.isReady)
            this.trigger();
    }
    trigger() {
        this.lastTriggered = Game.time;
        let angle = this.direction.copy();
        for (let i = 0; i < this.count; i++) {
            let b = new Bullet(this.position.copy(), angle.copy(), 8);
            b.draw = (renderer) => {
                renderer.drawRect(CanvasLayer.Projectiles, b.position.x - (b.width / 2), b.position.y - (b.height / 2), b.width, b.height, this.color);
            };
            b.update = (scene) => {
                b.move(scene.sceneBounds);
                // if(b.checkCollision(Game.player)) {
                //     b.kill();
                // }
            };
            angle.setAngle(angle.angle + 2 * Math.PI / this.count, 3);
        }
        this.direction.setAngle(this.turnAngle += this.turnRate, 3);
    }
}
export class TestEmitter extends Emitter {
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    constructor(deltaPosition, direction, callback) {
        super(deltaPosition, direction, callback);
        this.triggerRate = 1;
        this.lastTriggered = 0;
        this.turnAngle = 0;
        this.turnRate = Math.PI / 2;
        this.turnRate = Math.PI / (Math.random() * 8);
        this.color = this.getRandomColor();
    }
    get isReady() {
        return (this.lastTriggered + this.triggerRate) < Game.time;
    }
    update() {
        if (this.isReady)
            this.trigger();
    }
    trigger() {
        this.lastTriggered = Game.time;
        if (Projectile.count >= 10000)
            return;
        let b = new Bullet(this.position.copy(), this.direction.copy(), 8);
        b.draw = (renderer) => {
            renderer.drawRect(CanvasLayer.Projectiles, b.position.x - (b.width / 2), b.position.y - (b.height / 2), b.width, b.height, this.color);
        };
        b.update = (scene) => {
            b.move(scene.sceneBounds);
            // if(b.checkCollision(Game.player)) {
            //     b.kill();
            // }
        };
        this.direction.setAngle(this.turnAngle += this.turnRate, 1);
    }
}
//# sourceMappingURL=Emitter.js.map