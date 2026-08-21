import { EnemyFactory } from "../factories/EnemyFactory.js";
import FormationFactory from "../factories/FormationFactory.js";
import PatternFactory from "../factories/PatternFactory.js";
import Game from "../Game.js";
import SpawnEvent from "./SpawnEvent.js";
export default class WaveManager {
    waves;
    enemyFactory = new EnemyFactory();
    formationFactory = new FormationFactory();
    patternFactory = new PatternFactory();
    spawnEvents = new Array();
    currentWave = 0;
    constructor(waves) {
        this.waves = waves;
    }
    update(time, scene) {
        for (let i = this.spawnEvents.length - 1; i >= 0; i--) {
            const spawnEvent = this.spawnEvents[i];
            spawnEvent.update(scene, time);
            if (spawnEvent.isDone)
                this.spawnEvents.splice(i, 1);
        }
        if (this.currentWave > this.waves.length - 1)
            return;
        if (time >= this.waves[this.currentWave].time * Game.maxFps) {
            const wave = this.waves[this.currentWave];
            this.startWave(scene, wave);
        }
    }
    spawn(scene, data) {
    }
    startWave(scene, waveData) {
        this.currentWave++;
        console.log("start wave");
        const formation = this.formationFactory.create(waveData.formation, waveData.position);
        const pattern = this.patternFactory.create(waveData.pattern);
        for (let index = 0; index < formation.amount; index++) {
            const position = formation.getPosition(index);
            const drone = this.enemyFactory.create(waveData.enemy.type, position, pattern, waveData.enemy.lifetime * Game.maxFps);
            const spawnEvent = new SpawnEvent(waveData.time, drone);
            this.spawnEvents.push(spawnEvent);
        }
    }
}
//# sourceMappingURL=WaveManager.js.map