var _a;
import Player from "./Player.js";
import Vector from "./Vector.js";
import Railgun from "./Weapons/RailGun.js";
import Sprite from "./Sprite.js";
import Drone from "./Enemies/Drone.js";
import Projectile from "./Projectiles/Projectile.js";
import Enemy from "./Enemies/Enemy.js";
import Debug from "./Debug.js";
import KeyEventHandler, { KEY } from "./KeyEventHandler.js";
import ScreenBounds from "./ScreenBounds.js";
import Emitter from "./Emitters/Emitter.js";
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
        _a.canvas = canvas;
        // this.canvas.height = window.outerHeight;
        _a.canvas.height = window.innerHeight;
        _a.canvas.width = window.innerWidth;
        this.context = _a.canvas.getContext("2d");
        this._keyEventHandler = new KeyEventHandler();
        window.addEventListener("resize", function () {
            _a.canvas.height = window.innerHeight;
            _a.canvas.width = window.innerWidth;
        });
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
        _a.screenBounds = new ScreenBounds(_a.canvas.width, _a.canvas.height);
        _a.player = new Player(new Vector(_a.canvas.width / 2, _a.canvas.height / 2), 50, 50);
        _a.player.addWeapon(new Railgun(_a.player, new Vector(-22, -3)));
        _a.player.addWeapon(new Railgun(_a.player, new Vector(22, -3)));
        new Drone(new Vector(_a.canvas.width / 2, 100));
        // let max = Game.canvas.height; // 1000;
        // let spread = 100;
        // for (let x = spread; x < max; x+=spread) {
        //     for (let y = spread; y < max; y+=spread) {
        //         new TestEmitter(new Vector(x, y), new Vector(1, 0));
        //     }
        // }
        // emitter = new Emitter(position, () => {});
        let spread = 1;
        for (let x = _a.canvas.width / (spread + 1); x < _a.canvas.width; x += (_a.canvas.width / (spread + 1))) {
            for (let y = _a.canvas.height / (spread + 1); y < _a.canvas.height; y += (_a.canvas.height / (spread + 1))) {
                // new CircleEmitter(new Vector(x, y), new Vector(1, 0));
                // let count = 4;
                // new RotatingEmitter(new Vector(0, 0), new Vector(3, 0), 10, 5, (position, direction) => {
                //     let angle: Vector = direction.copy().scale(3);
                //     for (let i = 0; i < count; i++) {
                //         let b: Bullet = new Bullet(Game.player.position.copy().add(position), angle.copy(), 8);
                //         b.draw = (context: CanvasRenderingContext2D) => {
                //             context.fillRect(b.position.x - (b.width / 2), b.position.y - (b.height / 2), b.width, b.height);
                //         };
                //         b.update = () => {
                //             b.move();
                //         };
                //         angle.setAngle(angle.angle + 2 * Math.PI / count, 3);
                //     }
                // });
                // new BB(new Vector(-22, -3), new Vector(3, 0), 10, 5);
                // new BB(new Vector(22, -3), new Vector(3, 0), 5, 10);
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
                    _a.previousTimeMs = currentTimeMs - (deltaTimeMs % _a.frameInterval);
                }
            }
            this.render();
            if (this.isRunning)
                this.loop();
        });
    }
    update() {
        _a.time++;
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
        Debug(Projectile.count);
    }
    render() {
        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, _a.canvas.width, _a.canvas.height);
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