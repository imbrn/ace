import { BaseMaterial } from "./material";
import * as webgl from "./webgl";

export class Color extends BaseMaterial {
  static BLACK: Color = new Color(0, 0, 0, 1);
  static GREEN: Color = new Color(0, 1, 0, 1);
  static BLUE: Color = new Color(0, 0, 1, 1);

  constructor(private _r: number, private _g: number, private _b: number, private _a: number) {
    super();
  }

  createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader): WebGLProgram {
    return webgl.buildProgram(gl, vertexShader, webgl.buildFragmentShader(gl, `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(${this._r}, ${this._g}, ${this._b}, ${this._a});
      }
    `));
  }
}
