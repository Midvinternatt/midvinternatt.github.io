export default class Weapon {
    constructor(owner, deltaPosition, cooldown) {
        this.owner = owner;
        this.deltaPosition = deltaPosition;
        this.cooldown = cooldown;
        this._ready = false;
    }
    get isReady() {
        return this._ready;
    }
}
//# sourceMappingURL=Weapon.js.map