import KeyEventHandler from "./KeyEventHandler.js";
import Renderer from "./Renderer.js";
import GameScene from "./GameScene.js";
/* Bra länkar
    Collision: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    Game loop: https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/
    Optimering: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
                https://hacks.mozilla.org/2013/05/optimizing-your-javascript-game-for-firefox-os/

    https://foozlecc.itch.io/void-main-ship
    https://foozlecc.itch.io/void-fleet-pack-1
*/
export default class Game {
    static keyEventHandler;
    static time;
    static maxFps = 60;
    static frameInterval = 1000 / this.maxFps;
    static previousTimeMs = 0;
    static activeScene;
    static renderer;
    isRunning = false;
    constructor(gameContainer) {
        Game.keyEventHandler = new KeyEventHandler();
        Game.renderer = new Renderer(gameContainer, window.innerWidth, window.innerHeight);
        // Game.renderer = new Renderer(gameContainer, 800, 600);
        this.loadResources().then(() => {
            console.log("Successfully loaded sprites");
            this.start();
        }, () => {
            console.log("Failed to load sprites");
        });
    }
    loadResources() {
        return Promise.all([
        // Sprite.LoadSprites()
        // Sound.LoadSounds()
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