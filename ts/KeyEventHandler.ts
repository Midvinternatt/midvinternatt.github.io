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
    private pressedKeyes = new Set();

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
    /*
    update(player: Player) {
        player.velocity.x = 0;
        player.velocity.y = 0;

        if(this.pressedKeyes.has(KEY.UP))
            player.velocity.y = -1;
        else if(this.pressedKeyes.has(KEY.DOWN)) 
            player.velocity.y = 1;
        if(this.pressedKeyes.has(KEY.LEFT))
            player.velocity.x = -1;
        else if(this.pressedKeyes.has(KEY.RIGHT)) 
            player.velocity.x = 1;

        // if(this.pressedKeyes.has(KEY.UP))aa
        //     player.velocity.y = -1;
        // else if(this._keyState[KEY.DOWN]) 
        //     player.velocity.y = 1;
        // if(this._keyState[KEY.LEFT])
        //     player.velocity.x = -1;
        // else if(this._keyState[KEY.RIGHT]) 
        //     player.velocity.x = 1;

        player.velocity.normalize().scale(player.speed);

        if(this._keyState[KEY.SHOOT]) {
            player.autofire();
        }
    }
    */
}