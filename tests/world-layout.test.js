import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const worldSource = readFileSync(new URL('../src/World.tsx', import.meta.url), 'utf8')

const extractTablePositions = () => {
  const match = worldSource.match(/const TABLE_POSITIONS: Vector3Tuple\[] = \[([\s\S]*?)\n\]/)

  assert.ok(match, 'TABLE_POSITIONS should exist')

  return Array.from(match[1].matchAll(/\[\s*(-?\d+(?:\.\d+)?)\s*,\s*0\s*,\s*(-?\d+(?:\.\d+)?)\s*\]/g), ([, x, z]) => [
    Number(x),
    Number(z),
  ])
}

const uniqueSorted = (values) => [...new Set(values)].sort((a, b) => a - b)

test('TABLE_POSITIONS defines a 4x3 evenly spaced grid', () => {
  const positions = extractTablePositions()

  assert.equal(positions.length, 12)

  const columns = uniqueSorted(positions.map(([x]) => x))
  const rows = uniqueSorted(positions.map(([, z]) => z))

  assert.deepEqual(columns, [-8.4, -2.8, 2.8, 8.4])
  assert.deepEqual(rows, [-3.2, 2.2, 7.6])

  const columnSpacings = columns.slice(1).map((value, index) => Number((value - columns[index]).toFixed(2)))
  const rowSpacings = rows.slice(1).map((value, index) => Number((value - rows[index]).toFixed(2)))

  assert.ok(columnSpacings.every((spacing) => spacing === columnSpacings[0]))
  assert.ok(rowSpacings.every((spacing) => spacing === rowSpacings[0]))
})

test('south-east room is labeled as smoking room without WC signage', () => {
  assert.match(worldSource, /label="SMOKING"/)
  assert.doesNotMatch(worldSource, /label="WC"/)
})
