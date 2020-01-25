import { Area } from "./area";
import { CanvasDrawing, Canvas } from "./canvas";
import { Model } from "./model";
import { Position  } from "./position";
import { Size } from "./size";

export interface RectangleData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Rectangle extends Model implements CanvasDrawing {
  constructor(data: RectangleData) {
    super(new Area(
      new Position(data.x, data.y),
      new Size(data.width, data.height),
    ));
  }

  fill(canvas: Canvas): void {
    canvas.context.fillRect(
      canvas.getVirtualX(this.area.position.x),
      canvas.getVirtualY(this.area.position.y),
      canvas.getVirtualWidth(this.area.size.width),
      canvas.getVirtualHeight(this.area.size.height),
    );
  }
}

export function rect(data: RectangleData): Rectangle {
  return new Rectangle(data);
}
