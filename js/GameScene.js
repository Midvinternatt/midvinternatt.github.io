import Game from "./Game.js";
import Player from "./Entities/Player.js";
import SceneBounds from "./collision/SceneBounds.js";
import UserInterface from "./UserInterface.js";
import Vector from "./Vector.js";
import Railgun from "./Weapons/RailGun.js";
import DebugOverlay from "./Debug/DebugOverlay.js";
import Level from "./Level.js";
export default class GameScene {
    renderer;
    sceneBounds;
    userInterface;
    enemies;
    projectiles;
    level;
    player;
    constructor(renderer) {
        this.renderer = renderer;
        this.sceneBounds = new SceneBounds({
            x: 0,
            y: 0,
            width: renderer.width,
            height: renderer.height
        });
        this.userInterface = new UserInterface();
        this.enemies = new Array();
        this.projectiles = new Array();
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
        this.player.addWeapon(new Railgun({ owner: this.player, attachmentPosition: new Vector(-22, -3) }));
        this.player.addWeapon(new Railgun({ owner: this.player, attachmentPosition: new Vector(22, -3) }));
        this.startLevel("level01");
    }
    update() {
        this.player.update(this);
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update(this);
            if (enemy.isDead)
                this.enemies.splice(i, 1);
        }
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update(this);
            if (projectile.isDead)
                this.projectiles.splice(i, 1);
        }
        this.userInterface.update();
        this.level.update(this);
        if (Game.debugActive)
            DebugOverlay.update(this);
    }
    draw() {
        this.renderer.clearCanvas();
        this.player.draw(this.renderer);
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.draw(this.renderer);
        }
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.draw(this.renderer);
        }
        this.userInterface.draw(this.renderer);
    }
    unload() {
    }
    spawnProjectile(projectile) {
        this.projectiles.push(projectile);
    }
    spawnEnemy(enemy) {
        this.enemies.push(enemy);
    }
    startLevel(id) {
        this.level = new Level();
        this.level.start();
    }
}
//# sourceMappingURL=GameScene.js.map