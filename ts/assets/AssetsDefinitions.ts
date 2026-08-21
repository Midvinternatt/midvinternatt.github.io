export type ImageData = {

}

export type SpriteAnimation = {
    row: number,
    frameCount: number,
    frameDuration: number,
    loop: boolean
};

export type SpriteData = {
    image: string;
    width: number;
    height: number;
    animations: Record<string, SpriteAnimation>,
    defaultAnimation: string
};

export type SoundData = {

}

const Assets: {
    images: Record<string, ImageData>,
    sprites: Record<string, SpriteData>,
    sounds: Record<string, SoundData>
} = {
    images: {

    },
    sprites: {
        player: {
            image: "assets/ship.png",
            width: 64,
            height: 64,
            animations: {
                idle: { row: 0, frameCount: 6, frameDuration: 6, loop: true },
                side: { row: 1, frameCount: 1, frameDuration: 6, loop: true }
            },
            defaultAnimation: "idle"
        },
        drone: {
            image: "assets/drone.png",
            width: 64,
            height: 64,
            animations: {
                idle: { row: 0, frameCount: 10, frameDuration: 6, loop: true }
            },
            defaultAnimation: "idle"
        },

        rocket: {
            image: "assets/rocket.png",
            width: 32,
            height: 32,
            animations: {
                idle: { row: 0, frameCount: 3, frameDuration: 6, loop: true }
            },
            defaultAnimation: "idle"
        }
    },
    sounds: {

    }
}

export type ImageDefinition = keyof typeof Assets.images;
export type SpriteDefinition = keyof typeof Assets.sprites;
export type SoundDefinition = keyof typeof Assets.sounds;
export default Assets