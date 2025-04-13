import Entity from "../Entity.js";
import Vector from "../Vector.js";

export default abstract class Weapon {
    owner: Entity; // : Player;
    deltaPosition: Vector;
    cooldown: number;
    cooldownTimer: number; // lastShotTime
    protected _ready: boolean;

    constructor(owner: Entity, deltaPosition: Vector, cooldown: number) {
        this.owner = owner;
        this.deltaPosition = deltaPosition;
        this.cooldown = cooldown;
        this._ready = false;
    }
    
    get isReady(): boolean {
        return this._ready;
    }
    abstract shoot(): void;
}