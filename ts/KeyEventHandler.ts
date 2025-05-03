export enum KEY {
    UP = "w",
    DOWN = "s",
    LEFT = "a",
    RIGHT = "d",
    SHOOT = " ",
    PAUSE = "p"
}

export default class KeyEventHandler {
    private _pressedKeyes: Set<string>;

    constructor() {
        this._pressedKeyes = new Set<string>();
        window.addEventListener("keydown", this.keyEvent.bind(this));
        window.addEventListener("keyup", this.keyEvent.bind(this));
    }
    
    isKeyPressed(key: KEY): boolean {
        return this._pressedKeyes.has(key);
    }
    /**
     * Releases all pressed keys
     */
    reset() {
        this._pressedKeyes.clear();
    }

    private keyEvent(event: KeyboardEvent) {
        if(event.repeat)
            return;
        
        if(event.type == "keydown")
            this._pressedKeyes.add(event.key);
        else
            this._pressedKeyes.delete(event.key);
    }
}