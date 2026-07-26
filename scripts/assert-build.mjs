import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const walk = (directory) => readdirSync(directory).flatMap(entry => {
  const path = join(directory, entry)
  return statSync(path).isDirectory() ? walk(path) : [path]
})

const maps = existsSync('dist') ? walk('dist').filter(file => file.endsWith('.map')) : []
if (maps.length) throw new Error(`Production source maps must not be published: ${maps.join(', ')}`)
console.log('Build artifact validation passed.')
