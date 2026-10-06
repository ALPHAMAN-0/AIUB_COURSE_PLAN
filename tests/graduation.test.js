import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { termCalendar, buildCalendarLabels, projectGraduation } from '../src/utils/graduation'

// Minimal stand-in for a built program: 148 credits, three known courses.
const program = {
  totalCredits: 148,
  courseByCode: {
    A: { credits: 3 },
    B: { credits: 1 },
    ALL: { credits: 148 }
  }
}

const project = (overrides = {}) =>
  projectGraduation({ program, startTerm: 'spring', startYear: 2026, ...overrides })

describe('termCalendar', () => {
  it('rotates Spring → Summer → Fall and rolls the year over', () => {
    assert.deepEqual(termCalendar('spring', 2026, 0), { term: 'spring', year: 2026, label: 'Spring 2026' })
    assert.equal(termCalendar('spring', 2026, 2).label, 'Fall 2026')
    assert.equal(termCalendar('spring', 2026, 3).label, 'Spring 2027')
    assert.equal(termCalendar('fall', 2025, 1).label, 'Spring 2026')
  })

  it('tolerates a missing or invalid start term and start year', () => {
    // No usable year stored: show the term name only (and never glue a string year on).
    for (const year of [null, undefined, NaN, Infinity, '2026']) {
      assert.deepEqual(termCalendar('summer', year, 0), { term: 'summer', year: null, label: 'Summer' })
    }
    // Unknown term: fall back to Spring.
    assert.equal(termCalendar(undefined, 2026, 0).term, 'spring')
    assert.equal(termCalendar('winter', 2026, 0).term, 'spring')
  })
})

describe('buildCalendarLabels', () => {
  it('numbers the terms and attaches the calendar term', () => {
    assert.deepEqual(buildCalendarLabels('fall', 2025, 4), [
      'T1 · Fall 2025',
      'T2 · Spring 2026',
      'T3 · Summer 2026',
      'T4 · Fall 2026'
    ])
  })
})

describe('projectGraduation', () => {
  it('returns null until a program is selected', () => {
    assert.equal(projectGraduation({ program: null }), null)
  })

  it('projects a fresh student at the default 15/10/15 load to 12 terms', () => {
    assert.deepEqual(project(), {
      termsNeeded: 12,
      finalTerm: 'fall',
      finalYear: 2029,
      finalLabel: 'Fall 2029',
      yearsApprox: 4,
      remainingCredits: 148,
      creditsCompleted: 0,
      totalCredits: 148
    })
  })

  it('counts completed credits and ignores unknown course codes', () => {
    const result = project({ completedCourses: ['A', 'B', 'NOT-A-COURSE'] })
    assert.equal(result.creditsCompleted, 4)
    assert.equal(result.remainingCredits, 144)
  })

  it('needs no further terms once every credit is completed', () => {
    const result = project({ completedCourses: ['ALL', 'A'] })
    assert.equal(result.remainingCredits, 0)
    assert.equal(result.termsNeeded, 0)
    assert.equal(result.yearsApprox, 0)
    assert.equal(result.finalLabel, 'Spring 2026')
  })

  it('follows the per-season credit targets', () => {
    // A heavier load finishes sooner: 148 credits at 20 per term is 8 terms.
    const heavy = project({ creditTargets: { spring: 20, summer: 20, fall: 20 } })
    assert.equal(heavy.termsNeeded, 8)
    assert.equal(heavy.finalLabel, 'Summer 2028')
    assert.equal(heavy.yearsApprox, 2.7)

    // A season with a zero target is skipped but still counts as a calendar term.
    const noSummer = project({ creditTargets: { summer: 0 } })
    assert.equal(noSummer.termsNeeded, 15)
    assert.equal(noSummer.finalLabel, 'Fall 2030')
  })

  it('never graduates before a manually planned later semester', () => {
    assert.equal(project({ semesterPlan: { A: 14 } }).termsNeeded, 14)
    assert.equal(project({ semesterPlan: { A: 14 } }).finalLabel, 'Summer 2030')
    assert.equal(project({ semesterPlan: { A: 'not-a-number' } }).termsNeeded, 12)
  })

  it('always terminates, even when every credit target is zero or negative', () => {
    for (const target of [0, -5, NaN]) {
      const result = project({ creditTargets: { spring: target, summer: target, fall: target } })
      assert.ok(Number.isFinite(result.termsNeeded), `termsNeeded is finite for target ${target}`)
      assert.ok(result.termsNeeded <= 60, `termsNeeded is capped for target ${target}`)
      assert.equal(result.remainingCredits, 148)
    }
  })
})
