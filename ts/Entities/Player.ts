import Weapon from "../Weapons/Weapon.js";
import Vector from "../Vector.js";
import Entity from "./Entity.js";
import Sprite from "../Sprite.js";
import Renderer, { CanvasLayer } from "../Renderer.js";
import GameScene from "../GameScene.js";
import SceneBounds from "../SceneBounds.js";

export default class Player extends Entity {
    static one: Player;
    velocity: Vector;
    sprite: Sprite;
    private _weaponList: Array<Weapon>;

    health: number = 3;
    maxHealth: number = 3;
    moveSpeed: number = 8;

    constructor(position: Vector, width: number, height: number) {
        super(position, width, height);
        this.position = position;
        this.velocity = new Vector(0, 0);

        this._weaponList = new Array<Weapon>();

        let animations = {
            idle: { frameCount: 5, frameDuration: 6, loop: true }
        };
        this.sprite = new Sprite(<HTMLImageElement> document.getElementById("PLAYER_SHIP"), width, height, animations); //.imageBitmapList.get(SPRITE.PLAYER_SHIP);
        this.sprite.playAnimation("idle");
    }

    addWeapon(newWeapon: Weapon) {
        this._weaponList.push(newWeapon);
    }
    autofire() {
        this._weaponList.forEach(weapon => {
            if(weapon.isReady)
                weapon.shoot();
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
        if(!this.velocity.equals(Vector.nullVector))
            this.move(scene.sceneBounds);
        
        this.sprite.update();
    }

    draw(renderer: Renderer) {
        this.sprite.draw(CanvasLayer.Entities, renderer, this.position.x - (this.width / 2), this.position.y - (this.height / 2));
        // renderer.drawImage(CanvasLayer.Entities, this.sprites.getFrame().bitmap, this.position.x - (this.width / 2), this.position.y - (this.height / 2));
    }
}