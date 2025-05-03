import Sprite from "./Sprite.js";
import KeyEventHandler from "./KeyEventHandler.js";
import Renderer from "./Renderer.js";
import MainMenuScene from "./MainMenu/MainMenuScene.js";
import IScene from "./Interfaces/IScene.js";
import GameScene from "./GameScene.js";

/* Bra länkar
    Collision: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    Game loop: https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/
    Optimering: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
                https://hacks.mozilla.org/2013/05/optimizing-your-javascript-game-for-firefox-os/
*/

export default class Game {
    static keyEventHandler: KeyEventHandler;
    static time: number;
    static maxFps: number = 60;
    static frameInterval: number = 1000 / this.maxFps;
    static previousTimeMs: number = 0;
    static activeScene: IScene;
    static renderer: Renderer;
    private isRunning: boolean = false;

    constructor(gameContainer: HTMLElement) {
        Game.keyEventHandler = new KeyEventHandler();
        Game.renderer = new Renderer(gameContainer, window.innerWidth, window.innerHeight);
        // Game.renderer = new Renderer(gameContainer, 800, 600);

        this.loadResources().then(() => {
            console.log("Successfully loaded sprites");
            this.start();
        }, () => {
            console.log("Failed to load sprites");
        });
    }

    loadResources() {
        return Promise.all([
            Sprite.LoadSprites()
            // Sound.LoadSounds()
         ]);
    }

    start() {
        Game.time = 0;
        this.isRunning = true;
        // Game.activeScene = new MainMenuScene(Game.renderer);
        // Game.activeScene.load();
        Game.activeScene = new GameScene(Game.renderer);
        Game.activeScene.load();
        this.loop();
    }

    loop() {
        requestAnimationFrame((currentTimeMs) => {
            if(document.hasFocus() || Game.keyEventHandler.reset()) {
                const deltaTimeMs = currentTimeMs - Game.previousTimeMs;
                if(deltaTimeMs >= Game.frameInterval) {
                    Game.time++;
                    Game.activeScene.update();
                    Game.previousTimeMs = currentTimeMs - (deltaTimeMs % Game.frameInterval);
                }
            }
            
            Game.activeScene.draw();
            if(this.isRunning)
                this.loop();
        });
    }

    // render() {
        // this.context.save();
        // this.context.setTransform(1, 0, 0, 1, 0, 0);
        // this.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
        // this.context.restore();

        // Game.player.draw(this.context);
        // Enemy.forEach(enemy => {
        //     enemy.draw(this.context);
        // });
        // Projectile.forEach(projectile => {
        //     projectile.draw(this.context);
        // });
    // }
}

new Game(document.getElementById("game"));