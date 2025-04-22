import Weapon from "./Weapons/Weapon.js";
import PlayArea from "./ScreenBounds.js";
import Vector from "./Vector.js";
import Entity from "./Entity.js";
import Sprite, { SPRITE } from "./Sprite.js";
import Game from "./Game.js";
import SpriteAnimation from "./SpriteAnimation.js";

export default class Player extends Entity {
    velocity: Vector;
    private _weaponList: Weapon[];

    speed: number = 8;
    // playArea;
    // sprites;
    sprites: SpriteAnimation;

    constructor(position: Vector, width: number, height: number, playArea?: PlayArea) {
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

    // Ändra till PlayArea
    // set position(newPosition: Vector) {
    //     if(newPosition.x < (this.width / 2))
    //         newPosition.x = (this.width / 2);
    //     else if(newPosition.x > (1024 - (this.width / 2)))
    //         newPosition.x = (1024 - (this.width / 2));
    //     if(newPosition.y < (this.height / 2))
    //         newPosition.y = (this.height / 2);
    //     else if(newPosition.y > (window.innerHeight - (this.height / 2)))
    //         newPosition.y = (window.innerHeight - (this.height / 2));

    //     this.position = newPosition;
    // }
    // set velocity(newValue) {
    //     this._velocity = newValue;
    // }
    // get velocity() {
    //     return this._velocity;
    // }

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
        else if(this.position.x > (Game.canvas.width - (this.width / 2)))
            this.position.x = (Game.canvas.width - (this.width / 2));
        if(this.position.y < (this.height / 2))
            this.position.y = (this.height / 2);
        else if(this.position.y > (Game.canvas.height - (this.height / 2)))
            this.position.y = (Game.canvas.height - (this.height / 2));
    }

    update() {
        if(!this.velocity.equals(Vector.nullVector))
            this.move();
        this.sprites.nextFrame();
    }

    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.sprites.getFrame().bitmap, this.position.x - (this.width / 2), this.position.y - (this.height / 2));
    }
}