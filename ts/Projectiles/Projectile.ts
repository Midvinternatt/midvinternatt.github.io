import Vector from "../Vector.js";
import Sprite from "../Sprite.js";
import CollisionBox from "../CollisionBox.js";
import IDrawable from "../Interfaces/IDrawable.js";
import {ICollidable, Collidable} from "../Interfaces/ICollidable.js";
import Renderer from "../Renderer.js";
import SceneBounds from "../SceneBounds.js";
import GameScene from "../GameScene.js";

export default abstract class Projectile implements IDrawable, ICollidable {
    position: Vector;
    velocity: Vector;
    width: number;
    height: number;
    isDead: boolean;
    collisionBox: CollisionBox;
    sprite: Sprite;

    constructor({position, width, height, collisionWidth, collisionHeight}: {
        position: Vector,
        width: number, 
        height: number,
        collisionWidth?: number,
        collisionHeight?: number
    }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.isDead = false;
        this.collisionBox = new CollisionBox({
            owner: this,
            width: collisionWidth ?? width,
            height: collisionHeight ?? height
        });
    }
    checkCollision(target: Collidable): boolean {
        return this.collisionBox.intersects(target.collisionBox);
    }
    abstract update(scene: GameScene): void;
    abstract move(sceneBounds: SceneBounds): void;
    kill() {
        this.isDead = true;
    }
    abstract draw(renderer: Renderer): void;
}