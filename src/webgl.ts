import { getSafe } from "./utils";

export function buildShader(gl: WebGLRenderingContext, shaderType: number, source: string): WebGLShader {
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

export function buildFragmentShader(gl: WebGLRenderingContext, source: string): WebGLShader {
  return buildShader(gl, gl.FRAGMENT_SHADER, source);
}

export function buildProgram(
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

export function getAttribLocation(gl: WebGLRenderingContext, program: WebGLProgram, attribName: string): number {
  return gl.getAttribLocation(program, attribName);
}

export function enableVertexAttribArray(gl: WebGLRenderingContext, location: number): void {
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
}

export function drawTriangles(gl: WebGLRenderingContext, location: number, count: number): void {
  enableVertexAttribArray(gl, location);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, count);
}

export function drawLines(gl: WebGLRenderingContext, location: number, count: number): void {
  enableVertexAttribArray(gl, location);
  gl.drawArrays(gl.LINE_LOOP, 0, count);
}

export function createBuffer(gl: WebGLRenderingContext): WebGLBuffer {
  return getSafe(gl.createBuffer());
}

export function bindArrayBuffer(gl: WebGLRenderingContext, buffer: WebGLBuffer): void {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
}

export function setArrayBuffer(gl: WebGLRenderingContext, buffer: WebGLBuffer, data: Array<number>): void {
  bindArrayBuffer(gl, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, Float32Array.from(data), gl.STATIC_DRAW);
}

// TODO: replace this by a more appropriate technique for drawing line width
export function lineWidth(gl: WebGLRenderingContext, lineWidth: number): void {
  gl.lineWidth(lineWidth);
}
