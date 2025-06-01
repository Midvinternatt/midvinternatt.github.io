import Vector from "../Vector.js";
import Entity from "./Entity.js";
import { CanvasLayer } from "../Renderer.js";
import Assets from "../Assets.js";
import { SpriteType } from "../SpriteDefinitions.js";
import Sprite from "../Sprite.js";
export default class Player extends Entity {
    static one;
    velocity;
    _weaponList = new Array();
    health = 3;
    maxHealth = 3;
    moveSpeed = 8;
    constructor(position, width, height) {
        super(position, width, height);
        this.velocity = new Vector(0, 0);
        this.sprite = new Sprite(Assets.getSpriteData(SpriteType.Player), "idle");
    }
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
    move(sceneBounds) {
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
    update(scene) {
        if (!this.velocity.equals(Vector.nullVector))
            this.move(scene.sceneBounds);
        this.sprite.update();
    }
    draw(renderer) {
        this.sprite.draw(CanvasLayer.Entities, renderer, this.position.x - (this.width / 2), this.position.y - (this.height / 2));
    }
}
//# sourceMappingURL=Player.js.map