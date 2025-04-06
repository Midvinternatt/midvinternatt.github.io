import Entity from "../Entity.js";
class Enemy extends Entity {
    // Ändra till en iterator
    static getAllEnemies() {
        return Enemy._enemyList;
    }
    constructor(position, width, height) {
        super(position, width, height);
        Enemy._enemyList.push(this);
    }
}
Enemy._enemyList = new Array();
export default Enemy;
//# sourceMappingURL=Enemy.js.map