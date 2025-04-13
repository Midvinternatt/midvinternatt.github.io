import Game from "../Game.js";
import Bullet from "../Projectiles/Bullet.js";
class Emitter {
    constructor(position, direction) {
        this.position = position;
        this.direction = direction;
        Emitter._emitterList.push(this);
    }
    kill() {
        Emitter._emitterList.splice(Emitter._emitterList.indexOf(this), 1);
    }
    update() { }
    trigger() { }
    static forEach(callback) {
        this._emitterList.forEach(callback);
    }
}
Emitter._emitterList = new Array();
export default Emitter;
export class TestEmitter extends Emitter {
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    constructor(deltaPosition, facing) {
        super(deltaPosition, facing);
        this.triggerRate = 0;
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
        let b = new Bullet(this.position.copy(), this.direction.copy(), 10);
        b.draw = (context) => {
            context.fillStyle = this.color;
            context.fillRect(b.position.x - (b.width / 2), b.position.y - (b.height / 2), b.width, b.height);
        };
        this.direction.setAngle(this.turnAngle += this.turnRate, 2);
    }
}
//# sourceMappingURL=Emitter.js.map