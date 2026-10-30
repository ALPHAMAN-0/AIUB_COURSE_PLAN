import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { parseCredit } from '../src/utils/credits'

describe('parseCredit', () => {
  it('reads the credit value and the lab flag', () => {
    assert.deepEqual(parseCredit('3'), { credits: 3, hasLab: false })
    assert.deepEqual(parseCredit(1), { credits: 1, hasLab: false })
    assert.deepEqual(parseCredit('3/Lab'), { credits: 3, hasLab: true })
  })

  it('falls back to 0 credits for missing or non-numeric input', () => {
    for (const raw of [null, undefined, '', 'abc']) {
      assert.deepEqual(parseCredit(raw), { credits: 0, hasLab: false })
    }
  })
})
