import Debug from "../Debug.js";
import Enemy from "../Enemies/Enemy.js";
import Game from "../Game.js";
import Bullet from "../Projectiles/Bullet.js";
import Vector from "../Vector.js";

export interface IRotating extends IRepeating {
    turnRate: number;
    turnAngle: number;
}

export interface IRepeating extends Emitter {
    triggerRate: number;
    lastTriggered: number;
    get isReady(): boolean;
}

export interface IWeapon extends Emitter {
    owner: Enemy;
}

export default abstract class Emitter {
    private static _emitterList: Emitter[] = new Array();
    position: Vector;
    direction: Vector;
    active: boolean;

    constructor(position: Vector, direction: Vector) {
        this.position = position;
        this.direction = direction;
        Emitter._emitterList.push(this);
    }
    kill(): void {
        Emitter._emitterList.splice(Emitter._emitterList.indexOf(this), 1);
    }
    update(): void { }
    trigger(): void { }
    static forEach(callback: (element: Emitter) => void): void {
        this._emitterList.forEach(callback);
    }
}

export class TestEmitter extends Emitter implements IRotating {
    triggerRate: number = 0;
    lastTriggered: number = 0;
    turnAngle = 0;
    turnRate = Math.PI/2;
    color: string;
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
          }
    constructor(deltaPosition: Vector, facing: Vector) {
        super(deltaPosition, facing);
        this.turnRate = Math.PI/(Math.random()*8);
        this.color = this.getRandomColor();
    }
    get isReady() {
        return (this.lastTriggered + this.triggerRate) < Game.time;
    }
    override update(): void {
        if(this.isReady)
            this.trigger();
    }
    override trigger(): void {
        this.lastTriggered = Game.time;
        let b: Bullet = new Bullet(this.position.copy(), this.direction.copy(), 10);
        b.draw = (context: CanvasRenderingContext2D) => {
            context.fillStyle = this.color;
            context.fillRect(b.position.x - (b.width / 2), b.position.y - (b.height / 2), b.width, b.height);
        };
        this.direction.setAngle(this.turnAngle+=this.turnRate, 2);
    }
}