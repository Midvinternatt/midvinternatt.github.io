import ICollidable from "../Interfaces/ICollidable.js";
import IDrawable from "../Interfaces/IDrawable.js";
import CollisionBox from "../CollisionBox.js";
import Sprite from "../Sprite.js";
import Vector from "../Vector.js";

export default abstract class Projectile implements IDrawable, ICollidable {
    private static _projectileList: Projectile[] = new Array();
    position: Vector;
    velocity: Vector;
    width: number;
    height: number;
    collisionBox: CollisionBox;
    sprite: HTMLImageElement;

    // Ändra till en iterator
    static getAllProjectiles() {
        return Projectile._projectileList; 
    }
    constructor(position: Vector, width: number, height: number, collisionWidth?: number, collisionHeight?: number) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.collisionBox = new CollisionBox(this, collisionWidth ?? width, collisionHeight ?? height);
        Projectile._projectileList.push(this);
    }
    checkCollision(target: ICollidable): boolean {
        return this.collisionBox.checkForCollision(target.collisionBox);
    }
    abstract update(): void;
    abstract move(): void;
    kill(): void {
        Projectile._projectileList.splice(Projectile._projectileList.indexOf(this), 1);
    }
    draw(context: CanvasRenderingContext2D) {
        context.fillRect(this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    }
}