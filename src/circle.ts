import { Area } from "./area";
import { CanvasDrawing, Canvas } from "./canvas";
import { Model } from "./model";
import { Position } from "./position";
import { Size } from "./size";

export interface CircleData {
  x: number;
  y: number;
  radius: number;
}

export class Circle extends Model implements CanvasDrawing {
  constructor(data: CircleData) {
    super(
      new Area(
        new Position(data.x - data.radius, data.y - data.radius),
        new Size(data.radius * 2, data.radius * 2),
      ),
    );
  }

  fill(canvas: Canvas): void {
    const ctx = canvas.context;
    ctx.beginPath();
    ctx.arc(
      canvas.getVirtualX(this.area.center.x),
      canvas.getVirtualY(this.area.center.y),
      canvas.getVirtualWidth(this.radius),
      0,
      2 * Math.PI,
    );
    ctx.closePath();
    ctx.fill();
  }

  get radius(): number {
    return this.area.size.width / 2;
  }
}

export function circle(data: CircleData): Circle {
  return new Circle(data);
}
