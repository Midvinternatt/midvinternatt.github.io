import Game from "../Game.js";
import GameScene from "../GameScene.js";
import IScene from "../Interfaces/IScene.js";
import KeyEventHandler, { KEY } from "../KeyEventHandler.js";
import Renderer from "../Renderer.js";
import Button from "./Button.js";

export default class MainMenuScene implements IScene {
    renderer: Renderer;
    private buttons: Array<Button>;
    private selected: number;

    private buttonWidth: number = 400;
    private buttonHeight: number = 50;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.buttons = new Array<Button>();
        this.selected = 0;
    }

    load(): void {
        const calculateX = this.renderer.width / 2 - this.buttonWidth / 2;

        this.buttons.push(new Button("Start", calculateX, 200, this.buttonWidth, this.buttonHeight, () => {
            this.unload();
            Game.activeScene = new GameScene(Game.renderer);
            Game.activeScene.load();
        }));
        this.buttons.push(new Button("", calculateX, 300, this.buttonWidth, this.buttonHeight, () => {}));
        this.buttons.push(new Button("", calculateX, 400, this.buttonWidth, this.buttonHeight, () => {}));
        this.buttons.push(new Button("", calculateX, 500, this.buttonWidth, this.buttonHeight, () => {}));
        this.buttons[0].selected = true;
    }
    update(): void {
        if(Game.keyEventHandler.isKeyPressed(KEY.UP)) {
            Game.keyEventHandler.reset();
            this.buttons[this.selected--].selected = false;
            if(this.selected < 0)
                this.selected = this.buttons.length - 1;
            this.buttons[this.selected].selected = true;
        }
        else if(Game.keyEventHandler.isKeyPressed(KEY.DOWN)) {
            Game.keyEventHandler.reset();
            this.buttons[this.selected++].selected = false;
            if(this.selected > this.buttons.length - 1)
                this.selected = 0;
            this.buttons[this.selected].selected = true;
        }
        else if(Game.keyEventHandler.isKeyPressed(KEY.SHOOT)) {
            Game.keyEventHandler.reset();
            this.buttons[this.selected].trigger();
        }
    }
    draw(): void {
        this.buttons.forEach(button => {
            button.draw(this.renderer);
        });
    }
    unload(): void {
        
    }
}