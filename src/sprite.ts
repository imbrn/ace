import { Canvas, CanvasDrawing } from "./canvas";

type SpriteSource =
  | HTMLImageElement
  | SVGImageElement
;

interface SpriteConstructorArgs {
  source: SpriteSource;
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Sprite implements CanvasDrawing {
  static fromUrl(url: string): Sprite {
    const source = new Image();
    source.src = url;
    return new Sprite({ source, x: 0, y: 0, width: source.width, height: source.height });
  }

  constructor(private _attribs: SpriteConstructorArgs) {
  }

  fill(canvas: Canvas): void {
    canvas.context.drawImage(
      this._attribs.source,
      canvas.getVirtualX(this.x),
      canvas.getVirtualY(this.y),
      canvas.getVirtualWidth(this.width),
      canvas.getVirtualHeight(this.height),
    );
  }

  set x(x: number) {
    this._attribs.x = x;
  }

  get x(): number {
    return this._attribs.x;
  }

  set y(y: number) {
    this._attribs.y = y;
  }

  get y(): number {
    return this._attribs.y;
  }

  set width(width: number) {
    this._attribs.width = width;
  }

  get width(): number {
    return this._attribs.width;
  }

  set heigth(height: number) {
    this._attribs.height = height;
  }

  get height(): number {
    return this._attribs.height;
  }
}
