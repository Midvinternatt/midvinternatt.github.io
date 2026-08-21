import Game from "./Game.js";
import GameData from "./GameData.js";
import WaveManager from "./levels/WaveManager.js";
export default class Level {
    waveManager;
    currentWave = 0;
    time = 0;
    waves;
    constructor(id) {
        this.waves = GameData.getLevelData(id).waves;
        this.waveManager = new WaveManager(GameData.getLevelData(id).waves);
    }
    start() {
    }
    update(scene) {
        this.time++;
        this.waveManager.update(this.time, scene);
        if (this.currentWave > this.waves.length - 1)
            return;
        if (this.time >= this.waves[this.currentWave].time * Game.maxFps) {
        }
    }
}
//# sourceMappingURL=Level.js.map