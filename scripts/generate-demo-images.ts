/**
 * Demo görsel üretici.
 *
 * Gerçek stüdyo fotoğrafları henüz olmadığı için marka diline uygun, prosedürel
 * olarak üretilmiş yer tutucu görseller oluşturur (mürekkep çizgileri, tentakül
 * konturları, sentetik deri yüzeyi, çerçeve). Her görselin köşesinde "DEMO GÖRSEL"
 * ibaresi vardır. Çıktı: public/demo/*.webp + public/demo/manifest.json
 *
 * Gerçek fotoğraflar yönetim panelinden yüklendiğinde bu dosyalar kullanılmaz.
 *   npm run demo:images
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = path.resolve("public/demo");
if (fs.existsSync(path.join(OUT, "photo-sources.json"))) {
  console.log("Gerçek stok fotoğraflar mevcut. Yenilemek için: node scripts/import-tattoo-photos.mjs");
  process.exit(0);
}
fs.mkdirSync(OUT, { recursive: true });

type Rand = () => number;
function rng(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const INK = "#16110f";
const RED = "#A8323E";
const f = (n: number) => n.toFixed(1);

/** Uca doğru incelen, spiral kıvrımla biten tentakül konturu. */
function tentacle(r: Rand, x: number, y: number, angle: number, length: number, width: number, curl: number, opts: { suckers?: boolean; color?: string; stroke?: number } = {}) {
  const steps = 90;
  const pts: { x: number; y: number; a: number }[] = [];
  let a = angle;
  let px = x, py = y;
  const seg = length / steps;
  const wobble = r() * 0.6 + 0.2;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push({ x: px, y: py, a });
    a += curl * Math.pow(t, 2.2) * 0.22 + Math.sin(t * 6 + wobble * 10) * 0.012;
    px += Math.cos(a) * seg * (1 - t * 0.55);
    py += Math.sin(a) * seg * (1 - t * 0.55);
  }
  const left: string[] = [], right: string[] = [];
  pts.forEach((p, i) => {
    const t = i / steps;
    const w = (width * Math.pow(1 - t, 0.85)) / 2 + 0.6;
    const nx = -Math.sin(p.a), ny = Math.cos(p.a);
    left.push(`${f(p.x + nx * w)},${f(p.y + ny * w)}`);
    right.unshift(`${f(p.x - nx * w)},${f(p.y - ny * w)}`);
  });
  const color = opts.color ?? INK;
  const sw = opts.stroke ?? Math.max(1.4, width / 18);
  let out = `<path d="M${left.join(" L")} L${right.join(" L")} Z" fill="none" stroke="${color}" stroke-width="${f(sw)}" stroke-linejoin="round"/>`;
  // İç kontur — ince ikinci çizgi
  const mid = pts.filter((_, i) => i % 2 === 0).map((p, i, arr) => {
    const t = (i * 2) / steps;
    const w = (width * Math.pow(1 - t, 0.85)) / 2 * 0.45;
    const nx = -Math.sin(p.a), ny = Math.cos(p.a);
    void arr;
    return `${f(p.x + nx * w)},${f(p.y + ny * w)}`;
  });
  out += `<path d="M${mid.slice(0, Math.floor(mid.length * 0.8)).join(" L")}" fill="none" stroke="${color}" stroke-width="${f(sw * 0.45)}" opacity="0.8"/>`;
  if (opts.suckers !== false) {
    for (let i = 6; i < steps * 0.78; i += 4) {
      const p = pts[i]!;
      const t = i / steps;
      const w = (width * Math.pow(1 - t, 0.85)) / 2;
      const nx = -Math.sin(p.a), ny = Math.cos(p.a);
      const cx = p.x - nx * w * 0.62, cy = p.y - ny * w * 0.62;
      const rr = Math.max(1.2, w * 0.22);
      out += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rr)}" ry="${f(rr * 0.8)}" transform="rotate(${f((p.a * 180) / Math.PI)} ${f(cx)} ${f(cy)})" fill="none" stroke="${color}" stroke-width="${f(sw * 0.6)}"/>`;
    }
  }
  return out;
}

/** Noktalama (dotwork) gölgesi */
function stipple(r: Rand, cx: number, cy: number, radius: number, count: number, color = INK) {
  let s = "";
  for (let i = 0; i < count; i++) {
    const ang = r() * Math.PI * 2;
    const d = Math.pow(r(), 1.8) * radius;
    s += `<circle cx="${f(cx + Math.cos(ang) * d)}" cy="${f(cy + Math.sin(ang) * d)}" r="${f(0.6 + r() * 1.3)}" fill="${color}" opacity="${f(0.35 + r() * 0.5)}"/>`;
  }
  return s;
}

function ornament(r: Rand, cx: number, cy: number, radius: number) {
  let s = "";
  const rings = 2 + Math.floor(r() * 3);
  for (let i = 0; i < rings; i++) {
    s += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(radius * (1 - i * 0.18))}" fill="none" stroke="${INK}" stroke-width="${i === 0 ? 2.2 : 1}"/>`;
  }
  const petals = 8 + Math.floor(r() * 3) * 4;
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * radius * 0.35, y1 = cy + Math.sin(a) * radius * 0.35;
    const x2 = cx + Math.cos(a) * radius * 0.8, y2 = cy + Math.sin(a) * radius * 0.8;
    const ca = a + 0.35;
    s += `<path d="M${f(x1)},${f(y1)} Q${f(cx + Math.cos(ca) * radius * 0.7)},${f(cy + Math.sin(ca) * radius * 0.7)} ${f(x2)},${f(y2)}" fill="none" stroke="${INK}" stroke-width="1.2"/>`;
  }
  return s;
}

function redArc(cx: number, cy: number, radius: number, a0: number, a1: number, sw = 2) {
  const p = (a: number) => `${f(cx + Math.cos(a) * radius)},${f(cy + Math.sin(a) * radius)}`;
  return `<path d="M${p(a0)} A${f(radius)},${f(radius)} 0 0 1 ${p(a1)}" fill="none" stroke="${RED}" stroke-width="${sw}" stroke-linecap="round"/>`;
}

function grainFilter(id: string, opacity = 0.18, freq = 0.9) {
  return `<filter id="${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="7" result="n"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="${opacity}"/></feComponentTransfer>
    <feComposite in2="SourceGraphic" operator="in"/>
  </filter>`;
}

function demoLabel(w: number, h: number, light = true) {
  const size = Math.round(Math.max(w, h) * 0.011) + 6;
  return `<g font-family="Arial, Helvetica, sans-serif" font-size="${size}" letter-spacing="${size * 0.25}" fill="${light ? "#f2eee7" : "#1a1514"}" opacity="0.55">
    <text x="${size * 1.6}" y="${h - size * 1.6}">DEMO GÖRSEL</text></g>`;
}

/** Tenin üzerinde dövme — "çalışma" yer tutucusu */
function workSvg(seed: number, w: number, h: number) {
  const r = rng(seed);
  const hue = 22 + r() * 10;
  const skinA = `hsl(${f(hue)} 32% ${f(70 + r() * 8)}%)`;
  const skinB = `hsl(${f(hue - 4)} 28% ${f(38 + r() * 10)}%)`;
  const cx = w * (0.4 + r() * 0.2), cy = h * (0.4 + r() * 0.2);
  let art = "";
  const variant = seed % 4;
  const scale = Math.min(w, h);
  if (variant === 0) {
    for (let i = 0; i < 4; i++) {
      art += tentacle(r, cx + (r() - 0.5) * scale * 0.1, cy + (r() - 0.5) * scale * 0.1, -Math.PI / 2 + (i - 1.5) * 0.7 + r() * 0.3, scale * (0.55 + r() * 0.2), scale * 0.07, (i % 2 ? 1 : -1) * (3 + r() * 2));
    }
    art += stipple(r, cx, cy, scale * 0.08, 380);
  } else if (variant === 1) {
    art += ornament(r, cx, cy, scale * 0.24);
    art += tentacle(r, cx - scale * 0.28, cy + scale * 0.32, -0.9, scale * 0.7, scale * 0.06, 4.2);
    art += stipple(r, cx, cy, scale * 0.05, 260);
  } else if (variant === 2) {
    for (let i = 0; i < 7; i++) {
      art += tentacle(r, w * 0.5 + (r() - 0.5) * w * 0.3, h * 0.92, -Math.PI / 2 + (r() - 0.5) * 1.2, h * (0.45 + r() * 0.35), scale * (0.025 + r() * 0.03), (r() > 0.5 ? 1 : -1) * (3 + r() * 4), { suckers: r() > 0.4 });
    }
  } else {
    art += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(scale * 0.16)}" fill="${INK}" opacity="0.92"/>`;
    art += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(scale * 0.2)}" fill="none" stroke="${INK}" stroke-width="1.4"/>`;
    for (let i = 0; i < 5; i++) {
      art += tentacle(r, cx, cy + scale * 0.12, Math.PI / 2 + (i - 2) * 0.45, scale * (0.5 + r() * 0.15), scale * 0.055, (i - 2) * 1.6 + 0.5);
    }
    art += redArc(cx, cy, scale * 0.235, 3.6, 5.2);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="skin" cx="${f(0.35 + r() * 0.3)}" cy="0.35" r="0.95">
      <stop offset="0" stop-color="${skinA}"/><stop offset="0.7" stop-color="${skinB}"/><stop offset="1" stop-color="#0b0b0c"/>
    </radialGradient>
    ${grainFilter("g", 0.22, 1.1)}
  </defs>
  <rect width="100%" height="100%" fill="url(#skin)"/>
  <g opacity="0.9">${art}</g>
  <rect width="100%" height="100%" fill="#000" filter="url(#g)"/>
  ${demoLabel(w, h)}
</svg>`;
}

/** Sentetik deri parçası (fake skin) — ürünün kendisi */
function skinPiece(r: Rand, x: number, y: number, w: number, h: number, seed: number) {
  const jag = (n: number) => (r() - 0.5) * n;
  const e = Math.min(w, h) * 0.015;
  const d = `M${f(x + jag(e))},${f(y + jag(e))} L${f(x + w * 0.5 + jag(e))},${f(y + jag(e))} L${f(x + w + jag(e))},${f(y + jag(e))} L${f(x + w + jag(e))},${f(y + h * 0.5 + jag(e))} L${f(x + w + jag(e))},${f(y + h + jag(e))} L${f(x + w * 0.5 + jag(e))},${f(y + h + jag(e))} L${f(x + jag(e))},${f(y + h + jag(e))} L${f(x + jag(e))},${f(y + h * 0.5 + jag(e))} Z`;
  const scale = Math.min(w, h);
  const cx = x + w / 2, cy = y + h / 2;
  let art = "";
  const v = seed % 3;
  if (v === 0) {
    for (let i = 0; i < 5; i++) art += tentacle(r, cx, cy - scale * 0.05, -Math.PI / 2 + (i - 2) * 0.8, scale * 0.42, scale * 0.06, (i - 2) * 1.5 + 0.7);
    art += `<circle cx="${f(cx)}" cy="${f(cy - scale * 0.05)}" r="${f(scale * 0.07)}" fill="${INK}"/>`;
  } else if (v === 1) {
    art += ornament(r, cx, cy, scale * 0.3);
    art += tentacle(r, x + w * 0.15, y + h * 0.85, -0.7, scale * 0.6, scale * 0.045, 4.5, { color: RED, stroke: 1.6 });
  } else {
    for (let i = 0; i < 3; i++) art += tentacle(r, x + w * (0.25 + i * 0.25), y + h * 0.9, -Math.PI / 2 + (r() - 0.5) * 0.4, h * 0.7, scale * 0.05, (i - 1) * 3 + 1);
    art += stipple(r, cx, cy, scale * 0.12, 420);
  }
  return `<clipPath id="pc${seed}"><path d="${d}"/></clipPath>
    <path d="${d}" fill="url(#fakeskin)" />
    <g clip-path="url(#pc${seed})" opacity="0.9">${art}</g>
    <path d="${d}" fill="none" stroke="#8a7464" stroke-width="1" opacity="0.6"/>`;
}

/** Duvarda çerçeveli eser (veya çerçevesiz pano) — ürün ana görseli */
function productSvg(seed: number, w: number, h: number, framed: boolean, artRatio: number) {
  const r = rng(seed);
  const frameW = w * 0.62;
  const frameH = frameW / artRatio;
  const fx = (w - frameW) / 2, fy = (h - frameH) / 2 - h * 0.02;
  const border = frameW * 0.045;
  const mat = frameW * 0.11;
  const skinX = fx + border + mat, skinY = fy + border + mat;
  const skinW = frameW - 2 * (border + mat), skinH = frameH - 2 * (border + mat);
  const frame = framed
    ? `<rect x="${f(fx + 14)}" y="${f(fy + 22)}" width="${f(frameW)}" height="${f(frameH)}" fill="#000" opacity="0.55" filter="url(#blur)"/>
       <rect x="${f(fx)}" y="${f(fy)}" width="${f(frameW)}" height="${f(frameH)}" fill="#0e0d0d"/>
       <rect x="${f(fx + 2)}" y="${f(fy + 2)}" width="${f(frameW - 4)}" height="${f(frameH - 4)}" fill="none" stroke="#2d2a28" stroke-width="2"/>
       <rect x="${f(fx + border)}" y="${f(fy + border)}" width="${f(frameW - 2 * border)}" height="${f(frameH - 2 * border)}" fill="#e7e1d6"/>
       <rect x="${f(fx + border)}" y="${f(fy + border)}" width="${f(frameW - 2 * border)}" height="${f(frameH - 2 * border)}" fill="none" stroke="#000" stroke-opacity="0.25" stroke-width="6"/>`
    : `<rect x="${f(fx + 10)}" y="${f(fy + 16)}" width="${f(frameW)}" height="${f(frameH)}" fill="#000" opacity="0.5" filter="url(#blur)"/>
       <rect x="${f(fx)}" y="${f(fy)}" width="${f(frameW)}" height="${f(frameH)}" fill="#1d1b1a"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="wall" cx="0.5" cy="0.18" r="0.9"><stop offset="0" stop-color="#2a2827"/><stop offset="0.6" stop-color="#151416"/><stop offset="1" stop-color="#0b0b0c"/></radialGradient>
    <linearGradient id="fakeskin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2c8b0"/><stop offset="1" stop-color="#c9a78c"/></linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="16"/></filter>
    ${grainFilter("g", 0.16)}
  </defs>
  <rect width="100%" height="100%" fill="url(#wall)"/>
  ${frame}
  ${skinPiece(r, skinX, skinY, skinW, skinH, seed)}
  <rect width="100%" height="100%" fill="#000" filter="url(#g)"/>
  ${demoLabel(w, h)}
</svg>`;
}

/** Yakın plan doku — ürün detay görseli */
function detailSvg(seed: number, w: number, h: number) {
  const r = rng(seed);
  let art = "";
  for (let i = 0; i < 3; i++) art += tentacle(r, w * (0.1 + r() * 0.3), h * (0.7 + r() * 0.3), -0.6 - r() * 0.6, w * 1.1, w * 0.16, 2.5 + r() * 2, { stroke: 4 });
  art += stipple(r, w * 0.6, h * 0.4, w * 0.25, 900);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e5ccb5"/><stop offset="1" stop-color="#b8937a"/></linearGradient>${grainFilter("g", 0.3, 1.4)}</defs>
  <rect width="100%" height="100%" fill="url(#s)"/>${art}
  <rect width="100%" height="100%" fill="#000" filter="url(#g)"/>${demoLabel(w, h)}</svg>`;
}

/** Atmosfer: karanlık mekân, ışık hüzmesi, tentakül çizgileri */
function atmosphereSvg(seed: number, w: number, h: number) {
  const r = rng(seed);
  let lines = "";
  for (let i = 0; i < 5; i++) lines += tentacle(r, w * (0.55 + r() * 0.4), h * (0.95 + r() * 0.1), -Math.PI / 2 - 0.3 + r() * 0.5, h * (0.6 + r() * 0.4), w * 0.02, (r() - 0.5) * 8, { color: "#f2eee7", stroke: 1.1, suckers: false });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="beam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2eee7" stop-opacity="0.22"/><stop offset="0.6" stop-color="#f2eee7" stop-opacity="0"/></linearGradient>
    <radialGradient id="pool" cx="0.32" cy="0.78" r="0.5"><stop offset="0" stop-color="#3a2a26"/><stop offset="1" stop-color="#0b0b0c" stop-opacity="0"/></radialGradient>
    ${grainFilter("g", 0.2)}
  </defs>
  <rect width="100%" height="100%" fill="#0d0c0d"/>
  <rect width="100%" height="100%" fill="url(#pool)"/>
  <polygon points="${f(w * 0.12)},0 ${f(w * 0.34)},0 ${f(w * 0.62)},${h} ${f(w * 0.18)},${h}" fill="url(#beam)"/>
  <rect x="${f(w * 0.08)}" y="${f(h * 0.12)}" width="${f(w * 0.3)}" height="${f(h * 0.5)}" fill="none" stroke="#f2eee7" stroke-opacity="0.12"/>
  <line x1="0" y1="${f(h * 0.82)}" x2="${w}" y2="${f(h * 0.8)}" stroke="#f2eee7" stroke-opacity="0.08"/>
  <g opacity="0.35">${lines}</g>
  <circle cx="${f(w * 0.3)}" cy="${f(h * 0.74)}" r="${f(w * 0.012)}" fill="${RED}" opacity="0.8"/>
  <rect width="100%" height="100%" fill="#000" filter="url(#g)"/>
  ${demoLabel(w, h)}
</svg>`;
}

/** Hero: ışıkla vurgulanmış büyük fake skin eser */
function heroSvg(w: number, h: number) {
  const r = rng(4242);
  const pieceW = w * 0.74, pieceH = h * 0.7;
  const x = (w - pieceW) / 2, y = h * 0.12;
  let art = "";
  const cx = x + pieceW / 2, cy = y + pieceH * 0.38;
  art += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(pieceW * 0.12)}" fill="${INK}"/>`;
  art += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(pieceW * 0.155)}" fill="none" stroke="${INK}" stroke-width="2"/>`;
  art += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(pieceW * 0.175)}" fill="none" stroke="${INK}" stroke-width="0.9"/>`;
  for (let i = 0; i < 8; i++) art += tentacle(r, cx + (i - 3.5) * pieceW * 0.02, cy + pieceW * 0.1, Math.PI / 2 + (i - 3.5) * 0.32, pieceH * (0.6 + r() * 0.2), pieceW * 0.06, (i - 3.5) * 1.1 + (r() - 0.5));
  art += stipple(r, cx, cy, pieceW * 0.2, 700);
  art += redArc(cx, cy, pieceW * 0.2, 3.4, 5.4, 3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="bg" cx="0.5" cy="0.3" r="0.85"><stop offset="0" stop-color="#262222"/><stop offset="0.7" stop-color="#0f0e0f"/><stop offset="1" stop-color="#0b0b0c"/></radialGradient>
    <linearGradient id="fakeskin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8cfb8"/><stop offset="1" stop-color="#b48d73"/></linearGradient>
    <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.55"/></linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="24"/></filter>
    ${grainFilter("g", 0.2)}
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect x="${f(x + 20)}" y="${f(y + 30)}" width="${f(pieceW)}" height="${f(pieceH)}" fill="#000" opacity="0.6" filter="url(#blur)"/>
  <clipPath id="hc"><rect x="${f(x)}" y="${f(y)}" width="${f(pieceW)}" height="${f(pieceH)}"/></clipPath>
  <rect x="${f(x)}" y="${f(y)}" width="${f(pieceW)}" height="${f(pieceH)}" fill="url(#fakeskin)"/>
  <g clip-path="url(#hc)">${art}<rect x="${f(x)}" y="${f(y)}" width="${f(pieceW)}" height="${f(pieceH)}" fill="url(#shade)"/></g>
  <rect width="100%" height="100%" fill="#000" filter="url(#g)"/>
  ${demoLabel(w, h)}
</svg>`;
}

type Entry = { file: string; width: number; height: number; alt: string };
const manifest: Record<string, Entry> = {};

async function render(name: string, svg: string, alt: string) {
  const file = `${name}.webp`;
  const info = await sharp(Buffer.from(svg)).webp({ quality: 86 }).toFile(path.join(OUT, file));
  manifest[name] = { file: `/demo/${file}`, width: info.width, height: info.height, alt };
  process.stdout.write(".");
}

const workSizes: [number, number][] = [
  [1200, 1500], [1200, 1200], [1100, 1650], [1500, 1125], [1200, 1600], [1200, 1500],
  [1200, 1800], [1600, 1200], [1200, 1200], [1200, 1500], [1125, 1500], [1200, 1680],
];

await render("hero", heroSvg(1400, 1750), "Demo görsel: sentetik deri üzerine işlenmiş tentakül kompozisyonu");
for (let i = 0; i < workSizes.length; i++) {
  const [w, h] = workSizes[i]!;
  await render(`work-${i + 1}`, workSvg(100 + i * 17, w, h), "Demo görsel: ten üzerinde çizgisel dövme kompozisyonu");
}
const productDefs: [boolean, number][] = [
  [true, 0.8], [true, 0.75], [false, 1], [true, 0.8], [true, 1.25], [false, 0.75], [true, 0.8], [true, 0.7],
];
for (let i = 0; i < productDefs.length; i++) {
  const [framed, ratio] = productDefs[i]!;
  await render(`product-${i + 1}`, productSvg(500 + i * 31, 1400, 1750, framed, ratio), framed ? "Demo görsel: çerçeveli fake skin eser" : "Demo görsel: çerçevesiz fake skin eser");
  await render(`product-${i + 1}-detail`, detailSvg(900 + i * 13, 1400, 1750), "Demo görsel: fake skin yüzeyinde çizgi ve noktalama detayı");
}
await render("studio-1", atmosphereSvg(31, 2400, 1350), "Demo görsel: karanlık stüdyo atmosferi");
await render("studio-2", atmosphereSvg(77, 1200, 1500), "Demo görsel: ışık ve çizgi kompozisyonu");
await render("process-1", detailSvg(1301, 1200, 1500), "Demo görsel: çizgi çalışması yakın plan");
await render("process-2", atmosphereSvg(55, 1200, 900), "Demo görsel: atölye atmosferi");
await render("process-3", workSvg(1777, 1200, 1500), "Demo görsel: süreçten bir an");

fs.writeFileSync(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\n✓ ${Object.keys(manifest).length} demo görsel → public/demo`);
