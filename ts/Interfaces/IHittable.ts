import ICollidable from "./ICollidable.js";

export function canBeHit (object): object is IHittable {
    return (object as IHittable).hit !== undefined;
}

export default interface IHittable extends ICollidable {
    hit(): void;
}