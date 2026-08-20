import sharp from 'sharp'
import path from 'node:path'

const SRC = path.resolve('public/tech3d-logo.png')
const DEST = path.resolve('public/tech3d-logo-transparent.png')

// Pixels where R, G and B are all at or below this value are treated as
// black/near-black background and made fully transparent.
const THRESHOLD = 55

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const { width, height, channels } = info

for (let i = 0; i < data.length; i += channels) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]

  if (r <= THRESHOLD && g <= THRESHOLD && b <= THRESHOLD) {
    data[i + 3] = 0
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png()
  .toFile(DEST)

console.log(`Saved ${DEST}`)
