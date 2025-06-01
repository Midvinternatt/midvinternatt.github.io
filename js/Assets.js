import Debug from "./Debug.js";
import { SpriteDefinitions } from "./SpriteDefinitions.js";
export default class Assets {
    static images = new Map();
    static sprites = new Map();
    static loadImage(filePath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                Assets.images.set(filePath, img);
                resolve(img);
            };
            img.onerror = () => reject(`Failed to load image: ${filePath}`);
            img.src = filePath;
        });
    }
    static loadSound(filePath) {
    }
    static loadSprites() {
        // const loadPromises = Object.keys(SpriteDefinitions).map(Number).map((spriteType: SpriteType) => {
        const loadPromises = Object.entries(SpriteDefinitions).map(([key, spriteData]) => {
            const spriteType = Number(key);
            return Assets.loadImage(spriteData.imagePath).then(img => {
                Debug("Assets.loadSprites(): Loaded image " + img.src);
                return Assets.sprites.set(spriteType, spriteData);
            });
        });
        return Promise.all(loadPromises).then(() => { });
        // const promises: Array<Promise<void>> = new Array();
        // return new Promise((resolve, reject) => {
        //     const img = new Image();
        //     img.onload = () => resolve(img);
        //     img.onerror = () => reject(`Failed to load image: ${filePath}`);
        //     img.src = filePath;
        //     // const bitmap = await createImageBitmap(img, sprite.x ?? 0, sprite.y ?? 0, sprite.w, sprite.h);
        // });
    }
    static getImage(filePath) {
        return Assets.images.get(filePath);
    }
    // Byt den här till getSpriteData så att varje entity har en egen sprite, behövs om de ska ha olika animationer samtidigt
    static getSpriteData(spriteType) {
        return Assets.sprites.get(spriteType);
    }
}
//# sourceMappingURL=Assets.js.map