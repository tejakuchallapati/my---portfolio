/* ============================================================
   hero-bg.js — Hero canvas background
   Layers: deep-space gradient · glowing orbs · hex grid
           fine grid · circuit traces · matrix rain · scanline
           radial vignette
   ============================================================ */

(function () {
  const c = document.getElementById('hero-bg');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H;

  function resize() {
    W = c.width  = window.innerWidth;
    H = c.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ── 1. HEX GRID ─────────────────────────────────────────
  const HEX_SIZE = 42;
  const HEX_GAP  = 4;

  function hexPath(x, y, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 180) * (60 * i - 30);
      i === 0
        ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
        : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
    }
    ctx.closePath();
  }

  function buildHexGrid() {
    const grid = [];
    const colW  = HEX_SIZE * Math.sqrt(3);
    const rowH  = HEX_SIZE * 1.5;
    for (let row = -1; row < Math.ceil(H / rowH) + 2; row++) {
      for (let col = -1; col < Math.ceil(W / colW) + 2; col++) {
        const x = col * colW + (row % 2 === 0 ? 0 : colW / 2);
        const y = row * rowH;
        grid.push({ x, y, pulse: Math.random() * Math.PI * 2, speed: 0.3 + Math.random() * 0.4 });
      }
    }
    return grid;
  }

  let hexGrid = buildHexGrid();
  window.addEventListener('resize', () => { hexGrid = buildHexGrid(); });

  // ── 2. CIRCUIT TRACES ───────────────────────────────────
  const CIRCUIT_COUNT = 18;
  const circuits = [];

  function makeCircuit() {
    const isH = Math.random() > 0.5;
    return {
      x:        Math.random() * W,
      y:        Math.random() * H,
      len:      80 + Math.random() * 200,
      speed:    0.4 + Math.random() * 0.8,
      progress: 0,
      isH,
      color: Math.random() > 0.5 ? 'rgba(0,229,255,' : 'rgba(124,92,252,',
      alpha: 0.35 + Math.random() * 0.4,
    };
  }

  for (let i = 0; i < CIRCUIT_COUNT; i++) {
    const ci = makeCircuit();
    ci.progress = Math.random() * ci.len; // stagger starts
    circuits.push(ci);
  }

  // ── 3. MATRIX RAIN (edges only) ─────────────────────────
  const FONT_SIZE = 13;
  const CHARS = '01アイウエオカキクケコABCDEF{}[]<>/\\';

  let drops = buildDrops();
  function buildDrops() {
    const n = Math.floor(W / FONT_SIZE);
    return Array.from({ length: n }, () => ({
      y:      Math.random() * -60,
      speed:  0.3 + Math.random() * 0.5,
      active: Math.random() > 0.82,
    }));
  }
  window.addEventListener('resize', () => { drops = buildDrops(); });

  // ── 4. SCAN LINE ────────────────────────────────────────
  let scanY = 0;

  // ── 5. AMBIENT GLOWING ORBS ─────────────────────────────
  const orbs = [
    { fx: 0.18, fy: 0.30, r: 200, color: 'rgba(124,92,252,', alpha: 0.07, speed: 0.0008 },
    { fx: 0.80, fy: 0.65, r: 240, color: 'rgba(0,229,255,',   alpha: 0.06, speed: 0.0012 },
    { fx: 0.50, fy: 0.15, r: 180, color: 'rgba(244,114,182,', alpha: 0.05, speed: 0.0010 },
  ];

  // ── RENDER LOOP ─────────────────────────────────────────
  let t = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Deep space gradient base
    const bg = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.8);
    bg.addColorStop(0,   '#0a0820');
    bg.addColorStop(0.5, '#070614');
    bg.addColorStop(1,   '#050508');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Glowing orbs
    orbs.forEach((o, i) => {
      const ox = W * o.fx + Math.sin(t * o.speed * (i + 1)) * 60;
      const oy = H * o.fy + Math.cos(t * o.speed * (i + 1)) * 40;
      const g  = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
      g.addColorStop(0, o.color + (o.alpha * 1.6) + ')');
      g.addColorStop(1, o.color + '0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    });

    // Hex grid
    ctx.save();
    hexGrid.forEach(h => {
      const pulse = 0.5 + 0.5 * Math.sin(t * h.speed + h.pulse);
      hexPath(h.x, h.y, HEX_SIZE - HEX_GAP);
      ctx.strokeStyle = `rgba(124,92,252,${0.04 + pulse * 0.06})`;
      ctx.lineWidth   = 0.7;
      ctx.stroke();
      if (pulse > 0.85) {
        hexPath(h.x, h.y, HEX_SIZE - HEX_GAP);
        ctx.fillStyle = `rgba(0,229,255,${(pulse - 0.85) * 0.12})`;
        ctx.fill();
      }
    });
    ctx.restore();

    // Fine grid lines
    const GRID = 80;
    ctx.save();
    ctx.lineWidth = 0.4;
    for (let x = 0; x < W; x += GRID) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H);
      ctx.strokeStyle = 'rgba(124,92,252,0.05)'; ctx.stroke();
    }
    for (let y = 0; y < H; y += GRID) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y);
      ctx.strokeStyle = 'rgba(0,229,255,0.04)'; ctx.stroke();
    }
    ctx.restore();

    // Circuit traces
    circuits.forEach(ci => {
      ci.progress += ci.speed;
      if (ci.progress > ci.len + 40) {
        Object.assign(ci, makeCircuit());
        ci.progress = 0;
      }
      const drawn = Math.min(ci.progress, ci.len);
      ctx.save();
      ctx.strokeStyle = ci.color + ci.alpha + ')';
      ctx.lineWidth   = 1.2;
      ctx.shadowColor = ci.color + '0.8)';
      ctx.shadowBlur  = 6;
      ctx.beginPath();
      if (ci.isH) {
        ctx.moveTo(ci.x, ci.y);
        ctx.lineTo(ci.x + Math.min(drawn, ci.len * 0.5), ci.y);
        if (drawn > ci.len * 0.5)
          ctx.lineTo(ci.x + ci.len * 0.5, ci.y + (drawn - ci.len * 0.5));
      } else {
        ctx.moveTo(ci.x, ci.y);
        ctx.lineTo(ci.x, ci.y + Math.min(drawn, ci.len * 0.5));
        if (drawn > ci.len * 0.5)
          ctx.lineTo(ci.x + (drawn - ci.len * 0.5), ci.y + ci.len * 0.5);
      }
      ctx.stroke();
      // Junction dots
      if (drawn > 2) {
        ctx.beginPath(); ctx.arc(ci.x, ci.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = ci.color + '1)'; ctx.fill();
      }
      if (drawn > ci.len * 0.5) {
        const jx = ci.isH ? ci.x + ci.len * 0.5 : ci.x;
        const jy = ci.isH ? ci.y : ci.y + ci.len * 0.5;
        ctx.beginPath(); ctx.arc(jx, jy, 3, 0, Math.PI * 2);
        ctx.fillStyle = ci.color + '0.9)'; ctx.fill();
      }
      ctx.restore();
    });

    // Matrix rain (left + right 15% only)
    ctx.save();
    ctx.font = `${FONT_SIZE}px 'DM Mono', monospace`;
    drops.forEach((d, i) => {
      if (!d.active) return;
      const xPos    = i * FONT_SIZE;
      const inLeft  = xPos < W * 0.15;
      const inRight = xPos > W * 0.85;
      if (!inLeft && !inRight) return;
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const fade = Math.min(1, d.y / H);
      ctx.fillStyle = `rgba(0,229,255,${0.5 * fade})`;
      ctx.fillText(char, xPos, d.y * FONT_SIZE);
      if (d.y * FONT_SIZE > H && Math.random() > 0.97) d.y = 0;
      d.y += d.speed;
    });
    ctx.restore();

    // Scanline sweep
    scanY = (scanY + 0.6) % H;
    const sg = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
    sg.addColorStop(0,   'rgba(0,229,255,0)');
    sg.addColorStop(0.5, 'rgba(0,229,255,0.04)');
    sg.addColorStop(1,   'rgba(0,229,255,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, scanY - 40, W, 80);

    // Radial vignette
    const vig = ctx.createRadialGradient(W * 0.5, H * 0.5, H * 0.2, W * 0.5, H * 0.5, H * 0.85);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,8,0.72)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    t++;
    requestAnimationFrame(draw);
  }

  draw();
})();
