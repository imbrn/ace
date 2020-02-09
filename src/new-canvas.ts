import { Model } from "./model";
import { getSafe } from "./utils";
import * as webgl from "./webgl";

export class Canvas {
  private _htmlCanvas: HTMLCanvasElement;
  private _webgl: WebGLRenderingContext;
  private _vertexShader: WebGLShader;

  constructor(htmlCanvas: HTMLCanvasElement | null) {
    this._htmlCanvas = getSafe(htmlCanvas);
    this._webgl = getSafe(this._htmlCanvas.getContext("webgl"));
    this._vertexShader = this.createVertexShader();
  }

  private createVertexShader(): WebGLShader {
    const gl = this._webgl;
    return webgl.buildShader(gl, gl.VERTEX_SHADER, `
      attribute vec2 aPosition;
      varying vec2 vPosition;
      void main() {
        gl_Position = vec4(aPosition, 0, 1);
        vPosition = aPosition;
      }
    `);
  }

  draw(model: Model): void {
    model.draw(this._webgl, this._vertexShader);
  }
}
