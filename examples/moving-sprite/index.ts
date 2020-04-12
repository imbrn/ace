import { Game, Scene, rect } from "../../src";
import { Sprite } from "../../src/sprite";
import spriteUrl from "./ace.png";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("No canvas found");
}

class MyGameScene extends Scene {
  private xDir: number = 1;
  private yDir: number = 1;
  private speed: number = 0.4;
  private sprite: Sprite;

  constructor() {
    super({ width: 1600, height: 900 });
    this.sprite = Sprite.fromUrl(spriteUrl);
  }

  update(elapsedTime: number): void {
    if (this.sprite.x >= this.resolution.width - this.sprite.width) this.xDir = -1;
    if (this.sprite.x < 0) this.xDir = 1;

    if (this.sprite.y >= this.resolution.height - this.sprite.height) this.yDir = -1;
    if (this.sprite.y < 0) this.yDir = 1;

    this.sprite.x += elapsedTime * this.speed * this.xDir;
    this.sprite.y += elapsedTime * this.speed * this.yDir;
  }

  draw(): void {
    this.canvas.fillStyle = "black";
    this.canvas.fill(rect({ x: 0, y: 0, width: 1600, height: 900 }));
    this.canvas.fill(this.sprite);
  }
}

const game = new Game(canvas);
game.currentScene = new MyGameScene();
game.start();
