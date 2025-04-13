var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var SPRITE;
(function (SPRITE) {
    SPRITE[SPRITE["PLAYER_SHIP"] = 0] = "PLAYER_SHIP";
    SPRITE[SPRITE["DRONE"] = 1] = "DRONE";
})(SPRITE || (SPRITE = {}));
const spriteSheet = [
    { id: SPRITE.PLAYER_SHIP, file: "ship.png", w: 100, h: 100 },
    { id: SPRITE.DRONE, file: "1.png", w: 100, h: 100 }
];
class Sprite {
    constructor(bitmap) {
        this.bitmap = bitmap;
    }
    static LoadSprites() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = spriteSheet.map((sprite) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                const img = new Image();
                img.src = sprite.file;
                const bitmap = yield createImageBitmap(img, (_a = sprite.x) !== null && _a !== void 0 ? _a : 0, (_b = sprite.y) !== null && _b !== void 0 ? _b : 0, sprite.w, sprite.h);
                return ({ sprite, bitmap });
            }));
            const resolves = yield Promise.all(promises);
            resolves.forEach((obj) => {
                Sprite.spriteMap.set(obj.sprite.id, new Sprite(obj.bitmap));
            });
        });
    }
    static getSprite(sprite) {
        return this.spriteMap.get(sprite);
    }
}
Sprite.spriteMap = new Map();
export default Sprite;
//# sourceMappingURL=Sprite.js.map