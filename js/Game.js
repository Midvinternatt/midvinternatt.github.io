var _a;
import Player from "./Player.js";
import Vector from "./Vector.js";
import Railgun from "./Weapons/RailGun.js";
import Sprite from "./Sprite.js";
import Drone from "./Enemies/Drone.js";
import Projectile from "./Projectiles/Projectile.js";
import Enemy from "./Enemies/Enemy.js";
import KeyEventHandler, { KEY } from "./KeyEventHandler.js";
import ScreenBounds from "./ScreenBounds.js";
import Emitter, { TestEmitter } from "./Emitters/Emitter.js";
/* Bra länkar
    Collision: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    Game loop: https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/
    Optimering: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
                https://hacks.mozilla.org/2013/05/optimizing-your-javascript-game-for-firefox-os/
*/
class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        this._keyEventHandler = new KeyEventHandler();
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
        _a.screenBounds = new ScreenBounds(this.canvas.width, this.canvas.height);
        _a.player = new Player(new Vector(512, 400), 100, 100);
        _a.player.addWeapon(new Railgun(_a.player, new Vector(-25, -50)));
        _a.player.addWeapon(new Railgun(_a.player, new Vector(25, -50)));
        new Drone(new Vector(512, 100));
        let max = 1000;
        let spread = 250;
        for (let x = spread; x < max; x += spread) {
            for (let y = spread; y < max; y += spread) {
                new TestEmitter(new Vector(x, y), new Vector(1, 0));
            }
        }
        _a.time = 0;
        this.isRunning = true;
        this.loop();
    }
    loop() {
        requestAnimationFrame((currentTimeMs) => {
            if (document.hasFocus() || this._keyEventHandler.reset()) {
                const deltaTimeMs = currentTimeMs - _a.previousTimeMs;
                if (deltaTimeMs >= _a.frameInterval) {
                    this.update();
                    const offset = deltaTimeMs % _a.frameInterval;
                    _a.previousTimeMs = currentTimeMs - offset;
                    // Debug("Delta: " + deltaTimeMs + "\nCurrent: " + currentTimeMs + "\nPrevious: " + Game.previousTimeMs);
                    // Debug(document.hasFocus());
                }
            }
            this.render();
            if (this.isRunning)
                this.loop();
        });
    }
    /*
        Läs denna för att uppdatera spelmekaniken rätt
        https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/
    */
    update() {
        _a.player.velocity.x = 0;
        _a.player.velocity.y = 0;
        if (this._keyEventHandler.isKeyPressed(KEY.UP))
            _a.player.velocity.y = -1;
        else if (this._keyEventHandler.isKeyPressed(KEY.DOWN))
            _a.player.velocity.y = 1;
        if (this._keyEventHandler.isKeyPressed(KEY.LEFT))
            _a.player.velocity.x = -1;
        else if (this._keyEventHandler.isKeyPressed(KEY.RIGHT))
            _a.player.velocity.x = 1;
        _a.player.velocity.normalize().scale(_a.player.speed);
        if (this._keyEventHandler.isKeyPressed(KEY.SHOOT)) {
            _a.player.autofire();
        }
        _a.player.update();
        Enemy.forEach(enemy => {
            enemy.update();
        });
        Projectile.forEach(projectile => {
            projectile.update();
        });
        Emitter.forEach(emitter => {
            emitter.update();
        });
        _a.time++;
        // Debug(Projectile.count);
    }
    render() {
        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
        _a.player.draw(this.context);
        Enemy.forEach(enemy => {
            enemy.draw(this.context);
        });
        Projectile.forEach(projectile => {
            projectile.draw(this.context);
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