import React, { useCallback, useEffect, useRef, useState } from 'react';

// Bubble wrap: click, tap or drag across the sheet to pop. A few bubbles hide a bug.
// Pops are synthesised with Web Audio (no audio files) and vibrate on phones.

const COUNT = 48;
const BUG_CHANCE = 0.08;
const STORAGE_KEY = 'bubblewrap:v1';

// Small seeded PRNG so the first sheet is identical on server and client (no hydration mismatch).
const mulberry32 = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const makeSheet = (rand) => Array.from({ length: COUNT }, () => ({ popped: false, bug: rand() < BUG_CHANCE }));

const readStats = () => {
  try {
    return { pops: 0, bugs: 0, sheets: 0, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return { pops: 0, bugs: 0, sheets: 0 };
  }
};

const writeStats = (stats) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // Private mode or blocked storage: stats just won't persist.
  }
};

// A short burst of filtered noise with a fast decay sounds like a bubble pop.
const usePopSound = (enabled) => {
  const ctxRef = useRef(null);
  return useCallback(
    (bug) => {
      if (!enabled || typeof window === 'undefined') return;
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = ctxRef.current || (ctxRef.current = new Ctx());
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const length = Math.floor(ctx.sampleRate * 0.06);
      const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = (bug ? 600 : 1400) + Math.random() * 900;
      filter.Q.value = 1.2;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start(now);
    },
    [enabled],
  );
};

const BugIcon = () => (
  <svg viewBox="0 0 24 24" className="h-1/2 w-1/2" aria-hidden="true">
    <g fill="none" stroke="#1b1b1b" strokeWidth="1.8" strokeLinecap="round">
      <path d="M8 4l2 2M16 4l-2 2M4 12h3M17 12h3M5 18l3-2M19 18l-3-2M5 7l3 2M19 7l-3 2" />
    </g>
    <ellipse cx="12" cy="13" rx="5" ry="6.5" fill="#B63E96" stroke="#1b1b1b" strokeWidth="1.8" />
    <path d="M12 7v12.5" stroke="#1b1b1b" strokeWidth="1.5" />
  </svg>
);

const BubbleWrap = () => {
  const [sheet, setSheet] = useState(() => makeSheet(mulberry32(404)));
  const [stats, setStats] = useState({ pops: 0, bugs: 0, sheets: 0 });
  const [sound, setSound] = useState(true);
  const dragging = useRef(false);
  const playPop = usePopSound(sound);

  const statsRef = useRef(stats);
  useEffect(() => {
    statsRef.current = readStats();
    setStats(statsRef.current);
  }, []);

  const remaining = sheet.filter((b) => !b.popped).length;
  const bugsLeft = sheet.filter((b) => b.bug && !b.popped).length;
  const cleared = remaining === 0;

  // The ref is the source of truth during a drag (many pops per frame); side effects
  // stay out of state updaters, which StrictMode runs twice in development.
  const sheetRef = useRef(sheet);
  const pop = useCallback(
    (i) => {
      const prev = sheetRef.current;
      if (prev[i].popped) return;
      const next = prev.slice();
      next[i] = { ...prev[i], popped: true };
      sheetRef.current = next;
      setSheet(next);

      const { bug } = prev[i];
      playPop(bug);
      if (navigator.vibrate) navigator.vibrate(bug ? 20 : 8);
      const s = statsRef.current;
      const updated = { pops: s.pops + 1, bugs: s.bugs + (bug ? 1 : 0), sheets: s.sheets + (next.every((b) => b.popped) ? 1 : 0) };
      statsRef.current = updated;
      setStats(updated);
      writeStats(updated);
    },
    [playPop],
  );

  const freshSheet = () => {
    const next = makeSheet(Math.random);
    sheetRef.current = next;
    setSheet(next);
  };

  // Drag-to-pop. Touch drags keep firing on the first element, so hit-test by coordinates.
  const popAt = (x, y) => {
    const el = document.elementFromPoint(x, y)?.closest('[data-bubble]');
    if (el) pop(Number(el.dataset.bubble));
  };
  const onPointerDown = (e) => {
    dragging.current = true;
    popAt(e.clientX, e.clientY);
  };
  const onPointerMove = (e) => {
    if (dragging.current) popAt(e.clientX, e.clientY);
  };
  useEffect(() => {
    const stop = () => (dragging.current = false);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    return () => {
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Status bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-medium text-dark/75" aria-live="polite">
          {cleared ? (
            <span className="font-bold text-dark">Sheet cleared. Breathe out.</span>
          ) : (
            <>
              <span className="font-bold text-dark tabular-nums">{remaining}</span> bubbles left
              {bugsLeft > 0 && (
                <>
                  {' '}
                  · <span className="font-bold text-primary tabular-nums">{bugsLeft}</span> hidden {bugsLeft === 1 ? 'bug' : 'bugs'}
                </>
              )}
            </>
          )}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSound((s) => !s)}
            aria-pressed={sound}
            className="rounded-lg border-2 border-solid border-dark px-4 py-2 font-semibold"
          >
            Sound: {sound ? 'on' : 'off'}
          </button>
          <button
            type="button"
            onClick={freshSheet}
            className="rounded-lg border-2 border-solid border-transparent bg-dark px-4 py-2 font-semibold text-light hover:border-dark hover:bg-light hover:text-dark"
          >
            Fresh sheet
          </button>
        </div>
      </div>

      {/* The sheet */}
      <div className="relative">
        <div className="absolute top-0 -right-2 sm:-right-3 -z-10 h-[103%] w-[101%] rounded-[2rem] bg-dark" aria-hidden="true" />
        <div
          role="group"
          aria-label="Bubble wrap sheet"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          className="grid touch-none select-none grid-cols-6 gap-2 rounded-3xl border-2 border-solid border-dark bg-[#eef0f2] p-3 sm:grid-cols-8 sm:gap-3 sm:p-6"
        >
          {sheet.map((b, i) => (
            <button
              key={i}
              type="button"
              data-bubble={i}
              aria-label={b.popped ? (b.bug ? 'Popped, bug squashed' : 'Popped') : 'Bubble'}
              aria-pressed={b.popped}
              // Pointer pops are handled on the sheet; this keeps keyboard (Enter/Space) working.
              onClick={(e) => e.detail === 0 && pop(i)}
              className={`flex aspect-square items-center justify-center rounded-full transition-transform duration-150 motion-reduce:transition-none ${
                b.popped
                  ? 'scale-90 border border-dark/15 bg-dark/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.12)]'
                  : 'border border-dark/20 bg-[radial-gradient(circle_at_32%_28%,#ffffff_0,#ffffff_14%,rgba(182,62,150,0.12)_45%,rgba(182,62,150,0.32)_100%)] shadow-[0_3px_6px_rgba(27,27,27,0.18)] hover:scale-105 active:scale-95'
              }`}
            >
              {b.popped && b.bug && <BugIcon />}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm font-medium text-dark/60 tabular-nums">
        All-time: {stats.pops.toLocaleString()} pops · {stats.bugs} bugs squashed · {stats.sheets} sheets cleared
      </p>
    </div>
  );
};

export default BubbleWrap;
