import { Canvas, CanvasEventListener } from "./canvas";

export class CanvasKeyboardEvent {
  constructor(private _canvas: Canvas, private _keyboardEvent: Event) {
  }

  get key(): string {
    return this.keyboardEvent.key;
  }

  get keyboardEvent(): KeyboardEvent {
    return this._keyboardEvent as KeyboardEvent;
  }
}

export class CanvasKeydownEventListener extends CanvasEventListener<CanvasKeyboardEvent> {
  constructor(canvas: Canvas) {
    super(canvas, "keydown", CanvasKeyboardEvent);
  }
}
