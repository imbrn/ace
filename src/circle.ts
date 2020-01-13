import { CanvasDrawing, Canvas } from "./canvas";

export interface CircleData {
  x: number;
  y: number;
  radius: number;
}

export class Circle implements CanvasDrawing {
  constructor(private _data: CircleData) {
  }

  fill(canvas: Canvas): void {
    const ctx = canvas.context;
    ctx.beginPath();
    ctx.arc(
      canvas.getVirtualX(this._data.x),
      canvas.getVirtualY(this._data.y),
      canvas.getVirtualWidth(this._data.radius),
      0, 2 * Math.PI);
    ctx.fill();
  }
}

export function circle(data: CircleData): Circle {
  return new Circle(data);
}
