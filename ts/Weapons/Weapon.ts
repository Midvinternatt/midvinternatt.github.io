import Game from "../Game.js";
import Vector from "../Vector.js";
import Entity from "../entities/Entity.js";
import GameScene from "../GameScene.js";

export default abstract class Weapon {
    owner: Entity;
    attachmentPosition: Vector;
    fireRate: number;
    lastFired: number;

    constructor({owner, attachmentPosition, fireRate}: {
        owner: Entity,
        attachmentPosition: Vector,
        fireRate: number
    }) {
        this.owner = owner;
        this.attachmentPosition = attachmentPosition;
        this.fireRate = fireRate;
        this.lastFired = 0;
    }
    
    get isReady(): boolean {
        return (this.lastFired + this.fireRate) < Game.time;
    }
    get isEnabled(): boolean {
        return this.lastFired < Number.MAX_VALUE;
    }
    set enabled(enable: boolean) {
        if(enable)
            this.lastFired  = 0;
        else
            this.lastFired = Number.MAX_VALUE;
    }
    abstract shoot(scene: GameScene): void;
}

export abstract class ConeWeapon {

}

export abstract class CircleWeapon {

}