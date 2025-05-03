var _a;
import Sprite from "./Sprite.js";
import KeyEventHandler from "./KeyEventHandler.js";
import Renderer from "./Renderer.js";
import GameScene from "./GameScene.js";
/* Bra länkar
    Collision: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    Game loop: https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/
    Optimering: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
                https://hacks.mozilla.org/2013/05/optimizing-your-javascript-game-for-firefox-os/
*/
class Game {
    constructor(gameContainer) {
        this.isRunning = false;
        _a.keyEventHandler = new KeyEventHandler();
        _a.renderer = new Renderer(gameContainer, window.innerWidth, window.innerHeight);
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
            Sprite.LoadSprites()
            // Sound.LoadSounds()
        ]);
    }
    start() {
        _a.time = 0;
        this.isRunning = true;
        // Game.activeScene = new MainMenuScene(Game.renderer);
        // Game.activeScene.load();
        _a.activeScene = new GameScene(_a.renderer);
        _a.activeScene.load();
        this.loop();
    }
    loop() {
        requestAnimationFrame((currentTimeMs) => {
            if (document.hasFocus() || _a.keyEventHandler.reset()) {
                const deltaTimeMs = currentTimeMs - _a.previousTimeMs;
                if (deltaTimeMs >= _a.frameInterval) {
                    _a.time++;
                    _a.activeScene.update();
                    _a.previousTimeMs = currentTimeMs - (deltaTimeMs % _a.frameInterval);
                }
            }
            _a.activeScene.draw();
            if (this.isRunning)
                this.loop();
        });
    }
}
_a = Game;
Game.maxFps = 60;
Game.frameInterval = 1000 / _a.maxFps;
Game.previousTimeMs = 0;
export default Game;
new Game(document.getElementById("game"));
//# sourceMappingURL=Game.js.map