import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const readSource = (relativePath) => readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8')

test('RemoteUserHUDs uses a single frame loop for HUD position updates', () => {
  const hudSource = readSource('src/components/RemoteUserHUDs/index.tsx')
  assert.equal((hudSource.match(/useFrame\(/g) ?? []).length, 1)
})

test('World lowers shadow load on directional light and translucent booth blocks', () => {
  const worldSource = readSource('src/World.tsx')
  assert.match(worldSource, /shadow-mapSize-width=\{512\}/)
  assert.match(worldSource, /shadow-mapSize-height=\{512\}/)
  assert.equal((worldSource.match(/opacity=\{0\.55\}/g) ?? []).length, 5)
  assert.equal((worldSource.match(/opacity=\{0\.55\} \/>/g) ?? []).length, 5)
})
