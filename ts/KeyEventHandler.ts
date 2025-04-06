import Player from "./Player.js";

enum KEY {
    UP = "w",
    DOWN = "s",
    LEFT = "a",
    RIGHT = "d",
    SHOOT = " "
}

export default class KeyEventHandler {
    private _keyState: boolean[];

    constructor() {
        this._keyState = new Array();
        window.addEventListener("keydown", this.keyEvent.bind(this));
        window.addEventListener("keyup", this.keyEvent.bind(this));
    }
    keyEvent(event: KeyboardEvent): void {
        if(event.repeat)
            return;
        
        this._keyState[event.key] = (event.type == "keydown");
    }
    update(player: Player) {
        player.velocity.x = 0;
        player.velocity.y = 0;

        if(this._keyState[KEY.UP])
            player.velocity.y = -1;
        else if(this._keyState[KEY.DOWN]) 
            player.velocity.y = 1;
        if(this._keyState[KEY.LEFT])
            player.velocity.x = -1;
        else if(this._keyState[KEY.RIGHT]) 
            player.velocity.x = 1;

        player.velocity.normalize().scale(player.speed);

        if(this._keyState[KEY.SHOOT]) {
            player.autofire();
        }
    }
}