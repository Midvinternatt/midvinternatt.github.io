import Entity from "../Entity.js";
import Vector from "../Vector.js";

export default abstract class Enemy extends Entity {
    private static _enemyList: Enemy[] = new Array();

    static getAllEnemies(): Enemy[] {
        return Enemy._enemyList;
    }
    constructor(position: Vector, width: number, height: number) {
        super(position, width, height);
        Enemy._enemyList.push(this);
    }
}