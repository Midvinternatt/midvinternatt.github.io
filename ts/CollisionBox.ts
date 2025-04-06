import Entity from "./Entity.js";
import Projectile from "./Projectiles/Projectile.js";

export type Collidable = Entity | Projectile;
export interface ICollidable {
    collisionBox: CollisionBox;
    checkCollision(target: Collidable): boolean;
}

export class CollisionBox {
    _owner: Collidable;
    _width: number;
    _height: number;

    constructor(owner: Collidable, width: number, height: number) {
        this._owner = owner;
        this._width = width;
        this._height = height;
    }
    checkForCollision(otherCollisionBox: CollisionBox) {
        if(
            (this._owner.position.x - this._width / 2) < (otherCollisionBox._owner.position.x + otherCollisionBox._width / 2) &&
            (this._owner.position.x + this._width / 2) > (otherCollisionBox._owner.position.x - otherCollisionBox._width / 2) &&
            (this._owner.position.y - this._height / 2) < (otherCollisionBox._owner.position.y + otherCollisionBox._height / 2) &&
            (this._owner.position.y + this._height / 2) > (otherCollisionBox._owner.position.y - otherCollisionBox._height / 2)
        )
            return true;   
    }
    /*
        if (
            rect1.x < rect2.x + rect2.w &&
            rect1.x + rect1.w > rect2.x &&
            rect1.y < rect2.y + rect2.h &&
            rect1.y + rect1.h > rect2.y
        )
    */
}