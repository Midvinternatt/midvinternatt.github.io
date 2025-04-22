import Vector from "../Vector.js";
import Sprite from "../Sprite.js";
import CollisionBox from "../CollisionBox.js";
import IDrawable from "../Interfaces/IDrawable.js";
import ICollidable from "../Interfaces/ICollidable.js";
import Renderer, { CanvasLayer } from "../Renderer.js";

export default abstract class Projectile implements IDrawable, ICollidable {
    private static _projectileList: Projectile[] = new Array();
    position: Vector;
    velocity: Vector;
    width: number;
    height: number;
    collisionBox: CollisionBox;
    sprite: Sprite;

    static get count() {
        return Projectile._projectileList.length;
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
    draw(renderer: Renderer) {
        renderer.drawRect(CanvasLayer.Projectiles, this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
    }
    static forEach(callback: (element: Projectile) => void): void {
        Projectile._projectileList.forEach(callback);
    }
}