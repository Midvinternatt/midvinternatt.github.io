export function canBeHit (object: any): object is IHittable {
    return (object as IHittable).hit !== undefined;
}

export default interface IHittable {
    hit(): void;
}