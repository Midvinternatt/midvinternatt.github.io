import KEY from "./Key.js";
export default class KeyEventHandler {
    _pressedKeys;
    _callbacks;
    constructor() {
        this._pressedKeys = new Set();
        this._callbacks = new Map();
        window.addEventListener("keydown", this._keyPressEvent.bind(this));
        window.addEventListener("keyup", this._keyReleaseEvent.bind(this));
    }
    isKeyPressed(key) {
        return this._pressedKeys.has(key);
    }
    /**
     * Registers the callback-function to be called when key is pressed.
     * @returns KeyCallback instance for later removal
     */
    onPressed(key, callback) {
        let callbacks = this._callbacks.get(key);
        if (callbacks === undefined) {
            callbacks = new Set();
            this._callbacks.set(key, callbacks);
        }
        const keyCallback = {
            key,
            invoke: callback,
            remove: () => { this._removeCallback(keyCallback); }
        };
        callbacks.add(keyCallback);
        return keyCallback;
    }
    /**
     * Releases all pressed keys
     */
    reset() {
        this._pressedKeys.clear();
    }
    _keyPressEvent(event) {
        if (event.repeat)
            return;
        if (Object.values(KEY).includes(event.key))
            event.preventDefault();
        this._pressedKeys.add(event.key);
        const callbacks = this._callbacks.get(event.key);
        if (callbacks !== undefined) {
            for (const callback of callbacks) {
                callback.invoke();
            }
        }
    }
    _keyReleaseEvent(event) {
        if (event.repeat)
            return;
        event.preventDefault();
        this._pressedKeys.delete(event.key);
    }
    _removeCallback(callback) {
        const keyCallbacks = this._callbacks.get(callback.key);
        keyCallbacks.delete(callback);
        if (keyCallbacks.size === 0)
            this._callbacks.delete(callback.key);
    }
}
//# sourceMappingURL=KeyEventHandler.js.map