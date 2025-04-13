import Sprite from "../Sprite.js";

export default interface IDrawable {
    width: number;
    height: number;
    sprite: Sprite;
    draw(context: CanvasRenderingContext2D): void;
}