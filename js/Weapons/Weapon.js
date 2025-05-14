import Game from "../Game.js";
export default class Weapon {
    owner;
    attachmentPosition;
    fireRate;
    lastFired;
    constructor(owner, attachmentPosition, fireRate) {
        this.owner = owner;
        this.attachmentPosition = attachmentPosition;
        this.fireRate = fireRate;
        this.lastFired = 0;
    }
    get isReady() {
        return (this.lastFired + this.fireRate) < Game.time;
    }
    get isEnabled() {
        return this.lastFired < Number.MAX_VALUE;
    }
    set enabled(enable) {
        if (enable)
            this.lastFired = 0;
        else
            this.lastFired = Number.MAX_VALUE;
    }
}
export class ConeWeapon {
}
export class CircleWeapon {
}
//# sourceMappingURL=Weapon.js.map