import Game from "../Game.js";
import Bullet from "../Projectiles/Bullet.js";
import { CanvasLayer } from "../Renderer.js";
export default class Emitter {
    static _emitterList = new Array();
    position;
    direction;
    callback;
    active;
    constructor(position, direction, callback) {
        this.position = position;
        this.direction = direction;
        this.callback = callback;
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
export class RepeatingEmitter extends Emitter {
    triggerRate;
    lastTriggered;
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
    turnRate;
    turnAngle;
    constructor(position, direction, triggerRate, turnRate, callback) {
        super(position, direction, triggerRate, callback);
        this.turnRate = Math.PI / 180 * turnRate;
        this.turnAngle = direction.angle;
    }
    trigger() {
        this.direction.setAngle(this.turnAngle += this.turnRate);
        super.trigger();
    }
}
export class BB extends RotatingEmitter {
    count = 4;
    owner;
    color;
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
        this.color = this.getRandomColor();
    }
    update() {
        super.update();
    }
    trigger() {
        super.trigger();
        let b = new Bullet({ position: this.position.copy(), velocity: this.direction.copy(), size: 8 });
        b.draw = (renderer) => {
            renderer.drawRect({
                layer: CanvasLayer.Projectiles,
                x: b.position.x - (b.width / 2),
                y: b.position.y - (b.height / 2),
                width: b.width,
                height: b.height,
                color: this.color
            });
        };
        b.update = (scene) => {
            b.move(scene.sceneBounds);
            if (b.checkCollision(scene.player)) {
                b.kill();
            }
        };
    }
}
export class CircleEmitter extends Emitter {
    count = 4;
    triggerRate = 5;
    lastTriggered = 0;
    turnRate = Math.PI / 14;
    turnAngle = 0;
    color;
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
            let b = new Bullet({ position: this.position.copy(), velocity: angle.copy(), size: 8 });
            b.draw = (renderer) => {
                renderer.drawRect({
                    layer: CanvasLayer.Projectiles,
                    x: b.position.x - (b.width / 2),
                    y: b.position.y - (b.height / 2),
                    width: b.width,
                    height: b.height,
                    color: this.color
                });
            };
            b.update = (scene) => {
                b.move(scene.sceneBounds);
            };
            angle.setAngle(angle.angle + 2 * Math.PI / this.count).setLength(3);
        }
        this.direction.setAngle(this.turnAngle += this.turnRate).setLength(3);
    }
}
export class TestEmitter extends Emitter {
    triggerRate = 1;
    lastTriggered = 0;
    turnAngle = 0;
    turnRate = Math.PI / 2;
    color;
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
        let b = new Bullet({ position: this.position.copy(), velocity: this.direction.copy(), size: 8 });
        b.draw = (renderer) => {
            renderer.drawRect({
                layer: CanvasLayer.Projectiles,
                x: b.position.x - (b.width / 2),
                y: b.position.y - (b.height / 2),
                width: b.width,
                height: b.height,
                color: this.color
            });
        };
        b.update = (scene) => {
            b.move(scene.sceneBounds);
        };
        this.direction.setAngle(this.turnAngle += this.turnRate);
    }
}
//# sourceMappingURL=Emitter.js.map