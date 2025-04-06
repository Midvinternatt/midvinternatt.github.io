export var SPRITE_TYPE;
(function (SPRITE_TYPE) {
    SPRITE_TYPE["PLAYER_SHIP"] = "ship.png";
})(SPRITE_TYPE || (SPRITE_TYPE = {}));
class Sprite {
    static LoadSprites() {
        let el = document.getElementById("ship");
        createImageBitmap(el).then((bitmap) => {
            this.imageBitmapList.set(SPRITE_TYPE.PLAYER_SHIP, bitmap);
        });
        // this.imageBitmapList.set(SPRITE.PLAYER_SHIP, value);
        // let p = new Promise(() => {
        //     let el = <HTMLImageElement> document.getElementById("ship");
        //     return createImageBitmap(el);
        // }).then((value) => {
        //     // this.imageBitmapList.set(SPRITE.PLAYER_SHIP, value);
        // });
    }
}
Sprite.imageBitmapList = new Map();
export default Sprite;
//# sourceMappingURL=Sprite.js.map