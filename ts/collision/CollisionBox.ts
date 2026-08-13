import { Collidable } from "./ICollidable.js";
import Rectangle from "./../Rectangle.js";

export default class CollisionBox extends Rectangle {
    private _owner: Collidable;

    get x(): number {
        return this._owner.position.x;
    }
    get y(): number {
        return this._owner.position.y;
    }
    
    constructor({owner, width, height}: {owner: Collidable, width: number, height: number}) {
        super(width, height);
        this._owner = owner;
    }}

*/