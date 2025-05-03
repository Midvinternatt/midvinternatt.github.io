import Entity from "../Entity.js";
import Vector from "../Vector.js";

export default abstract class Enemy extends Entity {
    private static _enemyList: Enemy[] = new Array();

    constructor(position: Vector, width: number, height: number) {
        super(position, width, height);
        Enemy._enemyList.push(this);
    }
    kill(): void {
        Enemy._enemyList.splice(Enemy._enemyList.indexOf(this), 1);
    }
    static forEach(callback: (element: Enemy) => void): void {
        Enemy._enemyList.forEach(callback);
    }
}