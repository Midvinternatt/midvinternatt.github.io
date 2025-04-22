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
import Emitter, { BB, CircleEmitter, RepeatingEmitter, RotatingEmitter, TestEmitter } from "./Emitters/Emitter.js";
import Bullet from "./Projectiles/Bullet.js";

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

export default class Game {
    static canvas: HTMLCanvasElement;
    // private backgroundCanvas: HTMLCanvasElement;
    // private entityCanvas: HTMLCanvasElement;
    // private projectileCanvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private _keyEventHandler: KeyEventHandler;
    static time: number;
    static maxFps: number = 60;
    static frameInterval: number = 1000 / this.maxFps;
    static previousTimeMs: number = 0;

    static screenBounds: ScreenBounds;
    static player: Player;
    private isRunning: boolean;

    constructor(canvas: HTMLElement) {
        Game.canvas = <HTMLCanvasElement> canvas;
        // this.canvas.height = window.outerHeight;
        Game.canvas.height = window.innerHeight;
        Game.canvas.width = window.innerWidth;
        this.context = Game.canvas.getContext("2d");
        this._keyEventHandler = new KeyEventHandler();

        window.addEventListener("resize",function(){
            Game.canvas.height = window.innerHeight;
            Game.canvas.width = window.innerWidth;
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
        Game.screenBounds = new ScreenBounds(Game.canvas.width, Game.canvas.height);
        Game.player = new Player(new Vector(Game.canvas.width / 2, Game.canvas.height / 2), 50, 50);
        Game.player.addWeapon(new Railgun(Game.player, new Vector(-22, -3)));
        Game.player.addWeapon(new Railgun(Game.player, new Vector(22, -3)));
        new Drone(new Vector(Game.canvas.width / 2, 100));

        // let max = Game.canvas.height; // 1000;
        // let spread = 100;
        // for (let x = spread; x < max; x+=spread) {
        //     for (let y = spread; y < max; y+=spread) {
        //         new TestEmitter(new Vector(x, y), new Vector(1, 0));
        //     }
        // }

        // emitter = new Emitter(position, () => {});

        let spread = 1;
        for (let x = Game.canvas.width / (spread+1); x < Game.canvas.width; x+=(Game.canvas.width / (spread+1))) {
            for (let y = Game.canvas.height / (spread+1); y < Game.canvas.height; y+=(Game.canvas.height / (spread+1))) {
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

        Game.time = 0;
        this.isRunning = true;
        this.loop();
    }
    loop() {
        requestAnimationFrame((currentTimeMs) => {
            if(document.hasFocus() || this._keyEventHandler.reset()) {
                const deltaTimeMs = currentTimeMs - Game.previousTimeMs;
                if(deltaTimeMs >= Game.frameInterval) {
                    this.update();
                    Game.previousTimeMs = currentTimeMs - (deltaTimeMs % Game.frameInterval);
                }
            }
            
            this.render();
            if(this.isRunning)
                this.loop();
        });
    }

    update() {
        Game.time++;
        Game.player.velocity.x = 0;
        Game.player.velocity.y = 0;

        if(this._keyEventHandler.isKeyPressed(KEY.UP))
            Game.player.velocity.y = -1;
        else if(this._keyEventHandler.isKeyPressed(KEY.DOWN)) 
            Game.player.velocity.y = 1;
        if(this._keyEventHandler.isKeyPressed(KEY.LEFT))
            Game.player.velocity.x = -1;
        else if(this._keyEventHandler.isKeyPressed(KEY.RIGHT)) 
            Game.player.velocity.x = 1;

        Game.player.velocity.normalize().scale(Game.player.speed);
        
        if(this._keyEventHandler.isKeyPressed(KEY.SHOOT)) {
            Game.player.autofire();
        }

        Game.player.update();
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
        this.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        this.context.restore();

        Game.player.draw(this.context);
        Enemy.forEach(enemy => {
            enemy.draw(this.context);
        });
        Projectile.forEach(projectile => {
            projectile.draw(this.context);
        });
    }
}

new Game(document.getElementById("canvas"));