import Debug from "./Debug.js";
import Emitter, { BB, CircleEmitter, RotatingEmitter } from "./Emitters/Emitter.js";
import Drone from "./Enemies/Drone.js";
import Enemy from "./Enemies/Enemy.js";
import Game from "./Game.js";
import { KEY } from "./KeyEventHandler.js";
import Player from "./Player.js";
import Bullet from "./Projectiles/Bullet.js";
import Projectile from "./Projectiles/Projectile.js";
import Renderer, { CanvasLayer } from "./Renderer.js";
import ScreenBounds from "./ScreenBounds.js";
import Vector from "./Vector.js";
import Railgun from "./Weapons/RailGun.js";

export interface Scene {
    load(): void;
    update(): void;
    draw(): void;
}

export default class GameScene implements Scene {
    renderer: Renderer;
    sceneBounds: ScreenBounds;
    player: Player;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.sceneBounds = new ScreenBounds(renderer.entityCanvas.width, renderer.entityCanvas.height);
        this.player = new Player(new Vector(renderer.entityCanvas.width / 2, renderer.entityCanvas.height / 2), 50, 50, this);
        this.player.addWeapon(new Railgun(this.player, new Vector(-22, -3)));
        this.player.addWeapon(new Railgun(this.player, new Vector(22, -3)));
        new Drone(new Vector(renderer.entityCanvas.width / 2, 100));

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
        for (let x = renderer.entityCanvas.width / (spread+1); x < renderer.entityCanvas.width; x+=(renderer.entityCanvas.width / (spread+1))) {
            for (let y = renderer.entityCanvas.height / (spread+1); y < renderer.entityCanvas.height; y+=(renderer.entityCanvas.height / (spread+1))) {
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
    load() {

    }
    update() {
        this.player.velocity.x = 0;
        this.player.velocity.y = 0;

        if(Game.keyEventHandler.isKeyPressed(KEY.UP))
            this.player.velocity.y = -1;
        else if(Game.keyEventHandler.isKeyPressed(KEY.DOWN)) 
            this.player.velocity.y = 1;
        if(Game.keyEventHandler.isKeyPressed(KEY.LEFT))
            this.player.velocity.x = -1;
        else if(Game.keyEventHandler.isKeyPressed(KEY.RIGHT)) 
            this.player.velocity.x = 1;

        this.player.velocity.normalize().scale(this.player.speed);
        
        if(Game.keyEventHandler.isKeyPressed(KEY.SHOOT)) {
            this.player.autofire();
        }
        
        this.player.update();
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
    draw() {
        this.renderer.clearCanvas();

        this.player.draw(this.renderer);
        Enemy.forEach(enemy => {
            enemy.draw(this.renderer);
        });
        Projectile.forEach(projectile => {
            projectile.draw(this.renderer);
        });
    }
}