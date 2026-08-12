import Game from "../Game.js";
import Vector from "../Vector.js";
import KEY from "./Key.js";
export default class PlayerInput {
    static getMovement() {
        let direction = new Vector();
        if (Game.keyEventHandler.isKeyPressed(KEY.UP))
            direction.y -= 1;
        if (Game.keyEventHandler.isKeyPressed(KEY.DOWN))
            direction.y += 1;
        if (Game.keyEventHandler.isKeyPressed(KEY.LEFT))
            direction.x -= 1;
        if (Game.keyEventHandler.isKeyPressed(KEY.RIGHT))
            direction.x += 1;
        return direction;
    }
    static isShooting() {
        return Game.keyEventHandler.isKeyPressed(KEY.SHOOT);
    }
}
//# sourceMappingURL=PlayerInput.js.map