import Entity from "../Entity.js";
export default class Enemy extends Entity {
    isDead;
    constructor({ position, width, height }) {
        super({ position, width, height });
        this.isDead = false;
    }
    kill() {
        this.isDead = true;
    }
}
//# sourceMappingURL=Enemy.js.map