import { readFileSync } from 'node:fs'

const source = readFileSync('src/styles/global.css', 'utf8')
const definitions = new Set([...source.matchAll(/(--[A-Za-z0-9-]+)\s*:/g)].map(match => match[1]))
const uses = new Set([...source.matchAll(/var\((--[A-Za-z0-9-]+)/g)].map(match => match[1]))
const undefinedTokens = [...uses].filter(token => !definitions.has(token))
if (undefinedTokens.length) throw new Error(`Undefined CSS custom properties: ${undefinedTokens.join(', ')}`)
console.log(`CSS custom-property validation passed (${uses.size} referenced tokens).`)
