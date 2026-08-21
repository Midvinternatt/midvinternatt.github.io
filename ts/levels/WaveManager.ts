import Enemy from "../entities/Enemy.js";
import { EnemyFactory } from "../factories/EnemyFactory.js";
import FormationFactory from "../factories/FormationFactory.js";
import PatternFactory from "../factories/PatternFactory.js";
import Game from "../Game.js";
import { WaveData } from "../GameData.js";
import GameScene from "../GameScene.js";
import Vector from "../Vector.js";
import { Pattern } from "./Pattern.js";
import SpawnEvent from "./SpawnEvent.js";

export type SpawnEnemy = new ({position, pattern, lifetime}: {position: Vector, pattern: Pattern, lifetime: number}) => Enemy;

export default class WaveManager {
    private enemyFactory: EnemyFactory = new EnemyFactory();
    private formationFactory: FormationFactory = new FormationFactory();
    private patternFactory: PatternFactory = new PatternFactory();
    private spawnEvents: Array<SpawnEvent> = new Array<SpawnEvent>();
    private currentWave: number = 0;

    constructor(private waves: WaveData[]) {
        
    }

    update(time: number, scene: GameScene) {
        for (let i = this.spawnEvents.length-1; i >= 0; i--){
            const spawnEvent = this.spawnEvents[i];
            spawnEvent.update(scene, time);
            if(spawnEvent.isDone)
                this.spawnEvents.splice(i, 1);
        }
        
        if(this.currentWave > this.waves.length - 1)
            return;

        if(time >= this.waves[this.currentWave].time * Game.maxFps) {
            const wave = this.waves[this.currentWave];
            this.startWave(scene, wave);
        }
    }

    spawn(scene: GameScene, data: WaveData) {
    }

    startWave(scene: GameScene, waveData: WaveData) {
        this.currentWave++;
        const formation = this.formationFactory.create(waveData.formation, waveData.position)
        const pattern = this.patternFactory.create(waveData.pattern);

        for (let index = 0; index < formation.amount; index++) {
            const position = formation.getPosition(index);
            const drone = this.enemyFactory.create(waveData.enemy.type, position, pattern, waveData.enemy.lifetime * Game.maxFps)
            const spawnEvent = new SpawnEvent(waveData.time, drone)
            this.spawnEvents.push(spawnEvent)
        }
    }
}