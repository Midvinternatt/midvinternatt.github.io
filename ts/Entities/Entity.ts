import ICollidable, { Collidable } from "./../Interfaces/ICollidable.js";
import IDrawable from "./../Interfaces/IDrawable.js";
import CollisionBox from "./../CollisionBox.js";
import Sprite from "./../Sprite.js";
import Vector from "./../Vector.js";
import Renderer from "./../Renderer.js";
import GameScene from "./../GameScene.js";

export default abstract class Entity implements IDrawable, ICollidable {
    position: Vector;
    collisionBox: CollisionBox;
    width: number;
    height: number;
    sprite: Sprite;

    constructor(position: Vector, width: number, height: number, collisionWidth?: number, collisionHeight?: number) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.collisionBox = new CollisionBox(this, collisionWidth ?? width, collisionHeight ?? height);
    }
    checkCollision(target: Collidable): boolean {
        return this.collisionBox.intersects(target.collisionBox);
    }
    abstract update(scene: GameScene): void;
    abstract kill(): void;
    abstract draw(renderer: Renderer): void;
}