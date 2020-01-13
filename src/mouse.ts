import { Canvas, CanvasEventListener } from "./canvas";

export class CanvasMouseEvent {
  constructor(private _canvas: Canvas, private _mouseEvent: Event) {
  }

  get x(): number {
    return this.mouseEvent.x;
  }

  get y(): number {
    return this.mouseEvent.y;
  }

  get button(): number {
    return this.mouseEvent.button;
  }

  get mouseEvent(): MouseEvent {
    return this._mouseEvent as MouseEvent;
  }
}

export class CanvasMouseClickListener extends CanvasEventListener<CanvasMouseEvent> {
  constructor(canvas: Canvas) {
    super(canvas, "click", CanvasMouseEvent);
  }
}
