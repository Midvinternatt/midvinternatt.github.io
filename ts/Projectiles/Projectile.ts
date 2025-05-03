import Vector from "../Vector.js";
import Sprite from "../Sprite.js";
import CollisionBox from "../CollisionBox.js";
import IDrawable from "../Interfaces/IDrawable.js";
import ICollidable, { Collidable } from "../Interfaces/ICollidable.js";
import Renderer, { CanvasLayer } from "../Renderer.js";
import SceneBounds from "../SceneBounds.js";
import GameScene from "../GameScene.js";

export default abstract class Projectile implements IDrawable, ICollidable {
    private static _projectileList: Projectile[] = new Array();
    position: Vector;
    velocity: Vector;
    width: number;
    height: number;
    collisionBox: CollisionBox;
    // sprite: Sprite;

    static get count(): number {
        return Projectile._projectileList.length;
    }
    constructor(position: Vector, width: number, height: number, collisionWidth?: number, collisionHeight?: number) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.collisionBox = new CollisionBox(this, collisionWidth ?? width, collisionHeight ?? height);
            if(Projectile.count < 10000)
        Projectile._projectileList.push(this);
    }
    checkCollision(target: Collidable): boolean {
        return this.collisionBox.intersects(target.collisionBox);
    }
    abstract update(scene: GameScene): void;
    abstract move(sceneBounds: SceneBounds): void;
    kill() {
        Projectile._projectileList.splice(Projectile._projectileList.indexOf(this), 1);
    }
    abstract draw(renderer: Renderer): void;
    static forEach(callback: (element: Projectile) => void) {
        Projectile._projectileList.forEach(callback);
    }
}