// import CollisionBox from "./CollisionBox.js";
// import ICollidable from "./Interfaces/ICollidable.js";
import { CollisionBox, ICollidable } from "./CollisionBox.js";
import IDrawable from "./Interfaces/IDrawable.js";
import Sprite from "./Sprite.js";
import Vector from "./Vector.js";

export default abstract class Entity implements IDrawable, ICollidable {
    position: Vector;
    collisionBox: CollisionBox;
    width: number;
    height: number;
    sprite: HTMLImageElement;

    constructor(position: Vector, width: number, height: number, collisionWidth?: number, collisionHeight?: number) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.collisionBox = new CollisionBox(this, collisionWidth ?? width, collisionHeight ?? height);
    }
    checkCollision(target: ICollidable): boolean {
        return this.collisionBox.checkForCollision(target.collisionBox);
    }
    abstract update(): void;
    abstract kill(): void;
    abstract draw(context: CanvasRenderingContext2D): void;
}