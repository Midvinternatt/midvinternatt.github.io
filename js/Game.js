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
var KEY;
(function (KEY) {
    KEY[KEY["UP"] = 87] = "UP";
    KEY[KEY["DOWN"] = 83] = "DOWN";
    KEY[KEY["LEFT"] = 65] = "LEFT";
    KEY[KEY["RIGHT"] = 68] = "RIGHT";
    KEY[KEY["SHOOT"] = 32] = "SHOOT";
})(KEY || (KEY = {}));
export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        this._keyEventHandler = new KeyEventHandler();
        Game.keyState = [];
        // this.keyEventLogger = function (e) { if(e.repeat) return; console.log(e.keyCode, e.type, this); Game.keyState[e.keyCode] = e.type == "keydown"; };
        // window.addEventListener("keydown", this.keyEventLogger);
        // window.addEventListener("keyup", this.keyEventLogger);
        this.start();
    }
    loadResources() {
        Sprite.LoadSprites();
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
        // if(Game.keyState[KEY.UP])
        //     Game.player.velocity.y = -1;
        // else if(Game.keyState[KEY.DOWN])
        //     Game.player.velocity.y = 1;
        // else
        //     Game.player.velocity.y = 0;
        // if(Game.keyState[KEY.LEFT])
        //     Game.player.velocity.x = -1;
        // else if(Game.keyState[KEY.RIGHT])
        //     Game.player.velocity.x = 1;
        // else
        //     Game.player.velocity.x = 0;
        // Game.player.velocity.normalize().scale(Game.player.speed);
        // if(Game.keyState[KEY.SHOOT]) {
        //     Game.player.autofire();
        // }
        Game.player.update();
        Enemy.getAllEnemies().forEach(enemy => {
            enemy.update();
        });
        Projectile.getAllProjectiles().forEach(bullet => {
            bullet.update();
        });
        // document.getElementById("debug").innerText = ""+this.player.position.x+", "+this.player.position.y;
        // document.getElementById("debug").innerText = ""+window.innerHeight;
        // document.getElementById("debug").innerText = ""+(Game.time % 60);
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
        if (this.isRunning)
            requestAnimationFrame(() => this.loop());
    }
}
let game = new Game(document.getElementById("canvas"));
//# sourceMappingURL=Game.js.map