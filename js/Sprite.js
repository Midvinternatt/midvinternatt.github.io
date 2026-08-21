import AssetsLoader from "./assets/AssetsLoader.js";
export default class Sprite {
    #image;
    #width;
    #height;
    #animations;
    #currentAnimation;
    #currentAnimationFrameIndex;
    #currentAnimationElapsed;
    constructor(data) {
        this.#image = AssetsLoader.getImage(data.image);
        this.#width = data.width;
        this.#height = data.height;
        this.#animations = data.animations;
        this.#currentAnimation = data.animations[data.defaultAnimation];
        this.#currentAnimationFrameIndex = 0;
        this.#currentAnimationElapsed = 0;
        console.log(`Created sprite from ${this.#image.src}`);
    }
    playAnimation(animation) {
        if (!this.#animations[animation])
            throw new Error(`Attempted to play non-existant animation '${animation}'`);
        this.#currentAnimation = this.#animations[animation];
        this.#currentAnimationFrameIndex = 0;
        this.#currentAnimationElapsed = 0;
    }
    update() {
        if (!this.#currentAnimation)
            throw new Error("Attempted to update sprite with undefined animation");
        if (!this.#currentAnimation.loop)
            return;
        if (this.#currentAnimationElapsed++ >= this.#currentAnimation.frameDuration) {
            this.#currentAnimationFrameIndex = (this.#currentAnimationFrameIndex + 1) % this.#currentAnimation.frameCount;
            this.#currentAnimationElapsed = 0;
        }
    }
    draw({ layer, renderer, x, y }) {
        if (!this.#currentAnimation)
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
//# sourceMappingURL=Sprite.js.map