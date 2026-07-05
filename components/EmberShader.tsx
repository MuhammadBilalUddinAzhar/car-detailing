'use client';

import { useEffect, useRef } from 'react';

// Fullscreen WebGL fragment shader: molten-carbon smoke with ember glow
// rising from the floor and a cool chrome light-sweep passing through.
// Pure WebGL (no three.js) — ~zero bundle cost.

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv * vec2(u_res.x / u_res.y, 1.0);
  float t = u_time * 0.12;

  // Domain-warped smoke drifting upward
  float n = fbm(p * 2.2 + vec2(t * 0.6, -t) + fbm(p * 3.0 + t) * 0.8);

  vec3 ink    = vec3(0.039, 0.043, 0.051);
  vec3 carbon = vec3(0.075, 0.082, 0.098);
  vec3 ember  = vec3(1.0, 0.302, 0.180);

  vec3 col = mix(ink, carbon, n);

  // Ember glow strongest near the floor
  float glow = smoothstep(0.5, 0.95, n) * pow(1.0 - uv.y, 1.6);
  col += ember * glow * 0.6;

  // Faint ember pulse in the smoke body
  col += ember * smoothstep(0.72, 1.0, n) * 0.12;

  // Cool chrome light-sweep passing left to right
  float sweepX = fract(u_time * 0.16) * 1.7 - 0.35;
  float sweep = exp(-pow((uv.x - sweepX) * 5.5, 2.0));
  col += vec3(0.55, 0.75, 1.0) * sweep * 0.07;

  // Vignette
  col *= 1.0 - 0.5 * length(uv - 0.5);

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function EmberShader({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return; // WebGL unavailable → the ink background beneath shows instead

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Fullscreen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_res');

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap DPR — it's a soft background
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const start = performance.now();
    const frame = (now: number) => {
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className={`h-full w-full ${className}`} aria-hidden />;
}
