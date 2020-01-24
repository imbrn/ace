import { Game, Scene, rect, circle } from "../../src";

const canvasElement = document.querySelector("#canvas") as HTMLCanvasElement;
if (!canvasElement) {
  throw new Error("No canvas element found");
}

class MovingBallScene extends Scene {
  private x: number = 0;
  private y: number = 0;
  private xDir: number = 0;
  private yDir: number = 0;
  private speed: number = 0;

  constructor() {
    super({ width: 1600, height: 900 });

    this.x = Math.max(Math.min(Math.random() * this.resolution.width, this.resolution.width - 50), 50);
    this.y = Math.max(Math.min(Math.random() * this.resolution.height, this.resolution.height - 50), 50);
    this.xDir = Math.random() < 0.5 ? -1 : 1;
    this.yDir = Math.random() < 0.5 ? -1 : 1;
    this.speed = Math.random() * 2;
  }

  update(elapsedTime: number): void {
    if (this.x < 50) this.xDir = 1;
    if (this.x > this.resolution.width - 50) this.xDir = -1;
    if (this.y < 50) this.yDir = 1;
    if (this.y > this.resolution.height - 50) this.yDir = -1;

    this.x += this.xDir * this.speed * elapsedTime;
    this.y += this.yDir * this.speed * elapsedTime;
  }

  draw(canvas: Canvas): void {
    canvas.fillStyle = "black";
    canvas.fill(rect({ x: 0, y: 0, width: this.resolution.width, height: this.resolution.height }));
    
    canvas.fillStyle = "green";
    canvas.fill(circle({ x: this.x, y: this.y, radius: 50 }));
  }
}

const game = new Game(canvasElement);
game.currentScene = new MovingBallScene();
game.start();
