import Game from "../Game.js";
import GameScene from "../GameScene.js";
import { KEY } from "../KeyEventHandler.js";
import Button from "./Button.js";
export default class MainMenuScene {
    constructor(renderer) {
        this.buttonWidth = 400;
        this.buttonHeight = 50;
        this.renderer = renderer;
        this.buttons = new Array();
        this.selected = 0;
    }
    load() {
        const calculateX = this.renderer.screenWidth / 2 - this.buttonWidth / 2;
        this.buttons.push(new Button("Start", calculateX, 200, this.buttonWidth, this.buttonHeight, () => {
            this.unload();
            Game.activeScene = new GameScene(Game.renderer);
            Game.activeScene.load();
        }));
        this.buttons.push(new Button("", calculateX, 300, this.buttonWidth, this.buttonHeight, () => { }));
        this.buttons.push(new Button("", calculateX, 400, this.buttonWidth, this.buttonHeight, () => { }));
        this.buttons.push(new Button("", calculateX, 500, this.buttonWidth, this.buttonHeight, () => { }));
        this.buttons[0].selected = true;
    }
    update() {
        if (Game.keyEventHandler.isKeyPressed(KEY.UP)) {
            Game.keyEventHandler.reset();
            this.buttons[this.selected--].selected = false;
            if (this.selected < 0)
                this.selected = this.buttons.length - 1;
            this.buttons[this.selected].selected = true;
        }
        else if (Game.keyEventHandler.isKeyPressed(KEY.DOWN)) {
            Game.keyEventHandler.reset();
            this.buttons[this.selected++].selected = false;
            if (this.selected > this.buttons.length - 1)
                this.selected = 0;
            this.buttons[this.selected].selected = true;
        }
        else if (Game.keyEventHandler.isKeyPressed(KEY.SHOOT)) {
            Game.keyEventHandler.reset();
            this.buttons[this.selected].trigger();
        }
    }
    draw() {
        this.buttons.forEach(button => {
            button.draw(this.renderer);
        });
    }
    unload() {
    }
}
//# sourceMappingURL=MainMenuScene.js.map