import Game from "./../Game.js";

export default function Debug(msg: any, caller?: string) {
    if(Game.debugActive) {
        console.log(`[ThisIsHell] ${caller?`${caller}(): `:""}${msg}`);
    }
}