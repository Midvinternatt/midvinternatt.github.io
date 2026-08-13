import Game from "../Game.js";
import KEY from "../Input/Key.js";
import GameScene from "./../GameScene.js";

export default class DebugOverlay {
    static visible: boolean = false;

    static init() {
        Game.keyEventHandler.onPressed(KEY.DEBUG, () => {
            document.querySelector("#debug-sidebar")!.classList.toggle('open');
            this.visible = !this.visible;
        })
    }

    static update(scene: GameScene) {
        if(this.visible) {
            document.querySelector("#debug-time")!.textContent = Game.time.toString();
            document.querySelector("#debug-position")!.textContent = `${(scene.player.position.x|0).toString()}, ${(scene.player.position.y|0).toString()}`;
            document.querySelector("#debug-projectiles")!.textContent = scene.projectiles.length.toString();
            if(scene.level)
                document.querySelector("#debug-leveltime")!.textContent = scene.level.time.toString();
        }
    }
}