import { getSafe } from "./utils";

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

export interface Material {
  createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader): WebGLProgram;
  initProgram(gl: WebGLRenderingContext, program: WebGLProgram): void;
  preDraw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void;
  draw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void;
}

export abstract class BaseMaterial implements Material {
  abstract createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader): WebGLProgram;

  initProgram(gl: WebGLRenderingContext, program: WebGLProgram): void {
  }

  preDraw(gl: WebGLRenderingContext, program: WebGLProgram, model: MaterializableModel): void {
  }

  draw(gl: WebGLRenderingContext, program: WebGLProgram): void {
  }
}
