import { CanvasDrawing, Canvas } from "./canvas";

export interface RectangleData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Rectangle implements CanvasDrawing {
  constructor(private _data: RectangleData) {
  }

  fill(canvas: Canvas): void {
    canvas.context.fillRect(
      canvas.getVirtualX(this._data.x),
      canvas.getVirtualY(this._data.y),
      canvas.getVirtualWidth(this._data.width),
      canvas.getVirtualHeight(this._data.height),
    );
  }
}

export function rect(data: RectangleData): Rectangle {
  return new Rectangle(data);
}
