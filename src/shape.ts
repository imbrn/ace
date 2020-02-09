import { Color } from "./color";
import { Material, MaterializableModel } from "./material";
import * as webgl from "./webgl";
import { getSafe } from "./utils";

export abstract class ShapeModel extends MaterializableModel {
  private _fill: Fill = new Fill(Color.BLACK);
  private _stroke: Stroke = new Stroke(Color.BLACK);

  fill(material: Material): this {
    this._fill = new Fill(material);
    return this;
  }

  stroke(material: Material): this {
    this._stroke.material = material;
    return this;
  }

  strokeWidth(width: number): this {
    this._stroke.lineWidth = width;
    return this;
  }

  get materials(): Array<Material> {
    return [ this._fill, this._stroke ];
  }
}

export class Rectangle extends ShapeModel {
  constructor(private _positions: Array<number>) {
    super();
  }

  get fillPositions(): Array<number> {
    const positions = this._positions;
    const x1 = 0, y1 = 1, x2 = 2, y2 = 3;
    return [
      positions[x1], positions[y1],
      positions[x2], positions[y1],
      positions[x2], positions[y2],
      positions[x1], positions[y1],
      positions[x2], positions[y2],
      positions[x1], positions[y2],
    ];
  }

  get strokePositions():  Array<number> {
    const positions = this._positions;
    const x1 = 0, y1 = 1, x2 = 2, y2 = 3;
    return [
      positions[x1], positions[y1],
      positions[x2], positions[y1],
      positions[x2], positions[y2],
      positions[x1], positions[y2],
    ];
  }
}

// Shape module
export class Fill implements Material {
  private _positionLocation: number = 0;
  private _positionsBuffer: WebGLBuffer | null = null;
  private _positionsLength: number = 0;

  constructor(private _delagated: Material) {
  }

  createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader): WebGLProgram {
    return this._delagated.createProgram(gl, vertexShader);
  }

  initProgram(gl: WebGLRenderingContext, program: WebGLProgram): void {
    this._positionLocation = webgl.getAttribLocation(gl, program, "aPosition");
    this._positionsBuffer = webgl.createBuffer(gl);
  }

  preDraw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void {
    const positions = model.fillPositions;
    this._delagated.preDraw(gl, program, model);
    this._positionsLength = positions.length;
    webgl.setArrayBuffer(gl, getSafe(this._positionsBuffer), positions);
  }

  draw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void {
    webgl.drawTriangles(gl, this._positionLocation, this._positionsLength/2); 
  }
}

// Shape module
export class Stroke implements Material {
  private _positionLocation: number = 0;
  private _positionsBuffer: WebGLBuffer | null = null;
  private _positionsLength: number = 0;
  private _material: Material;
  private _lineWidth: number = 1;

  constructor(material: Material = Color.BLACK) {
    this._material = material;
  }

  createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader): WebGLProgram {
    return this._material.createProgram(gl, vertexShader);
  }

  initProgram(gl: WebGLRenderingContext, program: WebGLProgram): void {
    this._positionLocation = webgl.getAttribLocation(gl, program, "aPosition");
    this._positionsBuffer = webgl.createBuffer(gl);
  }

  preDraw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void {
    const positions = model.strokePositions;
    this._material.preDraw(gl, program, model);
    this._positionsLength = positions.length;
    webgl.setArrayBuffer(gl, getSafe(this._positionsBuffer), positions);
  }

  draw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void {
    webgl.lineWidth(gl, this._lineWidth);
    webgl.drawLines(gl, this._positionLocation, this._positionsLength/2); 
  }

  set material(material: Material) {
    this._material = material;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
  }
}
