import { CoordinatesSystem } from "./coordinates-system";

export interface CanvasDrawing {
  fill(canvas: Canvas): void;
}

export class Canvas {
  private _context: CanvasRenderingContext2D;
  private _coordinatesSystem: CoordinatesSystem | undefined;

  constructor(private _htmlCanvas: HTMLCanvasElement) {
    const context = _htmlCanvas.getContext("2d");
    if (!context) {
      throw new Error("Error while getting 2D context of the canvas");
    }
    this._context = context;
  }

  clearScreen(): void {
    this._context.fillStyle = "white";
    this._context.fillRect(0, 0, this._htmlCanvas.width, this._htmlCanvas.height);
  }

  set fillStyle(style: string) {
    this._context.fillStyle = style;
  }

  fill(drawing: CanvasDrawing): void {
    drawing.fill(this);
  }

  getVirtualX(resolutionX: number): number {
    return this.coordinatesSystem.convertResolutionToVirtualX(resolutionX);
  }

  getVirtualY(resolutionY: number): number {
    return this.coordinatesSystem.convertResolutionToVirtualY(resolutionY);
  }

  getVirtualWidth(resolutionWidth: number): number {
    return this.coordinatesSystem.convertResolutionToVirtualWidth(resolutionWidth);
  }

  getVirtualHeight(resolutionHeight: number): number {
    return this.coordinatesSystem.convertResolutionToVirtualHeight(resolutionHeight);
  }

  get context(): CanvasRenderingContext2D {
    return this._context;
  }

  get coordinatesSystem(): CoordinatesSystem {
    if (!this._coordinatesSystem) {
      throw new Error("Coordinates system not defined");
    }
    return this._coordinatesSystem;
  }

  set coordinatesSystem(system) {
    this._coordinatesSystem = system;
  }

  get originalWidth(): number {
    return this._htmlCanvas.width;
  }

  get originalHeight(): number {
    return this._htmlCanvas.height;
  }

  get htmlCanvas(): HTMLCanvasElement {
    return this._htmlCanvas;
  }
}

export type EventCallback<E> = (event: E) => void;
export type EventConstructor<E> = new (canvas: Canvas, event: Event) => E;

export abstract class CanvasEventListener<E> {
  private _eventCallback: EventCallback<E> = () => {};

  constructor(private _canvas: Canvas, eventName: string, eventConstructor: EventConstructor<E>) {
    this._canvas.htmlCanvas.addEventListener(eventName, (event: Event) => {
      this._eventCallback(new eventConstructor(_canvas, event));
    });
  }

  on(callback: EventCallback<E>): void {
    this._eventCallback = callback;
  }
  
  protected get canvas(): Canvas {
    return this._canvas;
  }
}
