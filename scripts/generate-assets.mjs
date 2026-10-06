// Generates the favicon set and the Open Graph share card into /public.
// Run with `npm run assets` after changing the name, title or logo.
//
// Renders with the satori/resvg engine that ships inside Next.js, so no extra
// dependencies are needed. Uses Segoe UI where available (the font the site
// itself renders in on Windows), falling back to the bundled Noto Sans.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import React from 'react';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// The bundled module resolves its font/wasm files with path.join() on a URL,
// which breaks on Windows. Load a temporary copy with those lines corrected.
const loadImageResponse = async () => {
  const src = path.join(root, 'node_modules/next/dist/compiled/@vercel/og');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'og-'));
  fs.cpSync(src, tmp, { recursive: true });
  const entry = path.join(tmp, 'index.node.js');
  const code = fs
    .readFileSync(entry, 'utf8')
    .replace(/fileURLToPath\(join\(import\.meta\.url, "\.\.\/([^"]+)"\)\)/g, 'fileURLToPath(new URL("./$1", import.meta.url))');
  fs.writeFileSync(entry, code);
  return (await import(pathToFileURL(entry).href)).ImageResponse;
};
const ImageResponse = await loadImageResponse();
const pub = (...p) => path.join(root, 'public', ...p);
const h = React.createElement;

const INK = '#1b1b1b';
const PAPER = '#f5f5f5';
const ACCENT = '#B63E96';

const readFont = (file) => {
  const candidates = [path.join('C:/Windows/Fonts', file), path.join('/usr/share/fonts/truetype/msttcorefonts', file)];
  const found = candidates.find((p) => fs.existsSync(p));
  return found ? fs.readFileSync(found) : null;
};
const regular = readFont('segoeui.ttf');
const bold = readFont('segoeuib.ttf');
const fonts =
  regular && bold
    ? [
        { name: 'Site', data: regular, weight: 400, style: 'normal' },
        { name: 'Site', data: bold, weight: 700, style: 'normal' },
      ]
    : undefined;
const family = fonts ? 'Site' : undefined;

const render = async (element, width, height) => {
  const res = new ImageResponse(element, { width, height, fonts });
  return Buffer.from(await res.arrayBuffer());
};

// --- Logo mark: the ink circle with "ESE", as in the navbar -------------------
const mark = (size) =>
  h(
    'div',
    {
      style: {
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: INK,
        color: PAPER,
        fontFamily: family,
        fontWeight: 700,
        fontSize: Math.round(size * 0.36),
        letterSpacing: Math.round(size * -0.01),
      },
    },
    'ESE',
  );

// --- ICO container holding PNG images (supported by every modern browser) ---
const toIco = (pngs) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
};

// --- Open Graph card: same paper, ink and offset-shadow card as the site -----
const portrait = `data:image/png;base64,${fs.readFileSync(pub('images/profile/developer-pic-1.png')).toString('base64')}`;
const ogCard = h(
  'div',
  { style: { width: 1200, height: 630, display: 'flex', background: PAPER, padding: 48, fontFamily: family } },
  h(
    'div',
    { style: { position: 'relative', display: 'flex', width: '100%', height: '100%' } },
    h('div', { style: { position: 'absolute', top: 0, left: 14, right: -14, bottom: -14, borderRadius: 40, background: INK } }),
    h(
      'div',
      {
        style: {
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          borderRadius: 32,
          border: `4px solid ${INK}`,
          background: PAPER,
          padding: '48px 56px',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
      },
      h(
        'div',
        { style: { display: 'flex', flexDirection: 'column', maxWidth: 660 } },
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 20 } },
          mark(84),
          h('div', { style: { display: 'flex', fontSize: 30, fontWeight: 700, color: ACCENT } }, 'CODEwithESE'),
        ),
        h('div', { style: { display: 'flex', marginTop: 40, fontSize: 76, fontWeight: 700, color: INK, lineHeight: 1.05 } }, 'David Ojiyovwi'),
        h('div', { style: { display: 'flex', marginTop: 18, fontSize: 36, fontWeight: 700, color: '#1e40af' } }, 'Senior / Lead Full-Stack Software Engineer'),
        h(
          'div',
          { style: { display: 'flex', marginTop: 28, fontSize: 26, color: '#444', lineHeight: 1.4 } },
          '6+ years building enterprise web, mobile and backend platforms. Next.js · NestJS · Django · React Native',
        ),
      ),
      h('img', { src: portrait, width: 380, height: 380, style: { objectFit: 'contain' } }),
    ),
  ),
);

const main = async () => {
  const sizes = [16, 32, 48];
  const icoPngs = [];
  for (const size of sizes) icoPngs.push({ size, data: await render(mark(size), size, size) });
  fs.writeFileSync(pub('favicon.ico'), toIco(icoPngs));

  fs.writeFileSync(pub('apple-touch-icon.png'), await render(mark(180), 180, 180));
  fs.writeFileSync(pub('icon-192.png'), await render(mark(192), 192, 192));
  fs.writeFileSync(pub('icon-512.png'), await render(mark(512), 512, 512));
  fs.writeFileSync(pub('og.png'), await render(ogCard, 1200, 630));

  console.log('Wrote favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png and og.png to /public');
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
