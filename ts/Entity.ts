import ICollidable from "./Interfaces/ICollidable.js";
import IDrawable from "./Interfaces/IDrawable.js";
import CollisionBox from "./CollisionBox.js";
import Sprite from "./Sprite.js";
import Vector from "./Vector.js";

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
    checkCollision(target: ICollidable): boolean {
        return this.collisionBox.checkForCollision(target.collisionBox);
    }
    abstract update(): void;
    abstract kill(): void;
    abstract draw(context: CanvasRenderingContext2D): void;
}