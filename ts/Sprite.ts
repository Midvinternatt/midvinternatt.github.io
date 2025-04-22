export enum SPRITE {
    PLAYER_SHIP,
    PLAYER_SHIP2,
    DRONE
}

type spritedata = {
    id: SPRITE,
    file: string,
    x?: number,
    y?: number,
    w: number,
    h: number
}

const spriteSheet: spritedata[] = [
    { id: SPRITE.PLAYER_SHIP, file: "ship.png", w: 50, h: 50 },
    { id: SPRITE.PLAYER_SHIP2, file: "ship2.png", w: 50, h: 50 },
    { id: SPRITE.DRONE, file: "1.png", w: 100, h: 100 }
];

export default class Sprite {
    static spriteMap: Map<SPRITE, Sprite> = new Map();

    constructor(public bitmap: ImageBitmap) { }

    static async LoadSprites(): Promise<void> {
        const promises = spriteSheet.map(async (sprite: spritedata) => {
            const img = new Image();
            img.src = sprite.file;
            const bitmap = await createImageBitmap(img, sprite.x ?? 0, sprite.y ?? 0, sprite.w, sprite.h);
            return ({ sprite, bitmap });
        });

        const resolves = await Promise.all(promises);
        resolves.forEach((obj) => {
            Sprite.spriteMap.set(obj.sprite.id, new Sprite(obj.bitmap));
        });
    }
    static getSprite(sprite: SPRITE): Sprite {
        return this.spriteMap.get(sprite);
    }
    // static createSprite(elementId: string, index: SPRITE): Promise<Sprite | void> {
    //     return Promise.resolve(
    //         createImageBitmap(<HTMLImageElement> document.getElementById(elementId))
    //     ).then((bitmap) => {
    //         console.log("createSprite", index, bitmap);
    //         let sprite = new Sprite(bitmap);
    //         Sprite.spriteSheet.set(index, sprite);
    //         return sprite;
    //     }, () => {});
    // }
    // static LoadSprites() {
    //     const arr = [
    //         createImageBitmap(<HTMLImageElement> document.getElementById("1")),
    //         createImageBitmap(<HTMLImageElement> document.getElementById("2")),
    //         createImageBitmap(<HTMLImageElement> document.getElementById("3")),
    //         createImageBitmap(<HTMLImageElement> document.getElementById("PLAYER_SHIP")),
    //         Sprite.createSprite("PLAYER_SHIP", SPRITE.PLAYER_SHIP)
    //      ];

    //     return Promise.all(arr).then((resolves) => {
    //         console.log("LoadSprites", resolves);
    //     });
/*
        Object.keys(SPRITE).filter((key) => {
            console.log(SPRITE[key]);
            const blob = await fetch(SPRITE[key]).then(resp => resp.ok && resp.blob());
        });

        this.inload = 0;
        document.getElementById("sprites").querySelectorAll("img").forEach((element: HTMLImageElement) => {
            console.log(element.id);
            this.inload++;
            this.tot++;
            createImageBitmap(element).then((bitmap) => {
                this.imageBitmapList.set(SPRITE.PLAYER_SHIP, bitmap);
                this.inload--;

                if(this.inload==0)
                    console.log("done " + this.tot);
                    
            });
        });

        Object.keys(SPRITE).forEach(key => {
            const blob = await fetch(SPRITE[key]).then(resp => resp.ok && resp.blob());
        });

        async function loadSprites() {
            const keys = Object.keys(Images);
            for(let i = 0; i < keys.length; i++) {
              const key = keys[i];
              // fetch as Blob
              const blob = await fetch(Spritesheets[key]).then(resp => resp.ok && resp.blob());
              const img = Images[key];
          
              for(let k = 0; k < img.width / img.spriteW; k++) {
                img[k] = await createImageBitmap(blob, k * img.spriteW, 0, img.spriteW, img.spriteH);
              };
            };
            console.log(Images)
          };
*/

        // let el = <HTMLImageElement> document.getElementById("ship");
        // createImageBitmap(el).then((bitmap) => {
        //     this.imageBitmapList.set(SPRITE.PLAYER_SHIP, bitmap);
        // });
        // this.imageBitmapList.set(SPRITE.PLAYER_SHIP, value);

        // let p = new Promise(() => {
        //     let el = <HTMLImageElement> document.getElementById("ship");
        //     return createImageBitmap(el);
        // }).then((value) => {
        //     // this.imageBitmapList.set(SPRITE.PLAYER_SHIP, value);
        // });
    // }
}