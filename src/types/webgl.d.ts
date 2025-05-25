
// Type definitions for WebGL contexts
interface WebGLRenderingContext {
  canvas: HTMLCanvasElement;
  drawingBufferWidth: number;
  drawingBufferHeight: number;
}

interface WebGL2RenderingContext {
  canvas: HTMLCanvasElement;
  drawingBufferWidth: number;
  drawingBufferHeight: number;
}

// Custom interfaces for splash-cursor.tsx
interface Material {
  vertexShader: string;
  fragmentShaderSource: string;
  programs: Program[];
  activeProgram: Program;
  uniforms: Record<string, any>;
}

interface Program {
  program: WebGLProgram;
  uniforms: Record<string, any>;
}

interface WebGLRenderingContext {
  uniform1f(location: any, x: number): void;
  uniform2f(location: any, x: number, y: number): void;
  uniform3f(location: any, x: number, y: number, z: number): void;
  texImage2D(target: number, level: number, internalformat: number, width: number, height: number, border: number, format: number, type: number, pixels: ArrayBufferView | null): void;
  texImage2D(target: number, level: number, internalformat: number, format: number, type: number, source: TexImageSource): void;
  texImage2D(target: number, level: number, internalformat: number, format: number, type: number, source: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageBitmap): void;
  createTexture(): WebGLTexture;
  bindTexture(target: number, texture: WebGLTexture | null): void;
  texParameteri(target: number, pname: number, param: number): void;
  createFramebuffer(): WebGLFramebuffer;
  bindFramebuffer(target: number, framebuffer: WebGLFramebuffer | null): void;
  framebufferTexture2D(target: number, attachment: number, textarget: number, texture: WebGLTexture | null, level: number): void;
  createProgram(): WebGLProgram;
  createShader(type: number): WebGLShader;
  shaderSource(shader: WebGLShader, source: string): void;
  compileShader(shader: WebGLShader): void;
  getShaderParameter(shader: WebGLShader, pname: number): any;
  getShaderInfoLog(shader: WebGLShader): string;
  attachShader(program: WebGLProgram, shader: WebGLShader): void;
  linkProgram(program: WebGLProgram): void;
  getProgramParameter(program: WebGLProgram, pname: number): any;
  getProgramInfoLog(program: WebGLProgram): string;
  deleteShader(shader: WebGLShader): void;
  useProgram(program: WebGLProgram | null): void;
  getUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation | null;
  getAttribLocation(program: WebGLProgram, name: string): number;
  enableVertexAttribArray(index: number): void;
  vertexAttribPointer(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number): void;
  createBuffer(): WebGLBuffer;
  bindBuffer(target: number, buffer: WebGLBuffer | null): void;
  bufferData(target: number, data: ArrayBufferView | ArrayBuffer | null, usage: number): void;
  drawArrays(mode: number, first: number, count: number): void;
  viewport(x: number, y: number, width: number, height: number): void;
  clear(mask: number): void;
}
