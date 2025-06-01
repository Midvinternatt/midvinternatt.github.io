export var SpriteType;
(function (SpriteType) {
    SpriteType[SpriteType["Player"] = 0] = "Player";
    SpriteType[SpriteType["Drone"] = 1] = "Drone";
})(SpriteType || (SpriteType = {}));
export const SpriteDefinitions = {
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
};
//# sourceMappingURL=SpriteDefinitions.js.map