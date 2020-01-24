import { Canvas } from "./canvas";
import { CoordinatesSystem } from "./coordinates-system";
import { CanvasMouseEvent, CanvasMouseClickListener } from "./mouse";
import { CanvasKeyboardEvent, CanvasKeydownEventListener } from "./keyboard";
import { Resolution } from "./resolution";

export abstract class Scene {
  private _canvas: Canvas | undefined;

  constructor(private _resolution: Resolution) {
  }

  update(elapsedTime: number): void {
    // nothing here
  }

  clearScreen(): void {
    this.getCanvas().clearScreen();
  }

  draw(canvas: Canvas): void {
    // nothing here
  }

  performDraw(): void {
    this.draw(this.getCanvas());
  }

  onClick(event: CanvasMouseEvent): void {
    // nothing here
  }

  onKeydown(event: CanvasKeyboardEvent): void {
    // nothing here
  }

  set canvas(canvas: Canvas) {
    this._canvas = canvas;
    this._canvas.coordinatesSystem = new CoordinatesSystem(this._canvas, this._resolution);
    new CanvasMouseClickListener(this.getCanvas()).on(this.onClick.bind(this));
    new CanvasKeydownEventListener(this.getCanvas()).on(this.onKeydown.bind(this));
  }

  private getCanvas(): Canvas {
    if (!this._canvas) {
      throw new Error("Canvas is no available");
    }
    return this._canvas;
  }

  get resolution(): Resolution {
    return this._resolution;
  }
}
