import Assets from "./Assets.js";
import Debug from "./Debug.js";
export default class Sprite {
    image;
    width;
    height;
    animations;
    currentAnimation;
    currentAnimationFrameIndex;
    currentAnimationElapsed;
    // constructor(image: HTMLImageElement, width: number, height: number, animations: Record<string, SpriteAnimation>, defaultAnimation?: string) {
    constructor(data, defaultAnimation) {
        this.image = Assets.getImage(data.imagePath);
        this.width = data.width;
        this.height = data.height;
        this.animations = new Map(Object.entries(data.animations));
        if (defaultAnimation)
            this.playAnimation(defaultAnimation);
        Debug("Sprite(): Created sprite from " + this.image.src);
    }
    playAnimation(animation) {
        if (!this.animations.get(animation))
            throw new Error(`Attempted to play non-existant animation '${animation}'`);
        this.currentAnimation = this.animations.get(animation);
        this.currentAnimationFrameIndex = 0;
        this.currentAnimationElapsed = 0;
    }
    update() {
        if (!this.currentAnimation)
            throw new Error("Attempted to update sprite with undefined animation");
        if (!this.currentAnimation.loop)
            return;
        if (this.currentAnimationElapsed++ >= this.currentAnimation.frameDuration) {
            this.currentAnimationFrameIndex = (this.currentAnimationFrameIndex + 1) % this.currentAnimation.frameCount;
            this.currentAnimationElapsed = 0;
        }
    }
    draw(layer, renderer, x, y) {
        if (!this.currentAnimation)
            throw new Error("Attempted to draw sprite with undefined animation");
        renderer.drawSprite(layer, this.image, x, y, this.currentAnimationFrameIndex, this.width, this.height, this.currentAnimation.row);
    }
    static async LoadResources() {
        const promises = spriteSheet.map(async (sprite) => {
            const img = new Image();
            img.src = sprite.file;
            const bitmap = await createImageBitmap(img, sprite.x ?? 0, sprite.y ?? 0, sprite.w, sprite.h);
            return ({ sprite, bitmap });
        });
        const resolves = await Promise.all(promises);
        resolves.forEach((obj) => {
            SpriteOld.spriteMap.set(obj.sprite.id, new SpriteOld(obj.bitmap));
        });
    }
}
export var SPRITE;
(function (SPRITE) {
    SPRITE[SPRITE["PLAYER_SHIP"] = 0] = "PLAYER_SHIP";
    SPRITE[SPRITE["PLAYER_SHIP2"] = 1] = "PLAYER_SHIP2";
    SPRITE[SPRITE["PLAYER_SHIP3"] = 2] = "PLAYER_SHIP3";
    SPRITE[SPRITE["PLAYER_SHIP4"] = 3] = "PLAYER_SHIP4";
    SPRITE[SPRITE["DRONE"] = 4] = "DRONE";
})(SPRITE || (SPRITE = {}));
const spriteSheet = [
    { id: SPRITE.PLAYER_SHIP, file: "ship.png", w: 64, h: 64 },
    { id: SPRITE.PLAYER_SHIP2, file: "ship22.png", w: 64, h: 64 },
    { id: SPRITE.PLAYER_SHIP3, file: "ship33.png", w: 64, h: 64 },
    { id: SPRITE.PLAYER_SHIP4, file: "ship44.png", w: 64, h: 64 },
    { id: SPRITE.DRONE, file: "1.png", w: 100, h: 100 }
];
/*
    Spara en collision ImageData för varje sprite
*/
export class SpriteOld {
    bitmap;
    static spriteMap = new Map();
    constructor(bitmap) {
        this.bitmap = bitmap;
    }
    static async LoadSprites() {
        const promises = spriteSheet.map(async (sprite) => {
            const img = new Image();
            img.src = sprite.file;
            const bitmap = await createImageBitmap(img, sprite.x ?? 0, sprite.y ?? 0, sprite.w, sprite.h);
            return ({ sprite, bitmap });
        });
        const resolves = await Promise.all(promises);
        resolves.forEach((obj) => {
            SpriteOld.spriteMap.set(obj.sprite.id, new SpriteOld(obj.bitmap));
        });
    }
    static getSprite(sprite) {
        return this.spriteMap.get(sprite);
    }
}
//# sourceMappingURL=Sprite.js.map