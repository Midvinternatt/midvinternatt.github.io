import { SpriteAnimation, SpriteData } from "./assets/AssetsDefinitions.js";
import AssetsLoader from "./assets/AssetsLoader.js";
import Renderer, { CanvasLayer } from "./Renderer.js";



export default class Sprite {
    #image: HTMLImageElement;
    #width: number;
    #height: number; 

    #animations: Record<string, SpriteAnimation>;
    #currentAnimation: SpriteAnimation;
    #currentAnimationFrameIndex: number;
    #currentAnimationElapsed: number;

    constructor(data: SpriteData) {
        this.#image = AssetsLoader.getImage(data.image);
        this.#width = data.width;
        this.#height = data.height;
        this.#animations = data.animations;

        this.#currentAnimation = data.animations[data.defaultAnimation];
        this.#currentAnimationFrameIndex = 0;
        this.#currentAnimationElapsed = 0;

        console.log(`Created sprite from ${this.#image.src}`)
    }

    playAnimation(animation: string) {
        if(!this.#animations[animation])
            throw new Error(`Attempted to play non-existant animation '${animation}'`);

        this.#currentAnimation = this.#animations[animation];
        this.#currentAnimationFrameIndex = 0;
        this.#currentAnimationElapsed = 0;
    }

    update() {
        if(!this.#currentAnimation)
            throw new Error("Attempted to update sprite with undefined animation");
        
        if(!this.#currentAnimation.loop)
            return;
        
        if (this.#currentAnimationElapsed++ >= this.#currentAnimation.frameDuration) {
            this.#currentAnimationFrameIndex = (this.#currentAnimationFrameIndex + 1) % this.#currentAnimation.frameCount;
            this.#currentAnimationElapsed = 0;
        }
    }

    draw({layer, renderer, x, y}: {
        layer: CanvasLayer,
        renderer: Renderer,
        x: number,
        y: number
    }) {
        if(!this.#currentAnimation)
            throw new Error("Attempted to draw sprite with undefined animation");

        renderer.drawSprite({
            layer,
            image: this.#image,
            x,
            y,
            width: this.#width,
            height: this.#height,
            frameIndex: this.#currentAnimationFrameIndex,
            row: this.#currentAnimation.row
        });
    }
}

export enum SPRITE {
    PLAYER_SHIP,
    PLAYER_SHIP2,
    PLAYER_SHIP3,
    PLAYER_SHIP4,
    DRONE
}
type spritedata = {
    id: SPRITE,
    file: string,
    x?: number,
    y?: number,
