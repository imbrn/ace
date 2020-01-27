import { Game, Scene, Canvas, rect, circle, Circle } from "../../src";

const canvasElement = document.querySelector("#canvas") as HTMLCanvasElement;
if (!canvasElement) {
  throw new Error("No canvas element found");
}

class MovingBallScene extends Scene {
  private circle: Circle;
  private xDir: number = 0;
  private yDir: number = 0;
  private speed: number = 0;

  constructor() {
    super({ width: 1600, height: 900 });
    this.circle = circle({ x: 50, y: 50, radius: 200 });
    this.xDir = 1;
    this.yDir = 1;
    this.speed = 1;
  }

  update(elapsedTime: number): void {
    if (this.circle.area.x1 <= 0) this.xDir = 1;
    if (this.circle.area.x2 >= this.resolution.width) this.xDir = -1;
    if (this.circle.area.y1 <= 0) this.yDir = 1;
    if (this.circle.area.y2 >= this.resolution.height) this.yDir = -1;

    this.circle.area.position.x += this.xDir * this.speed * elapsedTime;
    this.circle.area.position.y += this.yDir * this.speed * elapsedTime;
  }

  draw(canvas: Canvas): void {
    canvas.fillStyle = "black";
    canvas.fill(rect({ x: 0, y: 0, width: this.resolution.width, height: this.resolution.height }));
    canvas.fillStyle = "green";
    canvas.fill(this.circle);
  }
}

const game = new Game(canvasElement);
game.currentScene = new MovingBallScene();
game.start();
