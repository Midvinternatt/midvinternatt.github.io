import Vector from "../Vector.js";
import Entity from "./Entity.js";
import { CanvasLayer } from "../Renderer.js";
import AssetsLoader from "../assets/AssetsLoader.js";
import PlayerInput from "../Input/PlayerInput.js";
export default class Player extends Entity {
    static one;
    velocity;
    _weaponList = new Array();
    health;
    maxHealth;
    moveSpeed;
    constructor({ position, width, height, stats: { health, maxHealth, moveSpeed } }) {
        super({
            position,
            sprite: {
                data: AssetsLoader.getSpriteData("player"),
                defaultAnimation: "idle"
            },
            width,
            height
        });
        this.velocity = new Vector(0, 0);
        this.health = health;
        this.maxHealth = maxHealth;
        this.moveSpeed = moveSpeed;
    }
    addWeapon(newWeapon) {
        this._weaponList.push(newWeapon);
    }
    shoot(scene) {
        this._weaponList.forEach(weapon => {
            if (weapon.isReady) {
                weapon.shoot(scene);
            }
        });
    }
    kill() {
    }
    hit() {
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
    }
    update(scene) {
        this.velocity = PlayerInput.getMovement().normalize().scale(this.moveSpeed);
        if (!this.velocity.equals(Vector.nullVector))
            this.move(scene.sceneBounds);
        if (PlayerInput.isShooting())
            this.shoot(scene);
        this.sprite.update();
    }
    draw(renderer) {
        this.sprite.draw({
            layer: CanvasLayer.Entities,
            renderer,
            x: this.position.x - (this.width / 2),
            y: this.position.y - (this.height / 2)
        });
    }
}
//# sourceMappingURL=Player.js.map