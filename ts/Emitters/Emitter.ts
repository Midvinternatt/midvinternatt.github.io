import Enemy from "../Entities/Enemies/Enemy.js";
import Game from "../Game.js";
import GameScene from "../GameScene.js";
import Player from "../Entities/Player.js";
import Bullet from "../Projectiles/Bullet.js";
import Projectile from "../Projectiles/Projectile.js";
import Renderer, { CanvasLayer } from "../Renderer.js";
import SceneBounds from "../SceneBounds.js";
import Vector from "../Vector.js";

export interface ICircleEmitter {
    count: number;
}

export interface IConeEmitter {
    spreadAngle: number;
}

export interface IWeapon extends Emitter {
    owner: Enemy;
}

export default abstract class Emitter {
    private static _emitterList: Emitter[] = new Array();
    position: Vector;
    direction: Vector;
    callback: Function;
    // speed: number;
    active: boolean;

    constructor(position: Vector, direction: Vector, callback: Function) {
        this.position = position;
        this.direction = direction;
        this.callback = callback;
        // this.speed = direction.length;
        Emitter._emitterList.push(this);
    }
    kill(): void {
        Emitter._emitterList.splice(Emitter._emitterList.indexOf(this), 1);
    }
    update(scene: GameScene): void {
        this.trigger();
        this.kill();
    }
    trigger(): void {
        this.callback(this.position, this.direction);
    }
    static forEach(callback: (element: Emitter) => void): void {
        this._emitterList.forEach(callback);
    }
}

export class RepeatingEmitter extends Emitter {
    triggerRate: number;
    lastTriggered: number;
    constructor(position: Vector, direction: Vector, triggerRate: number, callback: Function) {
        super(position, direction, callback);
        this.triggerRate = triggerRate;
        this.lastTriggered = 0;
    }
    get isReady(): boolean {
        return (this.lastTriggered + this.triggerRate) < Game.time;
    }
    override update() {
        if(this.isReady)
            this.trigger();
    }
    override trigger(): void {
        this.lastTriggered = Game.time;
        super.trigger();
    }
}

export class RotatingEmitter extends RepeatingEmitter {
    turnRate: number;
    turnAngle: number;
    constructor(position: Vector, direction: Vector, triggerRate: number, turnRate: number, callback: Function) {
        super(position, direction, triggerRate, callback);
        this.turnRate = Math.PI/180 * turnRate;
        this.turnAngle = direction.angle;
    }
    override trigger(): void {
        this.direction.setAngle(this.turnAngle+=this.turnRate, 1);
        super.trigger();
    }
}

export class BB extends RotatingEmitter implements ICircleEmitter {
    count: number = 4;
    owner: Player;
    
    color: string;
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
    override update(): void {
        super.update();
    }
    override trigger(): void {
        super.trigger();
        // if(Projectile.count >= 10000)
        //     return;
        // let angle: Vector = this.direction.copy();
        // for (let i = 0; i < this.count; i++) {
            // let b: Bullet = new Bullet(Game.activeScene.player.position.copy().add(this.position), angle.copy(), 8);
            // console.log("hite");
            let b: Bullet = new Bullet(this.position.copy(), this.direction.copy(), 8);
            b.draw = (renderer: Renderer) => {
                renderer.drawRect(CanvasLayer.Projectiles, b.position.x - (b.width / 2), b.position.y - (b.height / 2), b.width, b.height, this.color);
            };
            b.update = (scene: GameScene) => {
                b.move(scene.sceneBounds);
                if(b.checkCollision(scene.player)) {
                    
                    b.kill();
                }
            };
            // angle.setAngle(angle.angle + 2 * Math.PI / this.count, 3);
        // }
    }
}

export class CircleEmitter extends Emitter implements ICircleEmitter {
    count: number = 4;
    triggerRate: number = 5;
    lastTriggered: number = 0;
    turnRate: number = Math.PI/14;
    turnAngle: number = 0;

    color: string;
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    constructor(deltaPosition: Vector, direction: Vector, callback) {
        super(deltaPosition, direction.scale(3), callback);
        // this.turnRate = Math.PI/(Math.random()*8);
        this.color = this.getRandomColor();
    }
    get isReady(): boolean {
        return (this.lastTriggered + this.triggerRate) < Game.time;
    }
    override update(): void {
        if(this.isReady)
            this.trigger();
    }
    override trigger(): void {
        this.lastTriggered = Game.time;
        let angle: Vector = this.direction.copy();
        for (let i = 0; i < this.count; i++) {
            let b: Bullet = new Bullet(this.position.copy(), angle.copy(), 8);
            b.draw = (renderer: Renderer) => {
                renderer.drawRect(CanvasLayer.Projectiles, b.position.x - (b.width / 2), b.position.y - (b.height / 2), b.width, b.height, this.color);
            };
            b.update = (scene: GameScene) => {
                b.move(scene.sceneBounds);    
                // if(b.checkCollision(Game.player)) {
                //     b.kill();
                // }
            };
            angle.setAngle(angle.angle + 2 * Math.PI / this.count, 3);
        }
        this.direction.setAngle(this.turnAngle+=this.turnRate, 3);
    }
}

export class TestEmitter extends Emitter {
    triggerRate: number = 1;
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

    constructor(deltaPosition: Vector, direction: Vector, callback) {
        super(deltaPosition, direction, callback);
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
        // if(Projectile.count >= 10000)
        //     return;
        let b: Bullet = new Bullet(this.position.copy(), this.direction.copy(), 8);
        b.draw = (renderer: Renderer) => {
            renderer.drawRect(CanvasLayer.Projectiles, b.position.x - (b.width / 2), b.position.y - (b.height / 2), b.width, b.height, this.color);
        };
        
        b.update = (scene: GameScene) => {
            b.move(scene.sceneBounds);    
            // if(b.checkCollision(Game.player)) {
            //     b.kill();
            // }
        };

        this.direction.setAngle(this.turnAngle+=this.turnRate, 1);
    }
}