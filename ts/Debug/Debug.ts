import Game from "./../Game.js";

export default function Debug(msg: any) {
    if(Game.debugActive) {
        console.log(msg);
    }
}