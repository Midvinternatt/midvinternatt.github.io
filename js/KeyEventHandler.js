/*
    TODO:
    - Hook to add callbacks, basically just a map to track custom addEventListener's
*/
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
    _pressedKeys;
    _callbacks;
    constructor() {
        this._pressedKeys = new Set();
        this._callbacks = new Set();
        window.addEventListener("keydown", this.keyEvent.bind(this));
        window.addEventListener("keyup", this.keyEvent.bind(this));
    }
    isKeyPressed(key) {
        return this._pressedKeys.has(key);
    }
    onPressed(key, callback) {
    }
    removeCallback(callback) {
        this._callbacks.delete;
    }
    /**
     * Releases all pressed keys
     */
    reset() {
        this._pressedKeys.clear();
    }
    keyEvent(event) {
        if (event.repeat)
            return;
        if (event.type == "keydown")
            this._pressedKeys.add(event.key);
        else
            this._pressedKeys.delete(event.key);
    }
}
//# sourceMappingURL=KeyEventHandler.js.map