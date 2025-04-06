import Sprite from "../Sprite.js";

export default interface IDrawable {
    width: number;
    height: number;
    sprite: HTMLImageElement;
    draw(context: CanvasRenderingContext2D): void;
}