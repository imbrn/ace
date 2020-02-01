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
    return buildShader(gl, gl.VERTEX_SHADER, `
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

export interface Model {
  draw(gl: WebGLRenderingContext, vertexShader: WebGLShader): void;
}

export abstract class MaterializableModel {
  private _programs: Map<Material, WebGLProgram> = new Map();

  draw(gl: WebGLRenderingContext, vertexShader: WebGLShader): void {
    for (const material of this.materials) {
      const program = this.getSavedProgram(material, gl, vertexShader);
      gl.useProgram(program);
      material.preDraw(gl, program, this);
      material.draw(gl, program, this);
    }
  }

  private getSavedProgram(material: Material, gl: WebGLRenderingContext, vertexShader: WebGLShader): WebGLProgram {
    let program = this._programs.get(material);
    if (!program) {
      program = getSafe(material.createProgram(gl, vertexShader));
      material.initProgram(gl, program);
      this._programs.set(material, program);
    }
    return program;
  }

  abstract get materials(): Array<Material>;

  abstract get fillPositions(): Array<number>;
  abstract get strokePositions(): Array<number>;
}

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

export interface Material {
  createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader): WebGLProgram;
  initProgram(gl: WebGLRenderingContext, program: WebGLProgram): void;
  preDraw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void;
  draw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void;
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
    this._positionLocation = getAttribLocation(gl, program, "aPosition");
    this._positionsBuffer = createBuffer(gl);
  }

  preDraw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void {
    const positions = model.fillPositions;
    this._delagated.preDraw(gl, program, model);
    this._positionsLength = positions.length;
    setArrayBuffer(gl, getSafe(this._positionsBuffer), positions);
  }

  draw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void {
    drawTriangles(gl, this._positionLocation, this._positionsLength/2); 
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
    this._positionLocation = getAttribLocation(gl, program, "aPosition");
    this._positionsBuffer = createBuffer(gl);
  }

  preDraw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void {
    const positions = model.strokePositions;
    this._material.preDraw(gl, program, model);
    this._positionsLength = positions.length;
    setArrayBuffer(gl, getSafe(this._positionsBuffer), positions);
  }

  draw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void {
    lineWidth(gl, this._lineWidth);
    drawLines(gl, this._positionLocation, this._positionsLength/2); 
  }

  set material(material: Material) {
    this._material = material;
  }

  set lineWidth(width: number) {
    this._lineWidth = width;
  }
}

export abstract class BaseMaterial implements Material {
  abstract createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader): WebGLProgram;

  initProgram(gl: WebGLRenderingContext, program: WebGLProgram): void {
    // Nothing here. All configuration depends on composition of materials.
  }

  preDraw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void {
    // Nothing here. All configuration depends on composition of materials.
  }

  draw(gl: WebGLRenderingContext, program: WebGLProgram): void {
    // Nothing here. All configuration depends on composition of materials.
  }
}

export class Color extends BaseMaterial {
  static BLACK: Color = new Color(0, 0, 0, 1);
  static GREEN: Color = new Color(0, 1, 0, 1);

  constructor(private _r: number, private _g: number, private _b: number, private _a: number) {
    super();
  }

  createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader): WebGLProgram {
    return buildProgram(gl, vertexShader, buildFragmentShader(gl, `
      precision mediump float;
      void main() {
        gl_FragColor = vec4(${this._r}, ${this._g}, ${this._b}, ${this._a});
      }
    `));
  }
}

function getSafe<T>(value?: T | null): T {
  if (!value) {
    throw new Error("Value is not defined");
  }
  return value;
}

function buildShader(gl: WebGLRenderingContext, shaderType: number, source: string): WebGLShader {
  const shader = getSafe(gl.createShader(shaderType));
  gl.shaderSource(shader, source);
  gl.compileShader(shader); 
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error("Failed to compile shader: " + log);
  }
  return shader;
}

function buildFragmentShader(gl: WebGLRenderingContext, source: string): WebGLShader {
  return buildShader(gl, gl.FRAGMENT_SHADER, source);
}

function buildProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram {
  const program = getSafe(gl.createProgram());
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error("Failed to link program: " + log);
  }
  
  return program;
}

function getAttribLocation(gl: WebGLRenderingContext, program: WebGLProgram, attribName: string): number {
  return gl.getAttribLocation(program, attribName);
}

function enableVertexAttribArray(gl: WebGLRenderingContext, location: number): void {
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
}

function drawTriangles(gl: WebGLRenderingContext, location: number, count: number): void {
  enableVertexAttribArray(gl, location);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, count);
}

function drawLines(gl: WebGLRenderingContext, location: number, count: number): void {
  enableVertexAttribArray(gl, location);
  gl.drawArrays(gl.LINE_LOOP, 0, count);
}

function createBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  return getSafe(gl.createBuffer());
}

function bindArrayBuffer(gl: WebGLRenderingContext, buffer: WebGLBuffer): void {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
}

function setArrayBuffer(gl: WebGLRenderingContext, buffer: WebGLBuffer, data: Array<number>): void {
  bindArrayBuffer(gl, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(data), gl.STATIC_DRAW);
}

// TODO: replace this by a more appropriate technique for drawing line width
function lineWidth(gl: WebGLRenderingContext, lineWidth: number): void {
  gl.lineWidth(lineWidth);
}
