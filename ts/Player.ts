import Weapon from "./Weapons/Weapon.js";
import PlayArea from "./ScreenBounds.js";
import Vector from "./Vector.js";
import Entity from "./Entity.js";
import Sprite, { SPRITE } from "./Sprite.js";
import Game from "./Game.js";
import SpriteAnimation from "./SpriteAnimation.js";
import Scene from "./Scene.js";
import Renderer, { CanvasLayer } from "./Renderer.js";

export default class Player extends Entity {
    static one: Player;
    velocity: Vector;
    scene: Scene;
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
        this.sprite = Sprite.getSprite(SPRITE.PLAYER_SHIP); //.imageBitmapList.get(SPRITE.PLAYER_SHIP);
        this.sprites = new SpriteAnimation(30);
        this.sprites.addSprite(Sprite.getSprite(SPRITE.PLAYER_SHIP));
        this.sprites.addSprite(Sprite.getSprite(SPRITE.PLAYER_SHIP2));
        // this.sprite =  <HTMLImageElement> document.getElementById("PLAYER_SHIP");
        this._weaponList = [];
        // this.playArea = playArea;
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

        if(this.position.x < (this.width / 2))
            this.position.x = (this.width / 2);
        else if(this.position.x > (Game.activeScene.sceneBounds.width - (this.width / 2))) 
            this.position.x = (Game.activeScene.sceneBounds.width - (this.width / 2));
        if(this.position.y < (this.height / 2))
            this.position.y = (this.height / 2);
        else if(this.position.y > (Game.activeScene.sceneBounds.height - (this.height / 2)))
            this.position.y = (Game.activeScene.sceneBounds.height - (this.height / 2));
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