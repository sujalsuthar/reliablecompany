/**
 * One-off: compress public images for faster Masar loads.
 * Run: node scripts/optimize-images.mjs
 */
import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const ROOT = path.join(process.cwd(), 'public')
const TARGETS = ['heroes', 'profile', 'certifications']

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) files.push(full)
  }
  return files
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase()
  const before = (await fs.stat(file)).size
  if (before < 80_000) return { file, skipped: true, before }

  const isHero = file.includes(`${path.sep}heroes${path.sep}`)
  const maxWidth = isHero ? 1600 : 1200
  const input = await fs.readFile(file)
  let pipeline = sharp(input, { failOn: 'none' }).rotate()
  const meta = await sharp(input, { failOn: 'none' }).metadata()
  if ((meta.width ?? 0) > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true })
  }

  const tmp = `${file}.opt.tmp`
  if (ext === '.png') {
    await pipeline.png({ quality: 70, compressionLevel: 9, palette: true }).toFile(tmp)
  } else if (ext === '.webp') {
    await pipeline.webp({ quality: 72 }).toFile(tmp)
  } else {
    await pipeline.jpeg({ quality: 72, mozjpeg: true }).toFile(tmp)
  }

  const after = (await fs.stat(tmp)).size
  if (after < before) {
    await fs.rename(tmp, file)
    return { file, before, after }
  }
  await fs.unlink(tmp)
  return { file, skipped: true, before }
}

const results = []
for (const folder of TARGETS) {
  const dir = path.join(ROOT, folder)
  try {
    const files = await walk(dir)
    for (const file of files) {
      results.push(await optimize(file))
    }
  } catch {
    // folder missing
  }
}

const saved = results.filter((r) => r.after)
let totalBefore = 0
let totalAfter = 0
for (const r of saved) {
  totalBefore += r.before
  totalAfter += r.after
  const rel = path.relative(process.cwd(), r.file)
  console.log(
    `✓ ${rel}: ${(r.before / 1024 / 1024).toFixed(2)}MB → ${(r.after / 1024 / 1024).toFixed(2)}MB`,
  )
}
console.log(
  `\nOptimized ${saved.length} files. Saved ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(2)} MB`,
)
