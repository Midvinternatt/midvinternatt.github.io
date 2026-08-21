import KeyEventHandler from "./Input/KeyEventHandler.js";
import Renderer from "./Renderer.js";
import MainMenuScene from "./MainMenu/MainMenuScene.js";
import IScene from "./Interfaces/IScene.js";
import GameScene from "./GameScene.js";
import AssetsLoader from "./assets/AssetsLoader.js";
import DebugOverlay from "./Debug/DebugOverlay.js";
import GameData from "./GameData.js";

/* Bra länkar
    Collision: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    Game loop: https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/
    Optimering: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
                https://hacks.mozilla.org/2013/05/optimizing-your-javascript-game-for-firefox-os/

    https://foozlecc.itch.io/void-main-ship
    https://foozlecc.itch.io/void-fleet-pack-1
*/

export default class Game {
    static keyEventHandler: KeyEventHandler;
    static time: number;
    static maxFps: number = 60;
    static frameInterval: number = 1000 / this.maxFps;
    static previousTimeMs: number = 0;
    static activeScene: IScene;
    static renderer: Renderer;
    private isRunning: boolean = false;

    static debugActive = true;

    constructor(gameContainer: HTMLElement) {
        Game.keyEventHandler = new KeyEventHandler();
        Game.renderer = new Renderer({
            gameContainer,
            width: 800,
            height: 800
        });
        
        if(Game.debugActive)
            DebugOverlay.init();

        console.log("Loading game files")
        Promise.all([
            this.loadAssets(),
            this.loadGameData()
        ]).then(() => {
            console.log("Finished game loading")
            this.start();
        }).catch(error => {
            console.error("Failed to load")
        });
    }

    async loadAssets() {
        return Promise.all([
            AssetsLoader.loadImages().then(() => console.log("Successfully loaded images")),
            AssetsLoader.loadSprites().then(() => console.log("Successfully loaded sprites")),
            AssetsLoader.loadSounds().then(() => console.log("Successfully loaded sounds"))
         ]);
    }

    async loadGameData() {
        return Promise.all([
            GameData.loadLevels(),
            GameData.loadEnemies()
        ]);
    }

    start() {
        Game.time = 0;
        this.isRunning = true;
        // Game.activeScene = new MainMenuScene(Game.renderer);
        Game.activeScene = new GameScene(Game.renderer);
        Game.activeScene.load();
        this.loop();
    }

    loop() {
        requestAnimationFrame((currentTimeMs) => {
            if(document.hasFocus() || Game.keyEventHandler.reset()) {
                const deltaTimeMs = currentTimeMs - Game.previousTimeMs;
                if(deltaTimeMs >= Game.frameInterval) {
                    Game.time++;
                    Game.activeScene.update();
                    Game.previousTimeMs = currentTimeMs - (deltaTimeMs % Game.frameInterval);
                }
            }
            
            Game.activeScene.draw();
            if(this.isRunning)
                this.loop();
        });
    }
}

new Game(document.getElementById("game")!);
