import Entity from "../Entity.js";
class Enemy extends Entity {
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
Enemy._enemyList = new Array();
export default Enemy;
//# sourceMappingURL=Enemy.js.map