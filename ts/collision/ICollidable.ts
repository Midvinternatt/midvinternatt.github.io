import CollisionBox from "../collision/CollisionBox.js";
import Entity from "../Entities/Entity.js";
import Projectile from "../Projectiles/Projectile.js";

export type Collidable = Entity | Projectile;
export interface ICollidable {
    collisionBox: CollisionBox;
    checkCollision(target: Collidable): boolean;
}
