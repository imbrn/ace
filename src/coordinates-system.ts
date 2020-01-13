import { Canvas } from "./canvas";
import { Resolution } from "./resolution";

export class CoordinatesSystem {
  constructor(private _canvas: Canvas, private _resolution: Resolution) {
  }

  convertResolutionToVirtualWidth(resolutionWidth: number): number {
    return resolutionWidth / this._resolution.width * this.virtualWidth;
  }

  convertResolutionToVirtualHeight(resolutionHeight: number): number {
    return resolutionHeight / this._resolution.height * this.virtualHeight;
  }

  convertRealToResolutionX(realX: number): number {
    return this.convertVirtualToResolutionX(this.convertRealToVirtualX(realX));
  }

  convertRealToResolutionY(realY: number): number {
    return this.convertVirtualToResolutionY(this.convertRealToVirtualY(realY));
  }

  convertResolutionToVirtualX(resolutionX: number): number {
    return resolutionX / this._resolution.width * this.virtualWidth + this.virtualX;
  }

  convertResolutionToVirtualY(resolutionY: number): number {
    return resolutionY / this._resolution.height * this.virtualHeight + this.virtualY;
  }

  convertVirtualToResolutionX(virtualX: number): number {
    return virtualX / this.virtualWidth * this._resolution.width;
  }

  convertVirtualToResolutionY(virtualY: number): number {
    return virtualY / this.virtualHeight * this._resolution.height;
  }

  convertRealToVirtualX(realX: number): number {
    return (realX - this.virtualX);
  }

  convertRealToVirtualY(realY: number): number {
    return (realY - this.virtualY);
  }

  convertVirtualToRealX(virtualX: number): number {
    return virtualX * this.virtualWidth + this.virtualX;
  }

  convertVirtualToRealY(virtualY: number): number {
    return virtualY * this.virtualHeight + this.virtualY;
  }

  get virtualWidth(): number {
    return Math.min(this.originalHeight * this.proportion, this.originalWidth);
  }

  get virtualHeight(): number {
    return Math.min(this.originalWidth / this.proportion, this.originalHeight);
  }

  get virtualX(): number {
    return this.originalWidth / 2 - this.virtualWidth / 2;
  }

  get virtualY(): number {
    return this.originalHeight / 2 - this.virtualHeight / 2;
  }

  get originalWidth(): number {
    return this._canvas.originalWidth;
  }

  get originalHeight(): number {
    return this._canvas.originalHeight;
  }

  private get proportion(): number {
    return this._resolution.width / this._resolution.height;
  }
}
