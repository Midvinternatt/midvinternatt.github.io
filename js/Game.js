var _a;
import Sprite from "./Sprite.js";
import KeyEventHandler from "./KeyEventHandler.js";
import GameScene from "./Scene.js";
import Renderer from "./Renderer.js";
/* Bra länkar
    Collision: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    Game loop: https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/
    Optimering: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
                https://hacks.mozilla.org/2013/05/optimizing-your-javascript-game-for-firefox-os/

E:\Downloads\Shared\Desktop\gelbooru\f588c1d6cdbc67168698e6571edea55b.jpg
E:\Downloads\Shared\Desktop\gelbooru\6e78f16ebfb7b8691e023d8949bf25d5.jpg
E:\Downloads\Shared\Desktop\gelbooru\ea8985e53cb13ebdd1cf50f987b362ed.jpg
E:\Downloads\Shared\Desktop\kemono\241124\ちさたき+(2).png
E:\Downloads\Shared\Desktop\kemono\250225\bae+rat+butt.png
E:\Downloads\Shared\Desktop\kemono\241124\fernwet+twit.png
*/
class Game {
    constructor(canvas) {
        _a.keyEventHandler = new KeyEventHandler();
        _a.renderer = new Renderer(document.getElementById("game"), window.innerWidth, window.innerHeight);
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
        // let max = Game.canvas.height; // 1000;
        // let spread = 100;
        // for (let x = spread; x < max; x+=spread) {
        //     for (let y = spread; y < max; y+=spread) {
        //         new TestEmitter(new Vector(x, y), new Vector(1, 0));
        //     }
        // }
        // emitter = new Emitter(position, () => {});
        _a.time = 0;
        this.isRunning = true;
        _a.activeScene = new GameScene(_a.renderer);
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
new Game(document.getElementById("canvas"));
//# sourceMappingURL=Game.js.map