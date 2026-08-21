import AssetsLoader from "../assets/AssetsLoader.js";
import { CanvasLayer } from "../Renderer.js";
import Sprite from "../Sprite.js";
import PlayerProjectile from "./PlayerProjectile.js";
export default class Bullet extends PlayerProjectile {
    constructor({ position, velocity }) {
        super({
            position,
            velocity,
            width: 32,
            height: 32,
            collisionWidth: 32,
            collisionHeight: 32
        });
        this.sprite = new Sprite(AssetsLoader.getSpriteData("rocket"));
    }
    draw(renderer) {
        this.sprite.draw({
            layer: CanvasLayer.Projectiles,
            renderer,
            x: this.position.x - (this.width / 2),
            y: this.position.y - (this.height / 2)
        });
    }
}
//# sourceMappingURL=Bullet.js.map