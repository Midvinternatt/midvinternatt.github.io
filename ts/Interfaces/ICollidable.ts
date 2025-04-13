import CollisionBox from "../CollisionBox.js";
import Entity from "../Entity.js";
import Projectile from "../Projectiles/Projectile.js";

export type Collidable = Entity | Projectile;
export default interface ICollidable {
    collisionBox: CollisionBox;
    checkCollision(target: Collidable): boolean;
}