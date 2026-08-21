import Enemy from "../entities/Enemy.js";
import Game from "../Game.js";
import GameScene from "../GameScene.js";
import Player from "../entities/Player.js";
import EnemyProjectile from "../Projectiles/EnemyProjectile.js";
import Projectile from "../Projectiles/Projectile.js";
import Renderer, { CanvasLayer } from "../Renderer.js";
import SceneBounds from "../collision/SceneBounds.js";
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

class Bullet extends EnemyProjectile {
    constructor({position, velocity}: {position: Vector, velocity: Vector}) {
        super({
            position,
            velocity,
            width: 8,
            height: 8,
            collisionWidth: 8,
            collisionHeight: 8
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

export default abstract class Emitter {
    private static _emitterList: Emitter[] = new Array();
    position: Vector;
    direction: Vector;
    callback: Function;
    // speed: number;
    active!: boolean;

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
        this.trigger(scene);
        this.kill();
    }
    trigger(scene: GameScene): void {
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
    override update(scene: GameScene) {
        if(this.isReady)
            this.trigger(scene);
    }
    override trigger(scene: GameScene): void {
        this.lastTriggered = Game.time;
        super.trigger(scene);
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
    override trigger(scene: GameScene): void {
        this.direction.setAngleRadians(this.turnAngle+=this.turnRate/*, 1*/);
        super.trigger(scene);
    }
}

export class BB extends RotatingEmitter implements ICircleEmitter {
    count: number = 4;
    owner!: Player;
    
    color: string;
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    constructor(position: any, direction: any, triggerRate: any, turnRate: any, callback: any) {
        super(position, direction, triggerRate, turnRate, callback);
        this.color = this.getRandomColor();
    }
    override update(scene: GameScene): void {
        super.update(scene);
    }
    override trigger(scene: GameScene): void {
        super.trigger(scene);
        // if(Projectile.count >= 10000)
        //     return;
        // let angle: Vector = this.direction.copy();
        // for (let i = 0; i < this.count; i++) {
            // let b: Bullet = new Bullet(Game.activeScene.player.position.copy().add(this.position), angle.copy(), 8);
            // console.log("hite");
            let b: Bullet = new Bullet({position: this.position.copy(), velocity: this.direction.copy()});
            b.draw = (renderer: Renderer) => {
                renderer.drawRect({
                    layer: CanvasLayer.Projectiles,
                    x: b.position.x - (b.width / 2),
                    y: b.position.y - (b.height / 2),
                    width: b.width,
                    height: b.height,
                    color: this.color
                });
            };
            b.update = (scene: GameScene) => {
                b.move();
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

    constructor(deltaPosition: Vector, direction: Vector, callback: any) {
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
            let b: Bullet = new Bullet({position: this.position.copy(), velocity: angle.copy()});
            b.draw = (renderer: Renderer) => {
                renderer.drawRect({
                    layer: CanvasLayer.Projectiles,
                    x: b.position.x - (b.width / 2),
                    y: b.position.y - (b.height / 2),
                    width: b.width,
                    height: b.height,
                    color: this.color
                });
            };
            b.update = (scene: GameScene) => {
                b.move();    
                // if(b.checkCollision(Game.player)) {
                //     b.kill();
                // }
            };
            angle.setAngleRadians(angle.angle + 2 * Math.PI / this.count/*, 3*/).setLength(3);
        }
        this.direction.setAngleRadians(this.turnAngle+=this.turnRate/*, 3*/).setLength(3);
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

    constructor(deltaPosition: Vector, direction: Vector, callback: any) {
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
        let b: Bullet = new Bullet({position: this.position.copy(), velocity: this.direction.copy()});
        b.draw = (renderer: Renderer) => {
            renderer.drawRect({
                layer: CanvasLayer.Projectiles,
                x: b.position.x - (b.width / 2),
                y: b.position.y - (b.height / 2),
                width: b.width,
                height: b.height,
                color: this.color
            });
        };
        
        b.update = (scene: GameScene) => {
            b.move();    
            // if(b.checkCollision(Game.player)) {
            //     b.kill();
            // }
        };

        this.direction.setAngleRadians(this.turnAngle+=this.turnRate/*, 1*/);
    }
}