import { Game } from "../../src/game";
import { Scene } from "../../src/scene";
import { rect } from "../../src/rectangle";
import { Loadable } from "../../src/loadable";
import { MockedLoadable } from "../test-utils";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("No canvas");
}

class MyGameScene extends Scene {
  private loadableOne: Loadable;
  private loadableTwo: Loadable;

  constructor() {
    super({ width: 1600, height: 900 });
    this.loadableOne = new MockedLoadable(2000, "error");
    this.loadableTwo = new MockedLoadable(4000);
  }

  draw(): void {
    if (this.isLoadingInitialLoadables) {
      this.canvas.fillStyle = "red";
    } else {
      this.canvas.fillStyle = "green";
    }
    this.canvas.fill(rect({ x: 0, y: 0, width: 1600, height: 900 }));
  }
}

const game = new Game(canvas);
game.currentScene = new MyGameScene();
game.start();
