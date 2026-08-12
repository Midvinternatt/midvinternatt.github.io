import KeyEventHandler from "./Input/KeyEventHandler.js";
import Renderer from "./Renderer.js";
import GameScene from "./GameScene.js";
import Assets from "./Assets.js";
import Debug from "./Debug/Debug.js";
import DebugOverlay from "./Debug/DebugOverlay.js";
export default class Game {
    static keyEventHandler;
    static time;
    static maxFps = 60;
    static frameInterval = 1000 / this.maxFps;
    static previousTimeMs = 0;
    static activeScene;
    static renderer;
    isRunning = false;
    static debugActive = true;
    constructor(gameContainer) {
        Game.keyEventHandler = new KeyEventHandler();
        Game.renderer = new Renderer({
            gameContainer,
            width: 800,
            height: 600
        });
        if (Game.debugActive)
            DebugOverlay.init();
        this.loadResources().then(() => {
            Debug("Game(): Successfully loaded sprites");
            this.start();
        }, () => {
            Debug("Game(): Failed to load sprites");
        });
    }
    loadResources() {
        return Promise.all([
            Assets.loadSprites()
        ]);
    }
    loadAllAssets() {
        return Promise.all([
            Assets.loadSprites()
        ]);
    }
    start() {
        Game.time = 0;
        this.isRunning = true;
        Game.activeScene = new GameScene(Game.renderer);
        Game.activeScene.load();
        this.loop();
    }
    loop() {
        requestAnimationFrame((currentTimeMs) => {
            if (document.hasFocus() || Game.keyEventHandler.reset()) {
                const deltaTimeMs = currentTimeMs - Game.previousTimeMs;
                if (deltaTimeMs >= Game.frameInterval) {
                    Game.time++;
                    Game.activeScene.update();
                    Game.previousTimeMs = currentTimeMs - (deltaTimeMs % Game.frameInterval);
                }
            }
            Game.activeScene.draw();
            if (this.isRunning)
                this.loop();
        });
    }
}
new Game(document.getElementById("game"));
//# sourceMappingURL=Game.js.map