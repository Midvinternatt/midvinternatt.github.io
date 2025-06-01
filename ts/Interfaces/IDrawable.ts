import Renderer from "../Renderer.js";
import Sprite from "../Sprite.js";

export default interface IDrawable {
    width: number;
    height: number;
    sprite: Sprite;
    draw(renderer: Renderer): void;
}