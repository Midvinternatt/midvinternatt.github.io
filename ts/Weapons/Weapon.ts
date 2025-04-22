import Game from "../Game.js";
import Vector from "../Vector.js";
import Player from "../Player.js";

export default abstract class Weapon {
    owner: Player;
    attachmentPosition: Vector;
    fireRate: number;
    lastFired: number;

    constructor(owner: Player, attachmentPosition: Vector, fireRate: number) {
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
    abstract shoot(): void;
}

export abstract class ConeWeapon {

}

export abstract class CircleWeapon {

}