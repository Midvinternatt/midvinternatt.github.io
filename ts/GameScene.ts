import Debug from "./Debug.js";
import Emitter, { BB } from "./Emitters/Emitter.js";
import Drone from "./Entities/Enemies/Drone.js";
import Enemy from "./Entities/Enemies/Enemy.js";
import Entity from "./Entities/Entity.js";
import Game from "./Game.js";
import IScene from "./Interfaces/IScene.js";
import { KEY } from "./KeyEventHandler.js";
import Player from "./Entities/Player.js";
import Projectile from "./Projectiles/Projectile.js";
import Renderer from "./Renderer.js";
import SceneBounds from "./SceneBounds.js";
import UserInterface from "./UserInterface.js";
import Vector from "./Vector.js";
import Railgun from "./Weapons/RailGun.js";

export default class GameScene implements IScene {
    readonly renderer: Renderer;
    readonly sceneBounds: SceneBounds;
    readonly userInterface: UserInterface;

    player: Player;
    readonly enemies: Array<Entity>;
    readonly projectiles: Array<Projectile>;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.sceneBounds = new SceneBounds(renderer.width / 2, renderer.height / 2, renderer.width, renderer.height);
        this.userInterface = new UserInterface();
        this.enemies = new Array<Entity>();
        this.projectiles = new Array<Projectile>();
    }
    load() {
        this.player = new Player(new Vector(this.sceneBounds.width / 2, this.sceneBounds.height - 50), 64, 64);
        this.player.addWeapon(new Railgun(this.player, new Vector(-22, -3)));
        this.player.addWeapon(new Railgun(this.player, new Vector(22, -3)));
        this.player.moveSpeed = 8;
        
        new Drone(new Vector(this.sceneBounds.width / 2, 150));
        new Drone(new Vector(this.sceneBounds.width / 2 + 100, 100));
        new Drone(new Vector(this.sceneBounds.width / 2 - 100, 100));
        // testScene(this);
        return true;
    }
    update() {
        this.player.velocity.x = 0;
        this.player.velocity.y = 0;

        if(Game.keyEventHandler.isKeyPressed(KEY.UP))
            this.player.velocity.y -= 1;
        if(Game.keyEventHandler.isKeyPressed(KEY.DOWN)) 
            this.player.velocity.y += 1;
        if(Game.keyEventHandler.isKeyPressed(KEY.LEFT))
            this.player.velocity.x -= 1;
        if(Game.keyEventHandler.isKeyPressed(KEY.RIGHT)) 
            this.player.velocity.x += 1;

        this.player.velocity.normalize().scale(this.player.moveSpeed);
        
        if(Game.keyEventHandler.isKeyPressed(KEY.SHOOT)) {
            this.player.autofire();
        }
        
        this.player.update(this);
        Enemy.forEach(enemy => {
            enemy.update(this);
        });
        Projectile.forEach(projectile => {
            projectile.update(this);
        });
        Emitter.forEach(emitter => {
            emitter.update(this); 
        });
        
        this.userInterface.update();

        // Debug(`Projectiles: ${Projectile.count}`);
        // Debug(`X: ${Math.floor(this.player.position.x)} Y: ${Math.floor(this.player.position.y)}`);
    }
    draw() {
        this.renderer.clearCanvas();

        this.player.draw(this.renderer);
        Enemy.forEach(enemy => {
            enemy.draw(this.renderer);
        });
        Projectile.forEach(projectile => {
            projectile.draw(this.renderer);
        });
        
        this.userInterface.draw(this.renderer);
    }
    unload(): void {
        
    }
}

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