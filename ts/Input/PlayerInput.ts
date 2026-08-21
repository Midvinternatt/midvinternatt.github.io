import Game from "../Game.js";
import Vector from "../Vector.js";
import KEY from "./Key.js";

export default class PlayerInput {
    static getMovement(): Vector {
        let x = 0, y = 0;

        if(Game.keyEventHandler.isKeyPressed(KEY.UP))
            y -= 1;
        if(Game.keyEventHandler.isKeyPressed(KEY.DOWN)) 
            y += 1;
        if(Game.keyEventHandler.isKeyPressed(KEY.LEFT))
            x -= 1;
        if(Game.keyEventHandler.isKeyPressed(KEY.RIGHT)) 
            x += 1;

        return new Vector(x, y);
    }

    static isShooting(): boolean {
        return Game.keyEventHandler.isKeyPressed(KEY.SHOOT);
    }
}