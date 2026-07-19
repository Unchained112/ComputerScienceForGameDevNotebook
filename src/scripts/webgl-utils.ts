// webgl-utils.ts — 三个 graphics 深度教学页共享的 WebGL2 工具函数
// 参照 webglfundamentals 教学风格，所有函数都做错误检查并抛出可读异常

/** 编译单个着色器 */
export function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Failed to create shader object');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${info}\n--- source ---\n${source}`);
  }
  return shader;
}

/** 创建并链接着色器程序 */
export function createProgram(gl: WebGL2RenderingContext, vsSource: string, fsSource: string): WebGLProgram {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
  const program = gl.createProgram();
  if (!program) throw new Error('Failed to create program object');
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link failed: ${info}`);
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  return program;
}

/** 创建并填充缓冲 */
export function createBuffer(gl: WebGL2RenderingContext, data: BufferSource, target: number = gl.ARRAY_BUFFER): WebGLBuffer {
  const buf = gl.createBuffer();
  if (!buf) throw new Error('Failed to create buffer');
  gl.bindBuffer(target, buf);
  gl.bufferData(target, data, gl.STATIC_DRAW);
  return buf;
}

/** 创建 VAO（WebGL2 原生） */
export function createVAO(gl: WebGL2RenderingContext): WebGLVertexArrayObject {
  const vao = gl.createVertexArray();
  if (!vao) throw new Error('Failed to create VAO');
  return vao;
}

/** canvas 尺寸适配显示尺寸（含 devicePixelRatio） */
export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.floor(canvas.clientWidth * dpr);
  const h = Math.floor(canvas.clientHeight * dpr);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
    return true;
  }
  return false;
}

/** 创建 2D 纹理（用于 G-Buffer RT） */
export function createTexture(
  gl: WebGL2RenderingContext,
  width: number,
  height: number,
  internalFormat: number = gl.RGBA8,
  format: number = gl.RGBA,
  type: number = gl.UNSIGNED_BYTE
): WebGLTexture {
  const tex = gl.createTexture();
  if (!tex) throw new Error('Failed to create texture');
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

/** 创建带多个颜色附件的 framebuffer（MRT 延迟渲染用） */
export function createFramebuffer(gl: WebGL2RenderingContext, textures: WebGLTexture[]): WebGLFramebuffer {
  const fb = gl.createFramebuffer();
  if (!fb) throw new Error('Failed to create framebuffer');
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  const drawBuffers: number[] = [];
  textures.forEach((tex, i) => {
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, tex, 0);
    drawBuffers.push(gl.COLOR_ATTACHMENT0 + i);
  });
  gl.drawBuffers(drawBuffers);
  if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    throw new Error(`Framebuffer incomplete: ${gl.checkFramebufferStatus(gl.FRAMEBUFFER)}`);
  }
  return fb;
}

/** 创建深度渲染缓冲 */
export function createDepthBuffer(gl: WebGL2RenderingContext, width: number, height: number): WebGLRenderbuffer {
  const rb = gl.createRenderbuffer();
  if (!rb) throw new Error('Failed to create renderbuffer');
  gl.bindRenderbuffer(gl.RENDERBUFFER, rb);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, width, height);
  return rb;
}

/** 获取 WebGL2 上下文，失败返回 null */
export function getWebGL2Context(canvas: HTMLCanvasElement): WebGL2RenderingContext | null {
  const gl = canvas.getContext('webgl2');
  if (!gl) return null;
  return gl;
}

/** 单位矩阵（4x4，列主序） */
export function identity(): number[] {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

/** 矩阵乘法（4x4 列主序） */
export function multiply(a: number[], b: number[]): number[] {
  const out = new Array(16);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      out[i * 4 + j] =
        a[0 * 4 + j] * b[i * 4 + 0] +
        a[1 * 4 + j] * b[i * 4 + 1] +
        a[2 * 4 + j] * b[i * 4 + 2] +
        a[3 * 4 + j] * b[i * 4 + 3];
    }
  }
  return out;
}

/** 透视投影矩阵 */
export function perspective(fovy: number, aspect: number, near: number, far: number): number[] {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  return [
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0,
  ];
}

/** 平移矩阵 */
export function translation(tx: number, ty: number, tz: number): number[] {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1];
}

/** 绕 Y 轴旋转 */
export function rotationY(angle: number): number[] {
  const c = Math.cos(angle), s = Math.sin(angle);
  return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
}

/** 缩放矩阵 */
export function scaling(sx: number, sy: number, sz: number): number[] {
  return [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
}

/** 简单立方体顶点（位置+法线，24 顶点，36 索引） */
export const CUBE_VERTICES = new Float32Array([
  // front
  -1, -1, 1, 0, 0, 1,
  1, -1, 1, 0, 0, 1,
  1, 1, 1, 0, 0, 1,
  -1, 1, 1, 0, 0, 1,
  // back
  -1, -1, -1, 0, 0, -1,
  -1, 1, -1, 0, 0, -1,
  1, 1, -1, 0, 0, -1,
  1, -1, -1, 0, 0, -1,
  // top
  -1, 1, -1, 0, 1, 0,
  -1, 1, 1, 0, 1, 0,
  1, 1, 1, 0, 1, 0,
  1, 1, -1, 0, 1, 0,
  // bottom
  -1, -1, -1, 0, -1, 0,
  1, -1, -1, 0, -1, 0,
  1, -1, 1, 0, -1, 0,
  -1, -1, 1, 0, -1, 0,
  // right
  1, -1, -1, 1, 0, 0,
  1, 1, -1, 1, 0, 0,
  1, 1, 1, 1, 0, 0,
  1, -1, 1, 1, 0, 0,
  // left
  -1, -1, -1, -1, 0, 0,
  -1, -1, 1, -1, 0, 0,
  -1, 1, 1, -1, 0, 0,
  -1, 1, -1, -1, 0, 0,
]);

export const CUBE_INDICES = new Uint16Array([
  0, 1, 2, 0, 2, 3,
  4, 5, 6, 4, 6, 7,
  8, 9, 10, 8, 10, 11,
  12, 13, 14, 12, 14, 15,
  16, 17, 18, 16, 18, 19,
  20, 21, 22, 20, 22, 23,
]);
