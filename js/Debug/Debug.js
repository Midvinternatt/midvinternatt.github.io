import Game from "./../Game.js";
export default function Debug(msg, caller) {
    if (Game.debugActive) {
        console.log(`[ThisIsHell] ${caller ? `${caller}(): ` : ""}${msg}`);
    }
}
//# sourceMappingURL=Debug.js.map