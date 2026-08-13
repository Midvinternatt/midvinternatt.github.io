import GameScene from "./GameScene.js";
export default class Level {
    private currentWave: number;
    time: number;

    constructor() {
        this.currentWave = 0;
        this.time = 0;
    }
    
    start() {
    }

    update(scene: GameScene) {
        this.time++;
    }
}
