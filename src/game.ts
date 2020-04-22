import { Canvas } from "./canvas";
import { GameLoopProcess, GameLoop } from "./game-loop";
import { Scene } from "./scene";
import { rect } from "./rectangle";

export class Game implements GameLoopProcess {
  private _currentScene: Scene | undefined;
  private _loadingScene: Scene | undefined;
  private _loop: GameLoop;

  constructor(private _htmlCanvas: HTMLCanvasElement) {
    this._loop = new GameLoop(this);
    this._htmlCanvas.tabIndex = 0;
    this._htmlCanvas.focus();
    this.loadingScene = new DefaultLoadingScene();
  }

  start(): void {
    this._loop.start();
  }

  processLoop(elapsedTime: number): void {
    if (!this._currentScene || this._currentScene.isLoading()) {
      this.processLoadingLoop(elapsedTime);
    } else {
      this.processPlayingLoop(elapsedTime);
    }
  }

  private processLoadingLoop(elapsedTime: number): void {
    if (this._loadingScene) {
      this.processLoopForScene(this._loadingScene, elapsedTime);
    }
  }

  private processPlayingLoop(elapsedTime: number): void {
    this.processLoopForScene(this.currentScene, elapsedTime);
  }

  private processLoopForScene(scene: Scene, elapsedTime: number): void {
    scene.update(elapsedTime);
    scene.clearScreen();
    scene.performDraw();
  }

  get currentScene(): Scene {
    if (!this._currentScene) {
      throw new Error("There is no scene");
    }
    return this._currentScene;
  }

  set currentScene(scene: Scene) {
    this._currentScene = scene;
    this.loadScene(this._currentScene);
  }
  
  set loadingScene(scene: Scene) {
    this._loadingScene = scene;
    this.loadScene(this._loadingScene);
  }

  private loadScene(scene: Scene): void {
    scene.canvas = new Canvas(this._htmlCanvas);
    scene.load();
  }
}

class DefaultLoadingScene extends Scene {
  constructor() {
    super({ width: 1600, height: 900 });
  }

  draw(): void {
    this.canvas.fillStyle = "black";
    this.canvas.fill(rect({ x: 0, y: 0, width: this.resolution.width, height: this.resolution.height }));
  }
}
