import { Collidable } from "./Interfaces/ICollidable.js";

export default class CollisionBox {
    _owner: Collidable;
    _width: number;
    _height: number;

    /*
        Potentiellt flytta till Sprite?
    _image: ImageData;
    static _offscreenCanvas: OffscreenCanvas;
    static _offscreenContext: OffscreenCanvasRenderingContext2D;
    static {
        this._offscreenCanvas = new OffscreenCanvas(0, 0);
        this._offscreenContext = this._offscreenCanvas.getContext("2d");
    }
    static generateImageData() {

    }
    */
    constructor(owner: Collidable, image: ImageData, width: number, height: number) {
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
    checkForPreciseCollision(otherCollisionBox: CollisionBox) {

    }
}