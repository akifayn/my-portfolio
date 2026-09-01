import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const VERTEX_SHADER = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

// Stitch "Studio Neura" tasarımından port edilen organik indigo/obsidian shader.
const FRAGMENT_SHADER = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

varying vec2 v_texCoord;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  float m0 = 1.79284291400159 - 0.85373472095314 * ( a0[0]*a0[0] + h[0]*h[0] );
  m[0] *= m0;
  m[1] *= 1.79284291400159 - 0.85373472095314 * ( a0[1]*a0[1] + h[1]*h[1] );
  m[2] *= 1.79284291400159 - 0.85373472095314 * ( a0[2]*a0[2] + h[2]*h[2] );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;

    float dist = distance(uv, mouse);
    float strength = 0.15 / (dist + 0.35);
    vec2 displacedUv = uv + (uv - mouse) * strength * 0.1;

    float n1 = snoise(displacedUv * 1.5 + u_time * 0.1);
    float n2 = snoise(displacedUv * 3.0 - u_time * 0.2 + mouse * 0.5);
    float combinedNoise = (n1 + n2 * 0.5) * 0.5 + 0.5;

    vec3 surface = vec3(0.075, 0.075, 0.078);
    vec3 indigo = vec3(0.357, 0.357, 0.839);
    vec3 charcoal = vec3(0.11, 0.106, 0.11);

    vec3 base = mix(surface, charcoal, combinedNoise);
    vec3 color = mix(base, indigo * 0.5, pow(combinedNoise, 4.0) * 0.8);

    float glow = smoothstep(0.4, 0.0, dist);
    color += indigo * glow * 0.15;

    float vignette = 1.0 - smoothstep(0.4, 1.4, length(uv - 0.5));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
}`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

// Global "canlı sıvı" shader arka planı — sadece koyu temada görünür.
// Küçük ölçekli, yavaş bir ambiyans efekti olduğu için (Stitch kaynağındaki gibi)
// reduced-motion tercihinden bağımsız olarak her zaman çalışır; sadece fare takibini
// reduced-motion'da devre dışı bırakıp imleci merkezde sabitler.
export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const glContext = canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl')
    if (!glContext || !(glContext instanceof WebGLRenderingContext)) return
    const gl: WebGLRenderingContext = glContext

    function syncSize() {
      if (!canvas) return
      const w = canvas.clientWidth || 1280
      const h = canvas.clientHeight || 720
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
    }

    syncSize()

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const positionLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 }
    let lastTime = 0

    function draw(t: number) {
      if (!canvas || !gl) return
      lastTime = t
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(uTime, t * 0.001)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    // Boyut değişince (scrollbar belirmesi, viewport resize) buffer temizlenir —
    // her seferinde son bilinen zamanla yeniden çizilir ki içerik boş kalmasın.
    const resizeObserver = new ResizeObserver(() => {
      syncSize()
      draw(lastTime)
    })
    resizeObserver.observe(canvas)

    function handleMouseMove(event: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const nx = (event.clientX - rect.left) / rect.width
      const ny = 1 - (event.clientY - rect.top) / rect.height
      mouse.x = nx * canvas.width
      mouse.y = ny * canvas.height
    }
    window.addEventListener('mousemove', handleMouseMove)

    let rafId = 0
    function render(t: number) {
      draw(t)
      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [reduceMotion])

  return (
    <div className="fixed inset-0 -z-10 hidden dark:block" aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
