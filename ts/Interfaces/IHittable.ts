export function canBeHit (object): object is IHittable {
    return (object as IHittable).hit !== undefined;
}

export default interface IHittable {
    hit(): void;
}