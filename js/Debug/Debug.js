import Game from "./../Game.js";
export default function Debug(msg) {
    if (Game.debugActive) {
        console.log(msg);
    }
}
//# sourceMappingURL=Debug.js.map