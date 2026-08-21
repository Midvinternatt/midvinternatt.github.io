import Assets, { SpriteData } from "./AssetsDefinitions.js";

export default class AssetsLoader {
    static #images = new Map<string, HTMLImageElement>();
    static #spriteData = new Map<string, SpriteData>();
    static #sounds = new Map<string, AudioBuffer>();

    static getImage(filePath: string): HTMLImageElement {
        return AssetsLoader.#images.get(filePath)!;
    }

    static getSpriteData(sprite: string): SpriteData {
        return AssetsLoader.#spriteData.get(sprite)!;
    }

    static getSound(filePath: string): AudioBuffer {
        return AssetsLoader.#sounds.get(filePath)!;
    }

    static async loadImages() {

    }
    
    static async loadSprites(): Promise<void> {
        await Promise.all(
            Object.entries(Assets.sprites).map(async ([key, spriteData]) => {
                await AssetsLoader.#loadImageFile(spriteData.image);
                AssetsLoader.#spriteData.set(key, spriteData);
            })
        );
    }

    static async loadSounds() {

    }

    static #loadImageFile(filePath: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                AssetsLoader.#images.set(filePath, img);
                resolve(img)
            };
            
            img.onerror = () => reject(`Failed to load image: ${filePath}`);
            img.src = filePath;
        });
    }
}