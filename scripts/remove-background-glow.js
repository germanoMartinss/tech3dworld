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
// already starts darkening toward the background.
const FADE_END = 70

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

  // Build a raw alpha mask (1 channel) from color distance to the
  // detected background, using smoothstep for a soft ramp.
  const alphaMask = Buffer.alloc(width * height)
  for (let p = 0, i = 0; p < width * height; p++, i += channels) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const dist = Math.sqrt((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2)
    const alpha = smoothstep(TOLERANCE, FADE_END, dist)
    alphaMask[p] = Math.round(alpha * 255)
  }

  // Feather the mask spatially so the color-based ramp has no hard edges.
  const featheredAlpha = await sharp(alphaMask, { raw: { width, height, channels: 1 } })
    .blur(FEATHER_RADIUS)
    .raw()
    .toBuffer()

  const out = Buffer.from(data)
  for (let p = 0, i = 0; p < width * height; p++, i += channels) {
    // Keep original alpha where the mask is fully opaque or fully
    // transparent already matched; use the feathered value for the ramp.
    out[i + 3] = featheredAlpha[p]
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
