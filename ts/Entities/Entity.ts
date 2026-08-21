import {ICollidable,  Collidable} from "../collision/ICollidable.js";
import IDrawable from "../Interfaces/IDrawable.js";
import CollisionBox from "../collision/CollisionBox.js";
import Sprite from "../Sprite.js";
import Vector from "../Vector.js";
import Renderer from "../Renderer.js";
import GameScene from "../GameScene.js";
import { SpriteData } from "../assets/AssetsDefinitions.js";

export default abstract class Entity implements IDrawable, ICollidable {
    position: Vector;
    width: number;
    height: number;
    sprite: Sprite;
    collisionBox: CollisionBox;

    constructor({position, sprite, width, height}: {
        position: Vector,
        sprite: {
            data: SpriteData,
            defaultAnimation?: string
        }
        width: number,
        height: number
    }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.sprite = new Sprite(sprite.data);
        this.collisionBox = new CollisionBox({owner: this, width, height});
    }
    checkCollision(target: Collidable): boolean {
        return this.collisionBox.intersects(target.collisionBox);
    }
    abstract update(scene: GameScene): void;
    abstract kill(): void;
    abstract draw(renderer: Renderer): void;
}