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
    _pressedKeyes;
    constructor() {
        this._pressedKeyes = new Set();
        window.addEventListener("keydown", this.keyEvent.bind(this));
        window.addEventListener("keyup", this.keyEvent.bind(this));
    }
    isKeyPressed(key) {
        return this._pressedKeyes.has(key);
    }
    /**
     * Releases all pressed keys
     */
    reset() {
        this._pressedKeyes.clear();
    }
    keyEvent(event) {
        if (event.repeat)
            return;
        if (event.type == "keydown")
            this._pressedKeyes.add(event.key);
        else
            this._pressedKeyes.delete(event.key);
    }
}
//# sourceMappingURL=KeyEventHandler.js.map