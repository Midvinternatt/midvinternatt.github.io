import KEY from "./Key.js";

type KeyCallback = {
    key: KEY;
    invoke: () => void;
    remove: () => void;
}

export default class KeyEventHandler {
    private _pressedKeys: Set<string>;
    private _callbacks: Map<string, Set<KeyCallback>>;

    constructor() {
        this._pressedKeys = new Set<string>();
        this._callbacks = new Map<string, Set<KeyCallback>>();

        window.addEventListener("keydown", this._keyPressEvent.bind(this));
        window.addEventListener("keyup", this._keyReleaseEvent.bind(this));
    }
    
    isKeyPressed(key: KEY): boolean {
        return this._pressedKeys.has(key);
    }
    /**
     * Registers the callback-function to be called when key is pressed.
     * @returns KeyCallback instance for later removal
     */
    onPressed(key: KEY, callback: () => void): KeyCallback {
        let callbacks = this._callbacks.get(key);

        if(callbacks===undefined) {
            callbacks = new Set<KeyCallback>();
            this._callbacks.set(key, callbacks);
        }

        const keyCallback: KeyCallback = {
            key,
            invoke: callback,
            remove: () => { this._removeCallback(keyCallback) }
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

    private _keyPressEvent(event: KeyboardEvent) {
        if(event.repeat)
            return;

        if(Object.values(KEY).includes(event.key as KEY))
            event.preventDefault();
        
        this._pressedKeys.add(event.key)

        const callbacks = this._callbacks.get(event.key);

        if(callbacks!==undefined) {
            for (const callback of callbacks) {
                callback.invoke();
            }
        }
    }
    private _keyReleaseEvent(event: KeyboardEvent) {
        if(event.repeat)
            return;
        event.preventDefault();

        this._pressedKeys.delete(event.key);
    }
    private _removeCallback(callback: KeyCallback) {
        const keyCallbacks = this._callbacks.get(callback.key)!;
        keyCallbacks.delete(callback);

        if(keyCallbacks.size===0)
            this._callbacks.delete(callback.key)
    }
}
