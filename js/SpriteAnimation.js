export default class SpriteAnimation {
    frames;
    frameRate;
    tick;
    currentFrame;
    constructor(frameRate) {
        this.frames = new Array();
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.tick = 0;
    }
    addSprite(sprite) {
        this.frames.push(sprite);
    }
    getFrame() {
        return this.frames[this.currentFrame];
    }
    nextFrame() {
        this.tick++;
        if (this.tick > this.frameRate) {
            this.currentFrame++;
            this.tick = 0;
            if (this.currentFrame > 3)
                this.currentFrame = 0;
        }
    }
}
//# sourceMappingURL=SpriteAnimation.js.map