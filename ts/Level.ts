import Game from "./Game.js";
import GameData, { WaveData } from "./GameData.js";
import GameScene from "./GameScene.js";
import WaveManager from "./levels/WaveManager.js";

export default class Level {
    private waveManager: WaveManager;

    private currentWave: number = 0;
    time: number = 0;
    waves: WaveData[];

    constructor(id: string) {
        this.waves = GameData.getLevelData(id).waves;
        this.waveManager = new WaveManager(GameData.getLevelData(id).waves);
    }
    
    start() {
    }

    update(scene: GameScene) {
        this.time++;
        this.waveManager.update(this.time, scene);
    }
}
