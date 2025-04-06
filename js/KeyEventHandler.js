var KEY;
(function (KEY) {
    KEY["UP"] = "w";
    KEY["DOWN"] = "s";
    KEY["LEFT"] = "a";
    KEY["RIGHT"] = "d";
    KEY["SHOOT"] = " ";
})(KEY || (KEY = {}));
export default class KeyEventHandler {
    constructor() {
        this._keyState = new Array();
        window.addEventListener("keydown", this.keyEvent.bind(this));
        window.addEventListener("keyup", this.keyEvent.bind(this));
    }
    keyEvent(event) {
        if (event.repeat)
            return;
        this._keyState[event.key] = (event.type == "keydown");
    }
    update(player) {
        player.velocity.x = 0;
        player.velocity.y = 0;
        if (this._keyState[KEY.UP])
            player.velocity.y = -1;
        else if (this._keyState[KEY.DOWN])
            player.velocity.y = 1;
        if (this._keyState[KEY.LEFT])
            player.velocity.x = -1;
        else if (this._keyState[KEY.RIGHT])
            player.velocity.x = 1;
        player.velocity.normalize().scale(player.speed);
        if (this._keyState[KEY.SHOOT]) {
            player.autofire();
        }
    }
}
//# sourceMappingURL=KeyEventHandler.js.map