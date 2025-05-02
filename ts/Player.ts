import Weapon from "./Weapons/Weapon.js";
import Vector from "./Vector.js";
import Entity from "./Entity.js";
import Sprite, { SPRITE } from "./Sprite.js";
import SpriteAnimation from "./SpriteAnimation.js";
import Scene from "./GameScene.js";
import Renderer, { CanvasLayer } from "./Renderer.js";
import GameScene from "./GameScene.js";

export default class Player extends Entity {
    static one: Player;
    velocity: Vector;
    scene: GameScene;
    // sprites;
    sprites: SpriteAnimation;
    private _weaponList: Weapon[];

    health: number = 3;
    maxHealth: number = 3;
    moveSpeed: number = 8;

    constructor(position: Vector, width: number, height: number, scene: Scene) {
        super(position, width, height);
        this.position = position;
        this.velocity = new Vector(0, 0);
        this.scene = scene;
        this.sprite = Sprite.getSprite(SPRITE.PLAYER_SHIP); //.imageBitmapList.get(SPRITE.PLAYER_SHIP);
        this.sprites = new SpriteAnimation(30);
        this.sprites.addSprite(Sprite.getSprite(SPRITE.PLAYER_SHIP));
        this.sprites.addSprite(Sprite.getSprite(SPRITE.PLAYER_SHIP2));
        // this.sprite =  <HTMLImageElement> document.getElementById("PLAYER_SHIP");
        this._weaponList = new Array<Weapon>();
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

    kill(): void {
        
    }
    move() {
        this.position.add(this.velocity);

        if (this.position.x - this.width / 2 < this.scene.sceneBounds.x)
            this.position.x = this.scene.sceneBounds.x + this.width / 2;
        else if (this.position.x + this.width / 2 > this.scene.sceneBounds.x + this.scene.sceneBounds.width)
            this.position.x = this.scene.sceneBounds.x + this.scene.sceneBounds.width - this.width / 2;
    
        if (this.position.y - this.height / 2 < this.scene.sceneBounds.y)
            this.position.y = this.scene.sceneBounds.y + this.height / 2;
        else if (this.position.y + this.height / 2 > this.scene.sceneBounds.y + this.scene.sceneBounds.height)
            this.position.y = this.scene.sceneBounds.y + this.scene.sceneBounds.height - this.height / 2;

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

    update() {
        if(!this.velocity.equals(Vector.nullVector))
            this.move();
        this.sprites.nextFrame();
    }

    draw(renderer: Renderer) {
        renderer.drawImage(CanvasLayer.Entities, this.sprites.getFrame().bitmap, this.position.x - (this.width / 2), this.position.y - (this.height / 2));
    }
}