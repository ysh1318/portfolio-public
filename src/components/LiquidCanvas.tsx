import { useEffect, useRef } from 'react'

interface FluidDroplet {
  rx: number
  ry: number
  baseR: number
  x: number
  y: number
  vx: number
  vy: number
  baseHue: number
  alpha1: number
  alpha2: number
  freq: number
}

export default function LiquidCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Honor prefers-reduced-motion
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      if (!canvas || !ctx) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    window.addEventListener('resize', resize, { passive: true })
    resize()

    // 6 Viscous fluid droplets with harmonic surface tension & base hues
    const fluids: FluidDroplet[] = [
      { rx: 0.18, ry: 0.22, baseR: 270, x: 0, y: 0, vx: 0, vy: 0, baseHue: 335, alpha1: 0.55, alpha2: 0.22, freq: 0.8 },
      { rx: 0.82, ry: 0.28, baseR: 300, x: 0, y: 0, vx: 0, vy: 0, baseHue: 215, alpha1: 0.48, alpha2: 0.20, freq: 1.1 },
      { rx: 0.28, ry: 0.62, baseR: 320, x: 0, y: 0, vx: 0, vy: 0, baseHue: 310, alpha1: 0.52, alpha2: 0.20, freq: 0.9 },
      { rx: 0.78, ry: 0.72, baseR: 350, x: 0, y: 0, vx: 0, vy: 0, baseHue: 255, alpha1: 0.48, alpha2: 0.18, freq: 1.3 },
      { rx: 0.50, ry: 0.45, baseR: 250, x: 0, y: 0, vx: 0, vy: 0, baseHue: 280, alpha1: 0.40, alpha2: 0.16, freq: 1.0 },
      { rx: 0.88, ry: 0.90, baseR: 290, x: 0, y: 0, vx: 0, vy: 0, baseHue: 355, alpha1: 0.45, alpha2: 0.18, freq: 0.7 },
    ]

    // Initialize positions
    fluids.forEach((f) => {
      f.x = f.rx * width
      f.y = f.ry * height
    })

    // Mouse wake tracker
    let mouseX = -1000
    let mouseY = -1000
    let mouseTargetX = -1000
    let mouseTargetY = -1000

    const onMouseMove = (e: MouseEvent) => {
      mouseTargetX = e.clientX
      mouseTargetY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Scroll velocity tracker
    let lastScrollY = window.scrollY
    let scrollVelocity = 0
    let smoothedVelocity = 0
    let lastScrollTime = performance.now()

    const onScroll = () => {
      const now = performance.now()
      const dt = Math.max(now - lastScrollTime, 8)
      lastScrollTime = now

      const currentY = window.scrollY
      const deltaY = currentY - lastScrollY
      lastScrollY = currentY

      scrollVelocity = (deltaY / dt) * 16
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let time = 0
    let rafId: number
    let isTabVisible = !document.hidden

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden
      if (isTabVisible) {
        lastScrollTime = performance.now()
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    // Helper: Draw organic liquid droplet with undulating surface tension and dynamic color cycle
    function drawLiquidDroplet(f: FluidDroplet, idx: number, clampedVel: number, hueShift: number) {
      if (!ctx) return

      const waveX = Math.sin(time * f.freq + idx * 1.5) * 35
      const waveY = Math.cos(time * (f.freq * 0.85) + idx * 2.0) * 35

      // Target displacement responding to scroll inertia
      let targetX = f.rx * width + waveX
      let targetY = f.ry * height + waveY - clampedVel * (1.8 + idx * 0.35)

      // Mouse repulsion wake (liquid moves away gently when cursor approaches)
      const dx = targetX - mouseX
      const dy = targetY - mouseY
      const dist = Math.hypot(dx, dy)
      if (dist < 320 && dist > 1) {
        const push = (1 - dist / 320) * 45
        targetX += (dx / dist) * push
        targetY += (dy / dist) * push
      }

      // Spring physics (Hooke's law with viscous fluid damping)
      const k = 0.045
      const d = 0.82
      const fx = (targetX - f.x) * k
      const fy = (targetY - f.y) * k

      f.vx = (f.vx + fx) * d
      f.vy = (f.vy + fy) * d

      f.x += f.vx
      f.y += f.vy

      // Hydrodynamic elongation (teardrop squish during scroll surge)
      const squishY = 1 + Math.abs(clampedVel) * 0.015
      const squishX = 1 / squishY

      ctx.save()
      ctx.translate(f.x, f.y)
      ctx.scale(squishX, squishY)

      // Multiphase undulating liquid surface (16 radial harmonics)
      const points = 16
      ctx.beginPath()
      for (let i = 0; i <= points; i++) {
        const theta = (i / points) * Math.PI * 2
        const h1 = Math.sin(theta * 2 + time * 1.5 + idx * 1.1) * (f.baseR * 0.08)
        const h2 = Math.cos(theta * 3 - time * 1.1 + idx * 0.8) * (f.baseR * 0.05)
        const h3 = Math.sin(theta * 4 + time * 2.2 + idx * 1.7) * (f.baseR * 0.03)
        const r = f.baseR + h1 + h2 + h3 + Math.sin(time * 1.5 + idx) * 15

        const px = Math.cos(theta) * r
        const py = Math.sin(theta) * r
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()

      // Organic dynamic color cycling in HSL space
      const h1 = (f.baseHue + hueShift) % 360
      const h2 = (h1 + 35) % 360
      const color1 = `hsla(${h1.toFixed(1)}, 85%, 72%, ${f.alpha1})`
      const color2 = `hsla(${h2.toFixed(1)}, 80%, 78%, ${f.alpha2})`

      const grad = ctx.createRadialGradient(0, 0, f.baseR * 0.12, 0, 0, f.baseR * 1.1)
      grad.addColorStop(0, color1)
      grad.addColorStop(0.65, color2)
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = grad
      ctx.fill()
      ctx.restore()
    }

    // Helper: Draw flowing hydrodynamic wave current with dynamic color cycle
    function drawFluidWave(
      yRatio: number,
      amp: number,
      freq: number,
      speed: number,
      phase: number,
      c1: string,
      c2: string,
      clampedVel: number
    ) {
      if (!ctx) return
      const yBase = yRatio * height
      const dynamicAmp = amp + Math.abs(clampedVel) * 0.65
      const waveSurge = -clampedVel * 1.2

      ctx.save()
      ctx.beginPath()
      ctx.moveTo(0, height)
      ctx.lineTo(0, yBase)

      const step = 32
      for (let x = 0; x <= width + step; x += step) {
        const w1 = Math.sin(x * freq + time * speed + phase) * dynamicAmp
        const w2 = Math.cos(x * freq * 1.7 - time * speed * 0.8 + phase) * (dynamicAmp * 0.4)

        // Cursor wave depression
        let mouseRipple = 0
        const mDist = Math.abs(x - mouseX)
        if (mDist < 250) {
          mouseRipple = Math.cos((mDist / 250) * Math.PI * 0.5) * 22
        }

        const y = yBase + w1 + w2 + waveSurge + mouseRipple
        ctx.lineTo(x, y)
      }

      ctx.lineTo(width, height)
      ctx.closePath()

      const grad = ctx.createLinearGradient(0, yBase - dynamicAmp, width, yBase + dynamicAmp * 2)
      grad.addColorStop(0, c1)
      grad.addColorStop(1, c2)
      ctx.fillStyle = grad
      ctx.fill()
      ctx.restore()
    }

    function renderFrame() {
      if (!ctx) return

      // Skip GPU render if tab is hidden
      if (!isTabVisible) {
        rafId = requestAnimationFrame(renderFrame)
        return
      }

      time += 0.016

      // Continuous, soothing color cycle across the spectrum (~50 seconds per full loop)
      const hueShift = (time * 7) % 360

      // Ease mouse position
      mouseX += (mouseTargetX - mouseX) * 0.08
      mouseY += (mouseTargetY - mouseY) * 0.08

      // Fluid viscous drag & velocity decay
      scrollVelocity *= 0.88
      smoothedVelocity += (scrollVelocity - smoothedVelocity) * 0.16
      const clampedVel = Math.max(Math.min(smoothedVelocity, 40), -40)

      ctx.clearRect(0, 0, width, height)

      // 1. Flowing Hydrodynamic Wave Currents (Background Layers with coordinated hue cycle)
      const waveHue1 = (335 + hueShift) % 360
      const waveHue2 = (215 + hueShift) % 360
      const waveHue3 = (280 + hueShift) % 360

      drawFluidWave(
        0.38,
        42,
        0.0022,
        1.2,
        0.0,
        `hsla(${waveHue1.toFixed(1)}, 80%, 75%, 0.13)`,
        `hsla(${((waveHue1 + 40) % 360).toFixed(1)}, 75%, 80%, 0.06)`,
        clampedVel
      )

      drawFluidWave(
        0.68,
        50,
        0.0018,
        0.9,
        2.2,
        `hsla(${waveHue2.toFixed(1)}, 85%, 72%, 0.14)`,
        `hsla(${((waveHue2 + 50) % 360).toFixed(1)}, 75%, 78%, 0.05)`,
        clampedVel
      )

      drawFluidWave(
        0.85,
        38,
        0.0025,
        1.4,
        4.1,
        `hsla(${waveHue3.toFixed(1)}, 80%, 76%, 0.11)`,
        `hsla(${((waveHue3 + 30) % 360).toFixed(1)}, 75%, 82%, 0.04)`,
        clampedVel
      )

      // 2. Viscous Organic Liquid Droplets with Surface Tension Harmonics
      fluids.forEach((f, idx) => {
        drawLiquidDroplet(f, idx, clampedVel, hueShift)
      })

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(renderFrame)
      }
    }

    // Initial render
    renderFrame()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  )
}
