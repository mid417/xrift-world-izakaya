import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const readSource = (relativePath) => readFileSync(new URL(`../${relativePath}`, import.meta.url), 'utf8')

test('performance-sensitive world components avoid point lights', () => {
  const worldSource = readSource('src/World.tsx')
  const secretRoomSource = readSource('src/components/SecretRoom/index.tsx')
  const rotatingObjectSource = readSource('src/components/RotatingObject/index.tsx')

  assert.equal((worldSource.match(/<pointLight\b/g) ?? []).length, 0)
  assert.equal((secretRoomSource.match(/<pointLight\b/g) ?? []).length, 0)
  assert.equal((rotatingObjectSource.match(/<pointLight\b/g) ?? []).length, 0)
})
