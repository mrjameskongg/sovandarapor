import { useEffect, useRef } from 'react';

/**
 * Drifting ink shader — slow, low-contrast fbm flow tinted with gold.
 * Sits behind hero content as a subtle living texture.
 * - Skips animation on prefers-reduced-motion
 * - Pauses when tab hidden
 * - Mouse + scroll reactive
 * - Pure WebGL, no deps
 */
interface InkShaderProps {
  className?: string;
  /** 0..1 overall strength */
  intensity?: number;
  /** 0..1 scroll progress */
  scrollProgress?: number;
}

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_intensity;
uniform vec2 u_mouse;
uniform float u_scroll;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * vec2(u_res.x / u_res.y, 1.0) * 1.6;

  vec2 mouseOffset = (u_mouse - uv) * 0.25;
  p += mouseOffset * (1.0 - length(uv - u_mouse));

  float t = u_time * (0.025 + u_scroll * 0.015);
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 1.7 * q + vec2(1.7, 9.2) + 0.15 * t),
                fbm(p + 1.7 * q + vec2(8.3, 2.8) - 0.13 * t));
  float n = fbm(p + 1.6 * r);

  vec3 gold = vec3(0.78, 0.62, 0.20);
  vec3 ink  = vec3(0.06, 0.06, 0.05);
  vec3 col  = mix(ink, gold, smoothstep(0.35, 0.95, n));

  float vig = smoothstep(1.05, 0.25, length(uv - 0.5));
  float alpha = n * vig * u_intensity;
  alpha = clamp(alpha * 0.7, 0.0, 0.6);

  gl_FragColor = vec4(col, alpha);
}
`;

export default function InkShader({
  className = '',
  intensity = 0.9,
  scrollProgress = 0,
}: InkShaderProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const scrollRef = useRef(scrollProgress);

  useEffect(() => { scrollRef.current = scrollProgress; }, [scrollProgress]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, antialias: false, alpha: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uInt = gl.getUniformLocation(prog, 'u_intensity');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uScroll = gl.getUniformLocation(prog, 'u_scroll');
    gl.uniform1f(uInt, intensity);
    gl.uniform2f(uMouse, 0.5, 0.5);
    gl.uniform1f(uScroll, scrollRef.current);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);

    let raf = 0; let running = true; const start = performance.now();
    const draw = (now: number) => {
      if (!running) return;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uScroll, scrollRef.current);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw(start);

    const onVis = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!reduced) { running = true; raf = requestAnimationFrame(draw); }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      running = false; cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      ro.disconnect();
      gl.deleteBuffer(buf); gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs);
    };
  }, [intensity]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
