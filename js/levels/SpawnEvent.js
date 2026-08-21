export default class SpawnEvent {
    time;
    enemy;
    done = false;
    get isDone() {
        return this.done;
    }
    constructor(time, enemy) {
        this.time = time;
        this.enemy = enemy;
    }
    update(scene, time) {
        if (this.time <= time) {
            scene.spawnEnemy(this.enemy);
            this.done = true;
        }
    }
}
//# sourceMappingURL=SpawnEvent.js.map