/**
 * Renders the social share cards (Open Graph / X / LinkedIn / WhatsApp
 * previews) into public/og, one per page.
 *
 *   node scripts/build-og.mjs
 *
 * Each card is 1200×630: the white wordmark, the page's own eyebrow and
 * headline, and the page's hero photograph. Cards are committed as static
 * JPEGs rather than rendered per request, so a preview never depends on a
 * cold function and the URL a crawler cached stays valid.
 *
 * Re-run after changing a page headline or hero photo. Needs network access
 * once, to fetch Manrope from Google Fonts.
 */
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";
import sharp from "sharp";
import fs from "fs";

const OUT = "public/og";
fs.mkdirSync(OUT, { recursive: true });

const INK = "#16173d";
const CYAN = "#27aae1";

/* [file, eyebrow, headline lines, photo key] — copy matches each page hero. */
const CARDS = [
  ["home", "Skill development · India", ["Less theory.", "Real machinery."], "welding-sparks"],
  ["solutions", "Solutions", ["Six ways we", "build capability."], "electrical-safety"],
  ["impact", "Impact archive", ["14 programmes.", "Hands-on training", "across all 6 verticals."], "defence-assembly"],
  ["about", "Who we are", ["Training is only as", "good as the work that", "happens after it."], "welding-shopfloor"],
  ["contact", "Contact", ["Tell us what", "the floor needs."], "cnc-operation"],
  ["blog", "Insights · Blog", ["Notes from", "the floor."], "welding-bay"],
  ["privacy", "Legal", ["Privacy Policy"], "cohort-classroom"],
  ["solutions-corporate", "Vertical 01 · Corporate", ["Corporate", "Training"], "engine-cohort"],
  ["solutions-csr", "Vertical 02 · CSR", ["CSR", "Programmes"], "medical-camp"],
  ["solutions-industry", "Vertical 03 · Industry", ["Industry", "Solutions"], "welding-sparks"],
  ["solutions-defence", "Vertical 04 · Defence", ["Defence", "Programmes"], "defence-engine-class"],
  ["solutions-schools", "Vertical 05 · Schools", ["School", "Solutions"], "welding-shield"],
  ["solutions-micro-entrepreneurship", "Vertical 06 · Micro-Entrepreneurship", ["Micro-", "Entrepreneurship"], "tailoring-floor"],
];

async function font(css) {
  const sheet = await (
    await fetch(`https://fonts.googleapis.com/css2?family=${css}`, {
      headers: { "User-Agent": "Mozilla/4.0" }, // old UA → TTF, which satori reads
    })
  ).text();
  const url = sheet.match(/url\(([^)]+\.ttf)\)/)[1];
  return Buffer.from(await (await fetch(url)).arrayBuffer());
}

const dataUri = async (path, mime, pipe) =>
  `data:${mime};base64,${(await pipe(sharp(path)).toBuffer()).toString("base64")}`;

const fonts = [
  { name: "Manrope", data: await font("Manrope:wght@700"), weight: 700, style: "normal" },
  { name: "Manrope", data: await font("Manrope:wght@600"), weight: 600, style: "normal" },
];
const logo = await dataUri("public/brand/yandnow-white.webp", "image/png", (s) => s.png());
const logoMeta = await sharp("public/brand/yandnow-white.webp").metadata();
const LOGO_H = 52;

const h = (type, style, children) => ({ type, props: { style, children } });

for (const [file, eyebrow, lines, photo] of CARDS) {
  const img = await dataUri(`public/img/${photo}.webp`, "image/jpeg", (s) =>
    s.resize(720, 630, { fit: "cover" }).jpeg({ quality: 88 }),
  );
  const size = lines.length > 2 ? 60 : 72;

  const tree = h("div", { display: "flex", width: "100%", height: "100%", background: INK, fontFamily: "Manrope" }, [
    // Photo on the right, fading into the ink plate.
    { type: "img", props: { src: img, width: 720, height: 630, style: { position: "absolute", right: 0, top: 0 } } },
    h("div", {
      position: "absolute", right: 0, top: 0, width: 720, height: 630, display: "flex",
      backgroundImage: `linear-gradient(90deg, ${INK} 0%, rgba(22,23,61,0.85) 30%, rgba(22,23,61,0.15) 75%, rgba(22,23,61,0) 100%)`,
    }, []),
    h("div", {
      position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between",
      width: 760, height: "100%", padding: "64px 0 60px 72px",
    }, [
      { type: "img", props: { src: logo, height: LOGO_H, width: Math.round((logoMeta.width / logoMeta.height) * LOGO_H) } },
      h("div", { display: "flex", flexDirection: "column" }, [
        h("div", { display: "flex", color: CYAN, fontSize: 24, fontWeight: 600, letterSpacing: 2.5, textTransform: "uppercase" }, eyebrow),
        h("div", { display: "flex", flexDirection: "column", marginTop: 22, color: "#fbfbfc", fontSize: size, fontWeight: 700, lineHeight: 1.06, letterSpacing: -1.5 },
          lines.map((l) => h("div", { display: "flex" }, l))),
      ]),
      h("div", { display: "flex", alignItems: "center", color: "rgba(255,255,255,0.7)", fontSize: 24, fontWeight: 600 }, [
        h("div", { display: "flex", width: 40, height: 4, background: CYAN, marginRight: 18 }, []),
        "yandnow.com",
      ]),
    ]),
  ]);

  const png = Buffer.from(await new ImageResponse(tree, { width: 1200, height: 630, fonts }).arrayBuffer());
  await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toFile(`${OUT}/${file}.jpg`);
  console.log(`${OUT}/${file}.jpg`);
}
