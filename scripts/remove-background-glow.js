const sharp = require('sharp')
const path = require('path')

const SRC = path.resolve(__dirname, '..', 'public', 'tech3d-logo.png')
const DEST = path.resolve(__dirname, '..', 'public', 'tech3d-logo-glow-preservado.png')

// Below this color-distance from the detected background, a pixel is
// considered a pure background match and becomes fully transparent.
const TOLERANCE = 8

// Above this color-distance, a pixel is considered fully part of the
// glow/artwork and stays fully opaque. Between TOLERANCE and this value,
// alpha ramps smoothly — matching the point where the glow's own color
// already starts darkening toward the background. Set high enough that
// the badge's own dark interior tones (hex-grid shadow cells etc.) never
// get pulled below full opacity — only the outer bloom/sparks do.
const FADE_END = 110

// Radius (from image center, in px) inside which the artwork is always
// fully opaque, regardless of color — protects the ring/hex/badge body
// even where it dips dark, so only the outer glow bloom fades by color.
// Determined from this image's radial profile: the badge stays solidly
// colored out to ~r=235, then collapses to pure background by ~r=265.
const CORE_RADIUS = 235

// Width (px) of the taper applied to the core-radius cutoff itself, so
// it blends into the color-based fade rather than forming a hard ring.
const CORE_FEATHER = 20

// Spatial blur radius (px) applied to the alpha mask to feather the
// transition and avoid any hard edge.
const FEATHER_RADIUS = 12

function sampleCorner(data, width, height, channels, x0, y0, size) {
  let r = 0, g = 0, b = 0, n = 0
  for (let y = y0; y < y0 + size; y++) {
    for (let x = x0; x < x0 + size; x++) {
      const i = (y * width + x) * channels
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      n++
    }
  }
  return [r / n, g / n, b / n]
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

async function main() {
  const image = sharp(SRC)
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  const patchSize = 10
  const corners = [
    sampleCorner(data, width, height, channels, 0, 0, patchSize),
    sampleCorner(data, width, height, channels, width - patchSize, 0, patchSize),
    sampleCorner(data, width, height, channels, 0, height - patchSize, patchSize),
    sampleCorner(data, width, height, channels, width - patchSize, height - patchSize, patchSize),
  ]
  const bg = corners.reduce((acc, c) => [acc[0] + c[0] / 4, acc[1] + c[1] / 4, acc[2] + c[2] / 4], [0, 0, 0])

  const cornerSpread = Math.max(
    ...corners.map((c) => Math.sqrt((c[0] - bg[0]) ** 2 + (c[1] - bg[1]) ** 2 + (c[2] - bg[2]) ** 2))
  )

  // Build a raw alpha mask (1 channel) combining two signals:
  //  - alphaCore: forces full opacity inside CORE_RADIUS, protecting the
  //    badge body/hex-grid even where its own tones are dark, tapering
  //    over CORE_FEATHER just past the radius.
  //  - alphaColor: fades by color distance to the detected background,
  //    which reproduces (and extends) the glow's own natural falloff and
  //    keeps isolated bright sparks opaque wherever they sit.
  // The pixel keeps whichever signal says "more opaque".
  const cx = width / 2
  const cy = height / 2
  const alphaMask = Buffer.alloc(width * height)
  for (let y = 0, p = 0; y < height; y++) {
    for (let x = 0; x < width; x++, p++) {
      const i = p * channels
      const r = data[i], g = data[i + 1], b = data[i + 2]
      const dist = Math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2)
      const alphaColor = smoothstep(TOLERANCE, FADE_END, dist)

      const radius = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
      const alphaCore = 1 - smoothstep(CORE_RADIUS, CORE_RADIUS + CORE_FEATHER, radius)

      const alpha = Math.max(alphaColor, alphaCore)
      alphaMask[p] = Math.round(alpha * 255)
    }
  }

  // Feather the mask spatially so the color-based ramp has no hard edges.
  // Note: sharp expands a 1-channel raw buffer to 3 (RGB) internally when
  // blurring, even though the value is greyscale (R=G=B) — read it back
  // using the channel count it actually reports, not the 1 we sent in.
  const { data: featheredAlpha, info: featherInfo } = await sharp(alphaMask, {
    raw: { width, height, channels: 1 },
  })
    .blur(FEATHER_RADIUS)
    .raw()
    .toBuffer({ resolveWithObject: true })
  const featherChannels = featherInfo.channels

  const out = Buffer.from(data)
  for (let p = 0, i = 0; p < width * height; p++, i += channels) {
    // Keep original alpha where the mask is fully opaque or fully
    // transparent already matched; use the feathered value for the ramp.
    out[i + 3] = featheredAlpha[p * featherChannels]
  }

  await sharp(out, { raw: { width, height, channels } }).png().toFile(DEST)

  console.log(`Source: ${SRC}`)
  console.log(`Dimensions: ${width}x${height}`)
  console.log(`Detected background color (avg of 4 corners): rgb(${bg.map((v) => Math.round(v)).join(', ')})`)
  console.log(`Corner color spread (max distance between corner samples): ${cornerSpread.toFixed(2)}`)
  console.log(`Saved: ${DEST}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
