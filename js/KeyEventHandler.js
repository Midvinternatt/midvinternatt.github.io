export var KEY;
(function (KEY) {
    KEY["UP"] = "w";
    KEY["DOWN"] = "s";
    KEY["LEFT"] = "a";
    KEY["RIGHT"] = "d";
    KEY["SHOOT"] = " ";
    KEY["PAUSE"] = "p";
})(KEY || (KEY = {}));
export default class KeyEventHandler {
    constructor() {
        // private _keyState: boolean[];
        this.pressedKeyes = new Set();
        this.pressedKeyes = new Set();
        // this._keyState = new Array();
        window.addEventListener("keydown", this.keyEvent.bind(this));
        window.addEventListener("keyup", this.keyEvent.bind(this));
    }
    keyEvent(event) {
        if (event.repeat)
            return;
        (event.type == "keydown") ? this.pressedKeyes.add(event.key) : this.pressedKeyes.delete(event.key);
        // this._keyState[event.key] = (event.type == "keydown");
    }
    isKeyPressed(key) {
        return this.pressedKeyes.has(key);
    }
    reset() {
        this.pressedKeyes.clear();
    }
}
//# sourceMappingURL=KeyEventHandler.js.map