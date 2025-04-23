import Vector from "./Vector.js";
import Entity from "./Entity.js";
import Sprite, { SPRITE } from "./Sprite.js";
import Game from "./Game.js";
import SpriteAnimation from "./SpriteAnimation.js";
import { CanvasLayer } from "./Renderer.js";
export default class Player extends Entity {
    constructor(position, width, height, scene, playArea) {
        super(position, width, height);
        this.speed = 8;
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
    addWeapon(newWeapon) {
        this._weaponList.push(newWeapon);
    }
    autofire() {
        this._weaponList.forEach(weapon => {
            if (weapon.isReady)
                weapon.shoot();
        });
    }
    kill() {
    }
    move() {
        this.position.add(this.velocity);
        if (this.position.x < (this.width / 2))
            this.position.x = (this.width / 2);
        else if (this.position.x > (Game.activeScene.sceneBounds.width - (this.width / 2)))
            this.position.x = (Game.activeScene.sceneBounds.width - (this.width / 2));
        if (this.position.y < (this.height / 2))
            this.position.y = (this.height / 2);
        else if (this.position.y > (Game.activeScene.sceneBounds.height - (this.height / 2)))
            this.position.y = (Game.activeScene.sceneBounds.height - (this.height / 2));
    }
    update() {
        if (!this.velocity.equals(Vector.nullVector))
            this.move();
        this.sprites.nextFrame();
    }
    draw(renderer) {
        renderer.drawImage(CanvasLayer.Entities, this.sprites.getFrame().bitmap, this.position.x - (this.width / 2), this.position.y - (this.height / 2));
    }
}
//# sourceMappingURL=Player.js.map