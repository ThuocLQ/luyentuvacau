import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const visit = (directory) => readdirSync(directory).flatMap((entry) => {
  const path = join(directory, entry)
  return statSync(path).isDirectory() ? visit(path) : [path]
})

const files = [...visit('src'), ...visit('docs'), 'README.md', 'index.html']
const mojibake = /[\u00C3\u00C4\u00C2]|\u00E2\u20AC/
const invalid = files.filter(file => /\.(ts|tsx|md|html|css)$/.test(file) && mojibake.test(readFileSync(file, 'utf8')))
if (invalid.length) throw new Error(`Possible UTF-8 mojibake in: ${invalid.join(', ')}`)

const registry = readFileSync('src/data/docs.ts', 'utf8')
const imports = [...registry.matchAll(/import \w+ from '\.\.\/\.\/docs\/([^']+)\?raw'/g)].map(match => join('docs', match[1]))
const missing = imports.filter(file => { try { readFileSync(file); return false } catch { return true } })
if (missing.length) throw new Error(`Registry imports missing content: ${missing.join(', ')}`)

const contentSlugs = [...registry.matchAll(/\{ slug: '([^']+)'[^\n]*content:/g)].map(match => match[1])
const practicedSlugs = new Set([...registry.matchAll(/relatedDoc: '([^']+)'/g)].map(match => match[1]))
const withoutPractice = contentSlugs.filter(slug => !practicedSlugs.has(slug))
if (withoutPractice.length) throw new Error(`Complete cheatsheets without a linked practice question: ${withoutPractice.join(', ')}`)

console.log(`Content validation passed for ${files.length} text files; every cheatsheet has linked practice.`)
