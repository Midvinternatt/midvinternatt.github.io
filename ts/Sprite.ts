import Debug from "./Debug.js";
import Renderer, { CanvasLayer } from "./Renderer.js";

export interface Animation {
    frameCount: number,
    frameDuration: number,
    loop: boolean
}

export default class Sprite {
    private image: HTMLImageElement;
    private width: number;
    private height: number;

    private animations: Map<string, Animation>;
    private currentAnimation: Animation;
    private currentAnimationFrameIndex: number;
    private currentAnimationElapsed: number;

    constructor(image: HTMLImageElement, width: number, height: number, animations: Record<string, Animation>, defaultAnimation?: string) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.animations = new Map(Object.entries(animations));
        if(defaultAnimation)
            this.playAnimation(defaultAnimation);

        Debug("Created sprite");
    }
    playAnimation(animation: string) {
        if(!this.animations.get(animation))
            throw new Error(`Attempted to play non-existant animation '${animation}'`);

        this.currentAnimation = this.animations.get(animation);
        this.currentAnimationFrameIndex = 0;
        this.currentAnimationElapsed = 0;
        
    }
    update() {
        if(!this.currentAnimation)
            throw new Error("Attempted to update sprite with undefined animation");
        
        if(!this.currentAnimation.loop)
            return;

        
        if (this.currentAnimationElapsed++ >= this.currentAnimation.frameDuration) {
            this.currentAnimationFrameIndex = (this.currentAnimationFrameIndex + 1) % this.currentAnimation.frameCount;
            this.currentAnimationElapsed = 0;
        }
    }
    draw(layer: CanvasLayer, renderer: Renderer, x: number, y: number) {
        if(!this.currentAnimation)
            throw new Error("Attempted to draw sprite with undefined animation");

        renderer.drawSprite(layer, this.image, x, y, this.currentAnimationFrameIndex, this.width, this.height);
    }


    static async LoadResources(): Promise<void> {
        const promises = spriteSheet.map(async (sprite: spritedata) => {
            const img = new Image();
            img.src = sprite.file;
            const bitmap = await createImageBitmap(img, sprite.x ?? 0, sprite.y ?? 0, sprite.w, sprite.h);
            
            return ({ sprite, bitmap });
        });

        const resolves = await Promise.all(promises);
        resolves.forEach((obj) => {
            SpriteOld.spriteMap.set(obj.sprite.id, new SpriteOld(obj.bitmap));
        });
    }
}



export enum SPRITE {
    PLAYER_SHIP,
    PLAYER_SHIP2,
    PLAYER_SHIP3,
    PLAYER_SHIP4,
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
    { id: SPRITE.PLAYER_SHIP, file: "ship.png", w: 64, h: 64 },
    { id: SPRITE.PLAYER_SHIP2, file: "ship22.png", w: 64, h: 64 },
    { id: SPRITE.PLAYER_SHIP3, file: "ship33.png", w: 64, h: 64 },
    { id: SPRITE.PLAYER_SHIP4, file: "ship44.png", w: 64, h: 64 },
    { id: SPRITE.DRONE, file: "1.png", w: 100, h: 100 }
];

/*
    Spara en collision ImageData för varje sprite
*/
export class SpriteOld {
    static spriteMap: Map<SPRITE, SpriteOld> = new Map();

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
            SpriteOld.spriteMap.set(obj.sprite.id, new SpriteOld(obj.bitmap));
        });
    }
    static getSprite(sprite: SPRITE): SpriteOld {
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