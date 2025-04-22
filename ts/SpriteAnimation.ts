import Sprite from "./Sprite.js";

export default class SpriteAnimation {
    frames: Sprite[];
    frameRate: number;
    tick: number;
    currentFrame: number;

    constructor(frameRate: number) {
        this.frames = new Array();
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.tick = 0;
    }
    addSprite(sprite: Sprite) {
        this.frames.push(sprite);
    }
    getFrame() {
        return this.frames[this.currentFrame];
    }
    nextFrame() {
        this.tick++;
        if(this.tick > this.frameRate) {
            this.currentFrame++;
            this.tick = 0;
            if(this.currentFrame > 1)
                this.currentFrame = 0;
        }

    }
}