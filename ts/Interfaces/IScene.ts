import Renderer from "../Renderer.js";

export default interface IScene {
    readonly renderer: Renderer;
    load(): void;
    update(): void;
    draw(): void;
    unload(): void;
}