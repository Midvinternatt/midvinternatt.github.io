import Player from "./Player.js";
import Vector from "./Vector.js";
import Railgun from "./Weapons/RailGun.js";
import Sprite from "./Sprite.js";
import Drone from "./Enemies/Drone.js";
import Projectile from "./Projectiles/Projectile.js";
import Enemy from "./Enemies/Enemy.js";
import Debug from "./Debug.js";
import KeyEventHandler from "./KeyEventHandler.js";

/* Bra länkar
    Collision: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    Game loop: https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/
*/

export default class Game {
    private canvas: HTMLCanvasElement;
    // private backgroundCanvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private _keyEventHandler: KeyEventHandler;
    static keyState: boolean[];
    static time: number;

    static player: Player;
    private isRunning: boolean;

    constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement> canvas;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        this._keyEventHandler = new KeyEventHandler();
        this.loadResources();
        this.start();
    }

    loadResources(): void {
        Sprite.LoadSprites();
        // Sound.LoadSounds();
    }

    start() {
        Game.player = new Player(new Vector(512, 400), 100, 100);
        Game.player.addWeapon(new Railgun(Game.player, new Vector(-25, -50)));
        Game.player.addWeapon(new Railgun(Game.player, new Vector(25, -50)));
        new Drone(new Vector(512, 100));

        Game.time = 0;
        this.isRunning = true;
        this.loop();
    }

    /*
        Läs denna för att uppdatera spelmekaniken rätt
        https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/
    */
    update() {
        this._keyEventHandler.update(Game.player);

        Game.player.update();
        Enemy.getAllEnemies().forEach(enemy => {
            enemy.update();
        });
        Projectile.getAllProjectiles().forEach(bullet => {
            bullet.update();
        });

        Debug(Projectile.getAllProjectiles().length);
        Game.time++;
    }

    render() {
        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();

        Game.player.draw(this.context);
        Enemy.getAllEnemies().forEach(enemy => {
            enemy.draw(this.context);
        });
        Projectile.getAllProjectiles().forEach(bullet => {
            bullet.draw(this.context);
        });
    }

    loop() {
        this.update();
        this.render();

        if(this.isRunning)
            requestAnimationFrame(() => this.loop());
    }
}

new Game( document.getElementById("canvas"));