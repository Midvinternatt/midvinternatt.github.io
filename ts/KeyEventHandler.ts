export enum KEY {
    UP = "w",
    DOWN = "s",
    LEFT = "a",
    RIGHT = "d",
    SHOOT = " ",
    PAUSE = "p"
}

export default class KeyEventHandler {
    // private _keyState: boolean[];
    private pressedKeyes: Set<string>;

    constructor() {
        this.pressedKeyes = new Set();
        // this._keyState = new Array();
        window.addEventListener("keydown", this.keyEvent.bind(this));
        window.addEventListener("keyup", this.keyEvent.bind(this));
    }
    keyEvent(event: KeyboardEvent): void {
        if(event.repeat)
            return;
        
        (event.type == "keydown") ? this.pressedKeyes.add(event.key) : this.pressedKeyes.delete(event.key);
        // this._keyState[event.key] = (event.type == "keydown");
    }
    isKeyPressed(key: KEY) {
        return this.pressedKeyes.has(key);
    }
    reset() {
        this.pressedKeyes.clear();
    }
}