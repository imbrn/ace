import { Canvas } from "./canvas";
import { GameLoopProcess, GameLoop } from "./game-loop";
import { Scene } from "./scene";

export class Game implements GameLoopProcess {
  private _currentScene: Scene | undefined;
  private _loop: GameLoop;

  constructor(private _htmlCanvas: HTMLCanvasElement) {
    this._loop = new GameLoop(this);
    this._htmlCanvas.tabIndex = 0;
    this._htmlCanvas.focus();
  }

  start(): void {
    this._loop.start();
  }

  processLoop(elapsedTime: number): void {
    this.currentScene.update(elapsedTime);
    this.currentScene.clearScreen();
    this.currentScene.draw();
  }

  get currentScene(): Scene {
    if (!this._currentScene) {
      throw new Error("There is no scene");
    }
    return this._currentScene;
  }

  set currentScene(scene: Scene) {
    this._currentScene = scene;
    this._currentScene.canvas = new Canvas(this._htmlCanvas);
  }
}
