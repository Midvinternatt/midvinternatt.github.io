import Assets from "./AssetsDefinitions.js";
export default class AssetsLoader {
    static #images = new Map();
    static #spriteData = new Map();
    static #sounds = new Map();
    static getImage(filePath) {
        return AssetsLoader.#images.get(filePath);
    }
    static getSpriteData(sprite) {
        return AssetsLoader.#spriteData.get(sprite);
    }
    static getSound(filePath) {
        return AssetsLoader.#sounds.get(filePath);
    }
    static async loadImages() {
    }
    static async loadSprites() {
        await Promise.all(Object.entries(Assets.sprites).map(async ([key, spriteData]) => {
            await AssetsLoader.#loadImageFile(spriteData.image);
            AssetsLoader.#spriteData.set(key, spriteData);
        }));
    }
    static async loadSounds() {
    }
    static #loadImageFile(filePath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                AssetsLoader.#images.set(filePath, img);
                resolve(img);
            };
            img.onerror = () => reject(`Failed to load image: ${filePath}`);
            img.src = filePath;
        });
    }
}
//# sourceMappingURL=AssetsLoader.js.map