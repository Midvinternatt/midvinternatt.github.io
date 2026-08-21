import Enemy from "../entities/Enemy.js"
import GameScene from "../GameScene.js";

export default class SpawnEvent {
    time: number;
    enemy: Enemy;

    private done: boolean = false;
    public get isDone() : boolean {
        return this.done;
    }

    constructor(time: number, enemy: Enemy) {
        this.time = time;
        this.enemy = enemy;
    }

    update(scene: GameScene, time: number) {
        if(this.time <= time) {
            scene.spawnEnemy(this.enemy);
            this.done = true;
        }
    }
}
