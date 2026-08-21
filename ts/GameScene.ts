import Enemy from "./entities/Enemy.js";
import Game from "./Game.js";
import IScene from "./Interfaces/IScene.js";
import Player from "./entities/Player.js";
import Projectile from "./Projectiles/Projectile.js";
import Renderer from "./Renderer.js";
import SceneBounds from "./collision/SceneBounds.js";
import UserInterface from "./UserInterface.js";
import Vector from "./Vector.js";
import Railgun from "./Weapons/RailGun.js";
import DebugOverlay from "./Debug/DebugOverlay.js";
import Level from "./Level.js";
import Emitter from "./Emitters/Emitter.js";

export default class GameScene implements IScene {
    readonly renderer: Renderer;
    readonly sceneBounds: SceneBounds;
    readonly userInterface: UserInterface;
    
    readonly enemies: Array<Enemy>;
    readonly projectiles: Array<Projectile>;
    readonly emitters: Array<Emitter>;

    level!: Level;
    player!: Player;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.sceneBounds = new SceneBounds({
            x: 0,
            y: 0,
            width: renderer.width,
            height: renderer.height
        });
        this.userInterface = new UserInterface();
        this.enemies = new Array<Enemy>();
        this.projectiles = new Array<Projectile>();
        this.emitters = new Array<Emitter>();
    }
    load() {
        this.start();
    }
    start() {
        this.player = new Player({
            position: new Vector(this.sceneBounds.width / 2, this.sceneBounds.height - 50),
            width: 64,
            height: 64,
            stats: {
                health: 3,
                maxHealth: 3,
                moveSpeed: 8
            }
        });
        this.player.addWeapon(new Railgun({owner: this.player, attachmentPosition: new Vector(-22, -3)}));
        this.player.addWeapon(new Railgun({owner: this.player, attachmentPosition: new Vector(22, -3)}));

        this.startLevel("level01");
    }

    update() {
        this.player.update(this);

        for (let i = this.enemies.length-1; i >= 0; i--){
            const enemy = this.enemies[i];
            enemy.update(this);

            if(enemy.isDead)
                this.enemies.splice(i, 1);
        }
        
        for (let i = this.projectiles.length-1; i >= 0; i--){
            const projectile = this.projectiles[i];
            projectile.update(this);

            if(projectile.isDead)
                this.projectiles.splice(i, 1);
        }
        
        this.userInterface.update();

        this.level.update(this);

        if(Game.debugActive)
            DebugOverlay.update(this);
    }

    draw() {
        this.renderer.clearCanvas();

        this.player.draw(this.renderer);
        for (let i = this.enemies.length-1; i >= 0; i--){
            const enemy = this.enemies[i];
            enemy.draw(this.renderer);
        }
        for (let i = this.projectiles.length-1; i >= 0; i--){
            const projectile = this.projectiles[i];
            projectile.draw(this.renderer);
        }
        
        this.userInterface.draw(this.renderer);
    }

    unload() {
        
    }

    spawnProjectile(projectile: Projectile) {
        this.projectiles.push(projectile);
    }
    spawnEnemy(enemy: Enemy) {
        this.enemies.push(enemy);
    }
    startLevel(id: string) {
        this.level = new Level(id);
    }
}

/*
function testScene(scene: GameScene) {
    // let count = 4;
    // new RotatingEmitter(new Vector(0, 0), new Vector(3, 0), 10, 5, (position, direction) => {
    //     let angle: Vector = direction.copy().scale(3);
    //     for (let i = 0; i < count; i++) {
    //         let b: Bullet = new Bullet(this.player.position.copy().add(position), angle.copy(), 8);
    //         b.draw = (renderer: Renderer) => {
    //             renderer.drawRect(CanvasLayer.Projectiles, b.position.x - (b.width / 2), b.position.y - (b.height / 2), b.width, b.height);
    //         };
    //         b.update = () => {
    //             b.move();
    //         };
    //         angle.setAngle(angle.angle + 2 * Math.PI / count, 3);
    //     }
    // });

    
    let spread = 8;
    for (let x = scene.sceneBounds.width / (spread+1); x < scene.sceneBounds.width; x+=(scene.sceneBounds.width / (spread+1))) {
        for (let y = scene.sceneBounds.height / (spread+1); y < scene.sceneBounds.height; y+=(scene.sceneBounds.height / (spread+1))) {
            // new RotatingEmitter(new Vector(x, y), new Vector(3, 0), 10, 5, (position, direction) => {
                // let angle: Vector = direction.copy().scale(3);
                // for (let i = 0; i < count; i++) {
                    // let b: Bullet = new Bullet(position.copy(), direction.copy(), 8);
                    // b.draw = (renderer: Renderer) => {
                    //     renderer.drawRect(CanvasLayer.Projectiles, b.position.x - (b.width / 2), b.position.y - (b.height / 2), b.width, b.height);
                    // };
                    // b.update = () => {
                    //     b.move();
                    // };
                //     angle.setAngle(angle.angle + 2 * Math.PI / count, 3);
                // }
            // });

            // new CircleEmitter(new Vector(x, y), new Vector(1, 0));

            // new BB(new Vector(-22, -3), new Vector(3, 0), 10, 5);
            // new BB(new Vector(22, -3), new Vector(3, 0), 5, 10);
            new BB(new Vector(x, y), new Vector(Math.random()*5, 0), Math.random()*5, Math.random()*20, () => {});
        }
    }
}
*/
