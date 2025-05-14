import Entity from "../Entity.js";
export default class Enemy extends Entity {
    static _enemyList = new Array();
    constructor(position, width, height) {
        super(position, width, height);
        Enemy._enemyList.push(this);
    }
    kill() {
        Enemy._enemyList.splice(Enemy._enemyList.indexOf(this), 1);
    }
    static forEach(callback) {
        Enemy._enemyList.forEach(callback);
    }
}
//# sourceMappingURL=Enemy.js.map