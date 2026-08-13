import Weapon from "../Weapons/Weapon.js";
import Vector from "../Vector.js";
import Entity from "./Entity.js";
import Renderer, { CanvasLayer } from "../Renderer.js";
import GameScene from "../GameScene.js";
import SceneBounds from "../collision/SceneBounds.js";
import Assets from "../Assets.js";
import { SpriteType } from "../SpriteDefinitions.js";
import Sprite from "../Sprite.js";
import PlayerInput from "../Input/PlayerInput.js";

export default class Player extends Entity {
    static one: Player;
    velocity: Vector;
    private _weaponList: Array<Weapon> = new Array<Weapon>();

    health: number;
    maxHealth: number;
    moveSpeed: number;

    constructor({position, width, height, stats: {health, maxHealth, moveSpeed}}: {
        position: Vector,
        width: number,
        height: number,
        stats: {health: number, maxHealth: number, moveSpeed: number}
    }) {
        super({position, width, height});
        this.velocity = new Vector(0, 0);
        this.sprite = new Sprite(Assets.getSpriteData(SpriteType.Player), "idle");

        this.health = health;
        this.maxHealth = maxHealth;
        this.moveSpeed = moveSpeed;
    }

    addWeapon(newWeapon: Weapon) {
        this._weaponList.push(newWeapon);
    }
    shoot(scene: GameScene) {
        this._weaponList.forEach(weapon => {
            if(weapon.isReady){
                const bullet = weapon.shoot();
                scene.spawnProjectile(bullet);
            }
        });
    }

    kill() {
        
    }
    move(sceneBounds: SceneBounds) {
        this.position.add(this.velocity);

        if (this.position.x - this.width / 2 < sceneBounds.left)
            this.position.x = sceneBounds.left + this.width / 2;
        else if (this.position.x + this.width / 2 > sceneBounds.right)
            this.position.x = sceneBounds.right - this.width / 2;
        
        if (this.position.y - this.height / 2 < sceneBounds.top)
            this.position.y = sceneBounds.top + this.height / 2;
        else if (this.position.y + this.height / 2 > sceneBounds.bottom)
            this.position.y = sceneBounds.bottom - this.height / 2;

        // if (this.position.x - this.width / 2 < this.scene.sceneBounds.x)
        //     this.position.x = this.scene.sceneBounds.x + this.width / 2;
        // else if (this.position.x + this.width / 2 > this.scene.sceneBounds.x + this.scene.sceneBounds.width)
        //     this.position.x = this.scene.sceneBounds.x + this.scene.sceneBounds.width - this.width / 2;
    
        // if (this.position.y - this.height / 2 < this.scene.sceneBounds.y)
        //     this.position.y = this.scene.sceneBounds.y + this.height / 2;
        // else if (this.position.y + this.height / 2 > this.scene.sceneBounds.y + this.scene.sceneBounds.height)
        //     this.position.y = this.scene.sceneBounds.y + this.scene.sceneBounds.height - this.height / 2;


        // Denna kod funkar om sceneBounds x och y alltid är 0
        // if(this.position.x < (this.width / 2))
        //     this.position.x = (this.width / 2);
        // else if(this.position.x > (this.scene.sceneBounds.width - (this.width / 2))) 
        //     this.position.x = (this.scene.sceneBounds.width - (this.width / 2));
        // if(this.position.y < (this.height / 2))
        //     this.position.y = (this.height / 2);
        // else if(this.position.y > (this.scene.sceneBounds.height - (this.height / 2)))
        //     this.position.y = (this.scene.sceneBounds.height - (this.height / 2));
    }

    update(scene: GameScene) {
        this.velocity = PlayerInput.getMovement().normalize().scale(this.moveSpeed);

        if(!this.velocity.equals(Vector.nullVector))
            this.move(scene.sceneBounds);

        if(PlayerInput.isShooting())
            this.shoot(scene);
        
        this.sprite.update();
    }

    draw(renderer: Renderer) {
        this.sprite.draw({
            layer: CanvasLayer.Entities,
            renderer,
            x: this.position.x - (this.width / 2),
            y: this.position.y - (this.height / 2)
        });
    }
}