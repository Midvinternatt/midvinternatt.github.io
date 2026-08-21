const Assets = {
    images: {},
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
    sounds: {}
};
export default Assets;
//# sourceMappingURL=AssetsDefinitions.js.map