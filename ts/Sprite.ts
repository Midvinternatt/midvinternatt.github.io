export enum SPRITE_TYPE {
    PLAYER_SHIP = "ship.png"
}
export default class Sprite {
    static imageBitmapList: Map<SPRITE_TYPE, ImageBitmap> = new Map();

    static LoadSprites() {
        let el = <HTMLImageElement> document.getElementById("ship");
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