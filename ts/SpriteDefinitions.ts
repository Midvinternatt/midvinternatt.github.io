import { SpriteData } from "./Sprite.js";


export enum SpriteType {
    Player,
    Drone
}

export const SpriteDefinitions: Record<SpriteType, SpriteData> = {
    [SpriteType.Player]: {
        imagePath: "assets/ship.png",
        width: 64,
        height: 64,
        animations: {
            idle: { row: 0, frameCount: 6, frameDuration: 6, loop: true },
            side: { row: 1, frameCount: 1, frameDuration: 6, loop: true }
        }
    },
    [SpriteType.Drone]: {
        imagePath: "assets/drone.png",
        width: 64,
        height: 64,
        animations: {
            idle: { row: 0, frameCount: 10, frameDuration: 6, loop: true }
        }
    }
}