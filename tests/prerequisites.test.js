import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { parsePrereq, isUnlocked, missingPrereqs } from '../src/utils/prerequisites'

const course = (overrides = {}) => ({
  code: 'X',
  prerequisites: [],
  creditRequirement: null,
  ...overrides
})

describe('parsePrereq', () => {
  it('treats "Nil", "Not mentioned" and missing values as no prerequisite', () => {
    for (const raw of ['Nil', 'Not mentioned', null, undefined]) {
      assert.deepEqual(parsePrereq(raw), { codes: [], creditRequirement: null })
    }
  })

  it('splits course codes on "&" and "," and trims them', () => {
    assert.deepEqual(parsePrereq('MAT1102 & CSC1102').codes, ['MAT1102', 'CSC1102'])
    assert.deepEqual(parsePrereq('CSC2211,MAT3103 ,  CSC3217').codes, ['CSC2211', 'MAT3103', 'CSC3217'])
    assert.equal(parsePrereq('CSC2106').creditRequirement, null)
  })

  it('accepts the array form used by the DS and CNCS catalogs', () => {
    assert.deepEqual(parsePrereq(['CSC1102', ' CSC1103 ', null, '']), {
      codes: ['CSC1102', 'CSC1103'],
      creditRequirement: null
    })
  })

  it('reads credit gates such as "100 Credits Completed"', () => {
    assert.deepEqual(parsePrereq('100 Credits Completed'), { codes: [], creditRequirement: 100 })
    assert.deepEqual(parsePrereq('140 Credits'), { codes: [], creditRequirement: 140 })
    assert.deepEqual(parsePrereq('1 credit'), { codes: [], creditRequirement: 1 })
  })
})

describe('isUnlocked', () => {
  it('unlocks a course only when every prerequisite is completed', () => {
    const c = course({ prerequisites: ['A', 'B'] })
    assert.equal(isUnlocked(c, new Set(['A', 'B']), 0), true)
    assert.equal(isUnlocked(c, new Set(['A']), 0), false)
    assert.equal(isUnlocked(course(), new Set(), 0), true)
  })

  it('enforces the credit gate even when no course prerequisite is listed', () => {
    const c = course({ creditRequirement: 100 })
    assert.equal(isUnlocked(c, new Set(), 99), false)
    assert.equal(isUnlocked(c, new Set(), 100), true)
  })
})

describe('missingPrereqs', () => {
  it('lists the missing course codes and the remaining credit gap', () => {
    const c = course({ prerequisites: ['A', 'B'], creditRequirement: 139 })
    assert.deepEqual(missingPrereqs(c, new Set(['A']), 130), ['B', '139 credits (9 to go)'])
    assert.deepEqual(missingPrereqs(c, new Set(['A', 'B']), 139), [])
  })
})
