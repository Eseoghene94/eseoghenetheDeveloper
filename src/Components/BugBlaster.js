import React, { useCallback, useEffect, useRef, useState } from 'react';

// Bug Blaster: a canvas arcade shooter. Pilot the </> ship, auto-fire at waves
// ("sprints") of bugs, grab power-ups, and beat the Production Bug every 5th sprint.
//
// The simulation lives in refs and a requestAnimationFrame loop; React state only
// drives the overlay UI (start / pause / game over), so the game never re-renders React per frame.

const INK = '#1b1b1b';
const PAPER = '#f5f5f5';
const MAGENTA = '#B63E96';
const TEAL = '#58E6D9';
const AMBER = '#f8a547';
const BEST_KEY = 'bugblaster:best';

const POWERUPS = {
  coffee: { color: AMBER, label: 'Coffee', duration: 7 }, // rapid fire
  spread: { color: TEAL, label: 'Spread', duration: 7 }, // 3-way shot
  shield: { color: PAPER, label: 'Shield', duration: 0 }, // absorbs one hit
};

const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const hit = (a, b) => Math.abs(a.x - b.x) < a.r + b.r && Math.abs(a.y - b.y) < a.r + b.r && Math.hypot(a.x - b.x, a.y - b.y) < a.r + b.r;

const readBest = () => {
  try {
    return Number(localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
};
const saveBest = (v) => {
  try {
    localStorage.setItem(BEST_KEY, String(v));
  } catch {
    // Storage blocked: best score just won't persist.
  }
};

// Tiny Web Audio synth: no audio files to load.
const createSfx = () => {
  let ctx = null;
  const get = () => {
    if (typeof window === 'undefined') return null;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!ctx) ctx = new Ctx();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };
  const tone = (freq, endFreq, dur, type, vol) => {
    const c = get();
    if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur);
  };
  const noise = (dur, vol, freq) => {
    const c = get();
    if (!c) return;
    const len = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2;
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = freq;
    const g = c.createGain();
    g.gain.value = vol;
    src.connect(f).connect(g).connect(c.destination);
    src.start();
  };
  return {
    unlock: get,
    shoot: () => tone(880, 440, 0.06, 'square', 0.025),
    pop: () => noise(0.18, 0.35, 1800),
    boom: () => noise(0.6, 0.6, 600),
    hurt: () => tone(220, 55, 0.35, 'sawtooth', 0.12),
    power: () => tone(520, 1560, 0.25, 'triangle', 0.12),
    wave: () => tone(330, 660, 0.3, 'triangle', 0.08),
  };
};

const newGame = (w, h) => ({
  w,
  h,
  t: 0,
  score: 0,
  lives: 3,
  wave: 0,
  combo: 1,
  comboTimer: 0,
  shake: 0,
  banner: null,
  player: { x: w / 2, y: h - 56, r: 16, cooldown: 0, invuln: 0, shield: false },
  power: { coffee: 0, spread: 0 },
  bullets: [],
  enemyBullets: [],
  enemies: [],
  pickups: [],
  particles: [],
  stars: Array.from({ length: 70 }, () => ({ x: rand(0, w), y: rand(0, h), s: rand(0.3, 1.6) })),
  spawnQueue: [],
  spawnTimer: 0,
});

// Builds the spawn list for a sprint; every 5th sprint ends with a boss.
const queueWave = (g) => {
  g.wave += 1;
  const n = 6 + g.wave * 2;
  const q = [];
  for (let i = 0; i < n; i++) {
    const roll = Math.random();
    const type = g.wave >= 3 && roll < 0.18 ? 'tank' : g.wave >= 2 && roll < 0.45 ? 'fast' : 'bug';
    q.push({ type, delay: Math.max(0.25, 0.9 - g.wave * 0.05) });
  }
  if (g.wave % 5 === 0) q.push({ type: 'boss', delay: 1.5 });
  g.spawnQueue = q;
  g.banner = { text: g.wave % 5 === 0 ? `Sprint ${g.wave}: Production Bug incoming` : `Sprint ${g.wave}`, life: 2 };
};

const spawnEnemy = (g, type) => {
  const speedUp = 1 + g.wave * 0.06;
  const base = { x: rand(30, g.w - 30), y: -30, phase: rand(0, Math.PI * 2), fireTimer: rand(1.2, 2.6), type };
  if (type === 'boss') {
    const hp = 40 + g.wave * 8;
    g.enemies.push({ ...base, x: g.w / 2, r: 46, hp, maxHp: hp, vy: 40, score: 1500 });
  } else if (type === 'tank') {
    g.enemies.push({ ...base, r: 22, hp: 4, maxHp: 4, vy: 38 * speedUp, score: 250 });
  } else if (type === 'fast') {
    g.enemies.push({ ...base, r: 13, hp: 1, maxHp: 1, vy: 120 * speedUp, score: 150 });
  } else {
    g.enemies.push({ ...base, r: 16, hp: 1, maxHp: 1, vy: 70 * speedUp, score: 100 });
  }
};

const burst = (g, x, y, color, count) => {
  for (let i = 0; i < count; i++) {
    const a = rand(0, Math.PI * 2);
    const s = rand(60, 260);
    g.particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: rand(0.3, 0.7), color });
  }
};

// ---------- Drawing ----------

const drawBug = (ctx, e, t) => {
  const { x, y, r } = e;
  const color = e.type === 'boss' ? MAGENTA : e.type === 'tank' ? AMBER : e.type === 'fast' ? TEAL : MAGENTA;
  const wiggle = Math.sin(t * 14 + e.phase) * r * 0.18;
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = PAPER;
  ctx.lineWidth = e.type === 'boss' ? 3 : 2;
  ctx.lineCap = 'round';
  // legs
  for (const side of [-1, 1]) {
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath();
      ctx.moveTo(side * r * 0.5, i * r * 0.45);
      ctx.lineTo(side * r * 1.15, i * r * 0.55 + (i === 0 ? wiggle : -wiggle));
      ctx.stroke();
    }
  }
  // antennae
  ctx.beginPath();
  ctx.moveTo(-r * 0.25, -r * 0.8);
  ctx.lineTo(-r * 0.55, -r * 1.25 + wiggle * 0.5);
  ctx.moveTo(r * 0.25, -r * 0.8);
  ctx.lineTo(r * 0.55, -r * 1.25 - wiggle * 0.5);
  ctx.stroke();
  // body
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, 0, r * 0.7, r * 0.95, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.9);
  ctx.lineTo(0, r * 0.9);
  ctx.strokeStyle = INK;
  ctx.stroke();
  // eyes (angry boss)
  ctx.fillStyle = INK;
  ctx.beginPath();
  ctx.arc(-r * 0.25, -r * 0.45, r * 0.1, 0, Math.PI * 2);
  ctx.arc(r * 0.25, -r * 0.45, r * 0.1, 0, Math.PI * 2);
  ctx.fill();
  if (e.type === 'boss') {
    ctx.fillStyle = PAPER;
    ctx.font = 'bold 13px ui-monospace, monospace';
    ctx.textAlign = 'center';
    ctx.fillText('PROD', 0, r * 0.25);
  }
  ctx.restore();
  // health bar for multi-hit enemies
  if (e.maxHp > 1) {
    const w = r * 2;
    ctx.fillStyle = 'rgba(245,245,245,0.2)';
    ctx.fillRect(x - w / 2, y - r - 12, w, 4);
    ctx.fillStyle = color;
    ctx.fillRect(x - w / 2, y - r - 12, (w * e.hp) / e.maxHp, 4);
  }
};

const drawPlayer = (ctx, p, t) => {
  if (p.invuln > 0 && Math.floor(t * 20) % 2 === 0) return; // blink while invulnerable
  ctx.save();
  ctx.translate(p.x, p.y);
  // thruster
  ctx.fillStyle = Math.floor(t * 30) % 2 ? AMBER : MAGENTA;
  ctx.beginPath();
  ctx.moveTo(-6, 14);
  ctx.lineTo(0, 24 + Math.random() * 6);
  ctx.lineTo(6, 14);
  ctx.fill();
  // hull
  ctx.fillStyle = PAPER;
  ctx.strokeStyle = MAGENTA;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -20);
  ctx.lineTo(18, 14);
  ctx.lineTo(0, 7);
  ctx.lineTo(-18, 14);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.font = 'bold 9px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('</>', 0, 4);
  if (p.shield) {
    ctx.strokeStyle = 'rgba(245,245,245,0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -2, 28, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
};

const drawPickup = (ctx, k, t) => {
  const { color } = POWERUPS[k.kind];
  const bob = Math.sin(t * 5 + k.x) * 3;
  ctx.save();
  ctx.translate(k.x, k.y + bob);
  ctx.fillStyle = INK;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, k.r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.font = 'bold 12px ui-monospace, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(k.kind === 'coffee' ? 'C' : k.kind === 'spread' ? 'S' : '◇', 0, 1);
  ctx.restore();
};

const drawHud = (ctx, g, best) => {
  ctx.save();
  ctx.fillStyle = PAPER;
  ctx.textBaseline = 'top';
  ctx.font = 'bold 18px ui-monospace, monospace';
  ctx.textAlign = 'left';
  ctx.fillText(String(g.score).padStart(6, '0'), 14, 12);
  ctx.font = '12px ui-monospace, monospace';
  ctx.fillStyle = 'rgba(245,245,245,0.6)';
  ctx.fillText(`BEST ${String(Math.max(best, g.score)).padStart(6, '0')}`, 14, 34);
  if (g.combo > 1) {
    ctx.fillStyle = MAGENTA;
    ctx.font = 'bold 14px ui-monospace, monospace';
    ctx.fillText(`x${g.combo} COMBO`, 14, 52);
  }
  ctx.textAlign = 'right';
  ctx.fillStyle = PAPER;
  ctx.font = 'bold 14px ui-monospace, monospace';
  ctx.fillText(`SPRINT ${g.wave}`, g.w - 14, 12);
  ctx.fillStyle = MAGENTA;
  ctx.fillText('♥'.repeat(Math.max(0, g.lives)), g.w - 14, 32);
  let y = 54;
  for (const kind of ['coffee', 'spread']) {
    if (g.power[kind] > 0) {
      ctx.fillStyle = POWERUPS[kind].color;
      ctx.font = '12px ui-monospace, monospace';
      ctx.fillText(`${POWERUPS[kind].label.toUpperCase()} ${g.power[kind].toFixed(1)}s`, g.w - 14, y);
      y += 16;
    }
  }
  if (g.banner) {
    ctx.globalAlpha = Math.min(1, g.banner.life);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = PAPER;
    ctx.font = `bold ${g.w < 500 ? 20 : 28}px ui-sans-serif, system-ui, sans-serif`;
    ctx.fillText(g.banner.text, g.w / 2, g.h * 0.42);
  }
  ctx.restore();
};

// ---------- Component ----------

const BugBlaster = () => {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const keys = useRef({});
  const pointerX = useRef(null);
  const sfx = useRef(null);
  const soundOn = useRef(true);
  const reduceMotion = useRef(false);
  const bestRef = useRef(0);

  const [phase, setPhase] = useState('ready'); // ready | playing | paused | over
  const phaseRef = useRef('ready');
  const [result, setResult] = useState({ score: 0, wave: 0, best: 0, newBest: false });
  const [sound, setSound] = useState(true);

  const go = (p) => {
    phaseRef.current = p;
    setPhase(p);
  };

  useEffect(() => {
    bestRef.current = readBest();
    setResult((r) => ({ ...r, best: bestRef.current }));
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sfx.current = createSfx();
  }, []);

  useEffect(() => {
    soundOn.current = sound;
  }, [sound]);

  const play = (name) => soundOn.current && sfx.current?.[name]();

  const start = useCallback(() => {
    sfx.current?.unlock();
    const c = canvasRef.current;
    gameRef.current = newGame(c.clientWidth, c.clientHeight);
    queueWave(gameRef.current);
    play('wave');
    go('playing');
    c.focus({ preventScroll: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePause = useCallback(() => {
    if (phaseRef.current === 'playing') go('paused');
    else if (phaseRef.current === 'paused') go('playing');
  }, []);

  // Canvas sizing: logical pixels = CSS pixels, backing store scaled for crisp HiDPI.
  useEffect(() => {
    const c = canvasRef.current;
    const resize = () => {
      const w = wrapRef.current.clientWidth;
      const h = Math.round(clamp(w < 640 ? w * 1.35 : w * 0.62, 420, 640));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.style.height = `${h}px`;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
      const g = gameRef.current;
      if (g) {
        g.w = w;
        g.h = h;
        g.player.y = h - 56;
        g.player.x = clamp(g.player.x, 20, w - 20);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // Input.
  useEffect(() => {
    const c = canvasRef.current;
    const GAME_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'a', 'd', 'A', 'D'];
    const down = (e) => {
      if (document.activeElement !== c && phaseRef.current !== 'playing') return;
      if (GAME_KEYS.includes(e.key)) e.preventDefault(); // don't scroll the page while playing
      if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') togglePause();
      if ((e.key === ' ' || e.key === 'Enter') && (phaseRef.current === 'ready' || phaseRef.current === 'over')) start();
      keys.current[e.key.toLowerCase()] = true;
      pointerX.current = null; // keyboard takes over from the pointer
    };
    const up = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };
    const move = (e) => {
      const rect = c.getBoundingClientRect();
      pointerX.current = e.clientX - rect.left;
    };
    const leave = (e) => {
      if (e.pointerType === 'mouse') pointerX.current = null;
    };
    const hidden = () => document.hidden && phaseRef.current === 'playing' && go('paused');
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    c.addEventListener('pointermove', move);
    c.addEventListener('pointerdown', move);
    c.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', hidden);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      c.removeEventListener('pointermove', move);
      c.removeEventListener('pointerdown', move);
      c.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', hidden);
    };
  }, [start, togglePause]);

  // Main loop.
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext('2d');
    let raf;
    let last = performance.now();
    let idle = newGame(c.clientWidth, c.clientHeight); // background stars for the menus

    const endGame = (g) => {
      const newBest = g.score > bestRef.current;
      if (newBest) {
        bestRef.current = g.score;
        saveBest(g.score);
      }
      setResult({ score: g.score, wave: g.wave, best: bestRef.current, newBest });
      go('over');
    };

    const update = (g, dt) => {
      g.t += dt;
      const p = g.player;

      // Movement: pointer follows smoothly; keys move at fixed speed.
      const speed = 420;
      if (pointerX.current != null) p.x += (pointerX.current - p.x) * Math.min(1, dt * 14);
      if (keys.current.arrowleft || keys.current.a) p.x -= speed * dt;
      if (keys.current.arrowright || keys.current.d) p.x += speed * dt;
      p.x = clamp(p.x, 20, g.w - 20);

      // Auto-fire.
      p.cooldown -= dt;
      if (p.cooldown <= 0) {
        p.cooldown = g.power.coffee > 0 ? 0.08 : 0.17;
        const angles = g.power.spread > 0 ? [-0.22, 0, 0.22] : [0];
        for (const a of angles) g.bullets.push({ x: p.x, y: p.y - 20, vx: Math.sin(a) * 620, vy: -Math.cos(a) * 620, r: 4 });
        play('shoot');
      }
      g.power.coffee = Math.max(0, g.power.coffee - dt);
      g.power.spread = Math.max(0, g.power.spread - dt);
      p.invuln = Math.max(0, p.invuln - dt);

      // Waves.
      if (g.spawnQueue.length) {
        g.spawnTimer -= dt;
        if (g.spawnTimer <= 0) {
          const next = g.spawnQueue.shift();
          spawnEnemy(g, next.type);
          g.spawnTimer = next.delay;
        }
      } else if (!g.enemies.length) {
        queueWave(g);
        play('wave');
      }
      if (g.banner && (g.banner.life -= dt) <= 0) g.banner = null;

      // Combo decay.
      g.comboTimer -= dt;
      if (g.comboTimer <= 0) g.combo = 1;

      // Enemies.
      for (const e of g.enemies) {
        if (e.type === 'boss') {
          e.y = Math.min(e.y + e.vy * dt, 110);
          e.x = g.w / 2 + Math.sin(g.t * 0.9) * (g.w / 2 - 70);
        } else {
          e.y += e.vy * dt;
          const sway = e.type === 'fast' ? 160 : 40;
          e.x = clamp(e.x + Math.cos(g.t * (e.type === 'fast' ? 5 : 2) + e.phase) * sway * dt, e.r, g.w - e.r);
        }
        if (e.type === 'boss' || e.type === 'tank') {
          e.fireTimer -= dt;
          if (e.fireTimer <= 0 && e.y > 0) {
            e.fireTimer = e.type === 'boss' ? 0.7 : rand(1.6, 2.8);
            const spread = e.type === 'boss' ? [-0.35, 0, 0.35] : [0];
            const aim = Math.atan2(p.x - e.x, p.y - e.y);
            for (const s of spread) {
              const a = aim + s;
              g.enemyBullets.push({ x: e.x, y: e.y + e.r, vx: Math.sin(a) * 230, vy: Math.cos(a) * 230, r: 5 });
            }
          }
        }
      }

      // Bullets.
      for (const b of g.bullets) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }
      for (const b of g.enemyBullets) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }

      // Player bullets vs enemies.
      for (const b of g.bullets) {
        for (const e of g.enemies) {
          if (e.hp > 0 && !b.dead && hit(b, e)) {
            b.dead = true;
            e.hp -= 1;
            burst(g, b.x, b.y, PAPER, 3);
            if (e.hp <= 0) {
              g.score += e.score * g.combo;
              g.combo = Math.min(5, g.combo + 1);
              g.comboTimer = 1.2;
              const big = e.type === 'boss';
              burst(g, e.x, e.y, e.type === 'fast' ? TEAL : e.type === 'tank' ? AMBER : MAGENTA, big ? 80 : 18);
              g.shake = big ? 0.6 : 0.12;
              play(big ? 'boom' : 'pop');
              if (big || Math.random() < 0.1) {
                const kinds = Object.keys(POWERUPS);
                g.pickups.push({ x: e.x, y: e.y, r: 12, vy: 90, kind: kinds[Math.floor(Math.random() * kinds.length)] });
              }
            }
          }
        }
      }

      // Damage to the player: enemy bullets and bugs that reach the ship.
      const damage = () => {
        if (p.invuln > 0) return;
        if (p.shield) {
          p.shield = false;
          p.invuln = 0.8;
          play('power');
          return;
        }
        g.lives -= 1;
        p.invuln = 1.6;
        g.combo = 1;
        g.shake = 0.4;
        burst(g, p.x, p.y, MAGENTA, 30);
        play('hurt');
      };
      for (const b of g.enemyBullets) {
        if (!b.dead && hit(b, p)) {
          b.dead = true;
          damage();
        }
      }
      for (const e of g.enemies) {
        if (e.hp > 0 && hit(e, p)) {
          if (e.type !== 'boss') e.hp = 0;
          damage();
        }
        // A bug that slips past costs a life: it shipped to production.
        if (e.hp > 0 && e.y - e.r > g.h) {
          e.hp = 0;
          g.lives -= 1;
          g.combo = 1;
          g.shake = 0.25;
          play('hurt');
        }
      }

      // Pickups.
      for (const k of g.pickups) {
        k.y += k.vy * dt;
        if (!k.dead && hit(k, p)) {
          k.dead = true;
          if (k.kind === 'shield') p.shield = true;
          else g.power[k.kind] = POWERUPS[k.kind].duration;
          g.score += 50;
          play('power');
        }
      }

      // Particles.
      for (const pt of g.particles) {
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        pt.vx *= 0.96;
        pt.vy *= 0.96;
        pt.life -= dt;
      }

      // Cleanup.
      const onScreen = (o) => !o.dead && o.y > -60 && o.y < g.h + 60 && o.x > -60 && o.x < g.w + 60;
      g.bullets = g.bullets.filter(onScreen);
      g.enemyBullets = g.enemyBullets.filter(onScreen);
      g.pickups = g.pickups.filter(onScreen);
      g.enemies = g.enemies.filter((e) => e.hp > 0);
      g.particles = g.particles.filter((pt) => pt.life > 0);
      g.shake = Math.max(0, g.shake - dt);

      if (g.lives <= 0) endGame(g);
    };

    const draw = (g, dt, playing) => {
      ctx.save();
      ctx.fillStyle = INK;
      ctx.fillRect(0, 0, g.w, g.h);
      if (g.shake > 0 && !reduceMotion.current) ctx.translate(rand(-1, 1) * g.shake * 14, rand(-1, 1) * g.shake * 14);

      // Starfield (drifts slowly even on menus).
      for (const s of g.stars) {
        s.y += s.s * 40 * dt;
        if (s.y > g.h) {
          s.y = 0;
          s.x = rand(0, g.w);
        }
        ctx.fillStyle = `rgba(245,245,245,${0.15 + s.s * 0.25})`;
        ctx.fillRect(s.x, s.y, s.s * 1.5, s.s * 1.5);
      }

      if (playing) {
        for (const k of g.pickups) drawPickup(ctx, k, g.t);
        for (const e of g.enemies) drawBug(ctx, e, g.t);
        ctx.fillStyle = PAPER;
        for (const b of g.bullets) ctx.fillRect(b.x - 2, b.y - 7, 4, 12);
        ctx.fillStyle = AMBER;
        for (const b of g.enemyBullets) {
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fill();
        }
        for (const pt of g.particles) {
          ctx.globalAlpha = Math.max(0, pt.life * 1.6);
          ctx.fillStyle = pt.color;
          ctx.fillRect(pt.x - 2, pt.y - 2, 4, 4);
        }
        ctx.globalAlpha = 1;
        drawPlayer(ctx, g.player, g.t);
      }
      ctx.restore();
      if (playing) drawHud(ctx, g, bestRef.current);
    };

    const frame = (now) => {
      const dt = Math.min(0.033, (now - last) / 1000); // clamp so a stalled tab can't teleport things
      last = now;
      const g = gameRef.current;
      const ph = phaseRef.current;
      if (ph === 'playing' && g) {
        update(g, dt);
        draw(g, dt, true);
      } else if ((ph === 'paused' || ph === 'over') && g) {
        draw(g, 0, true);
      } else {
        if (idle.w !== c.clientWidth || idle.h !== c.clientHeight) idle = newGame(c.clientWidth, c.clientHeight);
        draw(idle, dt, false);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-dark/70">
          <kbd className="rounded border border-dark/30 px-1.5 font-mono text-xs">←</kbd>{' '}
          <kbd className="rounded border border-dark/30 px-1.5 font-mono text-xs">→</kbd> or mouse / finger to move · auto-fire ·{' '}
          <kbd className="rounded border border-dark/30 px-1.5 font-mono text-xs">P</kbd> pause
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSound((s) => !s)}
            aria-pressed={sound}
            className="rounded-lg border-2 border-solid border-dark px-3 py-1.5 text-sm font-semibold"
          >
            Sound: {sound ? 'on' : 'off'}
          </button>
          {(phase === 'playing' || phase === 'paused') && (
            <button
              type="button"
              onClick={togglePause}
              className="rounded-lg border-2 border-solid border-transparent bg-dark px-3 py-1.5 text-sm font-semibold text-light"
            >
              {phase === 'paused' ? 'Resume' : 'Pause'}
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-0 -right-2 sm:-right-3 -z-10 h-[102%] w-[101%] rounded-[2rem] bg-dark" aria-hidden="true" />
        <div ref={wrapRef} className="relative overflow-hidden rounded-3xl border-2 border-solid border-dark">
          <canvas
            ref={canvasRef}
            tabIndex={0}
            role="img"
            aria-label="Bug Blaster game area"
            className="block w-full touch-none select-none outline-none"
          />

          {phase !== 'playing' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark/70 px-6 text-center text-light">
              {phase === 'ready' && (
                <>
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary">Arcade</p>
                  <h2 className="mt-2 text-4xl font-bold sm:text-6xl">Bug Blaster</h2>
                  <p className="mt-4 max-w-md text-sm font-medium text-light/80 sm:text-base">
                    Bugs are swarming the codebase. Blast them before they ship to production. Grab{' '}
                    <span className="text-[#f8a547]">coffee</span> for rapid fire, <span className="text-[#58E6D9]">spread</span>{' '}
                    for a triple shot and a <span className="text-light">shield</span> to soak a hit.
                  </p>
                </>
              )}
              {phase === 'paused' && <h2 className="text-4xl font-bold sm:text-5xl">Paused</h2>}
              {phase === 'over' && (
                <div aria-live="polite">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary">Build failed</p>
                  <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Game over</h2>
                  <p className="mt-4 text-lg font-medium">
                    Score <span className="font-mono font-bold">{result.score.toLocaleString()}</span> · reached sprint {result.wave}
                  </p>
                  <p className="mt-1 text-sm text-light/70">
                    {result.newBest ? 'New personal best!' : `Best: ${result.best.toLocaleString()}`}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={phase === 'paused' ? togglePause : start}
                className="mt-8 rounded-lg border-2 border-solid border-light bg-light px-8 py-3 text-lg font-semibold text-dark hover:bg-transparent hover:text-light"
              >
                {phase === 'ready' ? 'Start game' : phase === 'paused' ? 'Resume' : 'Play again'}
              </button>
              {phase === 'ready' && result.best > 0 && (
                <p className="mt-3 font-mono text-xs text-light/60">Best: {result.best.toLocaleString()}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BugBlaster;
