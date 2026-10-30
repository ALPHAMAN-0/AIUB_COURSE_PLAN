import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  programs,
  programById,
  buildProgram,
  REQUIRED_MAJOR_COURSES,
  REQUIRED_COS_ELECTIVES
} from '../src/data/programs'

describe('program catalogs', () => {
  it('exposes the three AIUB programs by id', () => {
    assert.deepEqual(programs.map(p => p.id), ['cse', 'dataScience', 'cncs'])
    for (const p of programs) assert.equal(programById[p.id], p)
  })

  it('gives every course a unique code, a title, credits and a valid default semester', () => {
    for (const p of programs) {
      const codes = p.allCourses.map(c => c.code)
      assert.equal(new Set(codes).size, codes.length, `${p.id}: duplicate course codes`)
      for (const c of p.allCourses) {
        assert.ok(typeof c.title === 'string' && c.title.length > 0, `${p.id} ${c.code}: title`)
        assert.ok(Number.isInteger(c.credits) && c.credits > 0, `${p.id} ${c.code}: credits`)
        assert.ok(
          Number.isInteger(c.defaultSemester) && c.defaultSemester >= 1 && c.defaultSemester <= p.semesterCount,
          `${p.id} ${c.code}: default semester`
        )
        assert.equal(p.courseByCode[c.code], c)
      }
    }
  })

  it('has no dangling references in prerequisites or career recommendations', () => {
    for (const p of programs) {
      for (const c of p.allCourses) {
        for (const code of c.prerequisites) {
          assert.ok(p.courseByCode[code], `${p.id} ${c.code}: unknown prerequisite ${code}`)
        }
      }
      for (const career of p.careers) {
        assert.ok(p.majorLabels[career.majorTrack], `${p.id} ${career.id}: unknown track ${career.majorTrack}`)
        for (const code of [...career.recommended, ...career.cosElectives]) {
          assert.ok(p.courseByCode[code], `${p.id} ${career.id}: unknown course ${code}`)
        }
        assert.equal(p.careerById[career.id], career)
      }
    }
  })

  it('adds up to the 148-credit degree in every program', () => {
    const coreCredits = p => p.coreCourses.reduce((acc, c) => acc + c.credits, 0)
    const { cse, dataScience, cncs } = programById

    // CSE: core courses plus 3 major courses and 2 COS electives of 3 credits each.
    assert.equal(cse.electiveSlots.length, 0)
    assert.equal(coreCredits(cse) + (REQUIRED_MAJOR_COURSES + REQUIRED_COS_ELECTIVES) * 3, cse.totalCredits)

    // DS and CNCS: core courses plus seven 3-credit major/elective slots.
    for (const p of [dataScience, cncs]) {
      assert.equal(p.electiveSlots.length, 7, `${p.id}: slot count`)
      assert.equal(coreCredits(p) + p.electiveSlots.length * 3, p.totalCredits, `${p.id}: credit total`)
    }
    for (const p of programs) assert.equal(p.totalCredits, 148)
  })

  it('keeps the credit-gated courses gated', () => {
    const { cse, dataScience, cncs } = programById
    assert.equal(cse.courseByCode.CSC4197.creditRequirement, 100)
    assert.deepEqual(cse.courseByCode.CSC4197.prerequisites, [])
    assert.equal(cse.courseByCode.CSC4296.creditRequirement, 139)
    assert.equal(dataScience.courseByCode.CSC4299.creditRequirement, 140)
    assert.equal(cncs.courseByCode.CSC4299.creditRequirement, 140)
  })

  it('turns placeholder rows into elective slots instead of courses', () => {
    const { dataScience } = programById
    assert.equal(dataScience.courseByCode['0'], undefined)
    const slot = label => dataScience.electiveSlots.find(s => s.label === label)
    assert.deepEqual(slot('DS MAJOR 1'), { semester: 6, label: 'DS MAJOR 1', group: null })
    assert.deepEqual(slot('DS ELECTIVE 2'), { semester: 8, label: 'DS ELECTIVE 2', group: 'generalElectiveDataScience' })
  })
})

describe('buildProgram', () => {
  const built = buildProgram({
    id: 'test',
    name: 'Test Program',
    shortName: 'T',
    semesters: [
      {
        semester: 2,
        courses: [
          { code: 'AAA1101', course: 'ALPHA', prerequisite: null, credit: 3 },
          { code: 'AAA1101', course: 'ALPHA (REPEATED ROW)', prerequisite: null, credit: 3 },
          { code: '0', course: 'T MAJOR 1', prerequisite: null, credit: 3 }
        ]
      }
    ],
    rawCore: [{ code: 'BBB2211', title: 'Beta', prereq: 'AAA1101', credit: '3/Lab' }],
    electives: {
      majorInTesting: [
        { code: 'AAA1101', course: 'ALREADY A CORE COURSE', prerequisite: null, credit: 3 },
        { code: 'CCC4118', course: 'GAMMA', prerequisite: ['BBB2211'], credit: 3 }
      ],
      generalElectiveQualityAssurance: [
        { code: 'ODD-CODE', course: 'DELTA', prerequisite: '100 Credits', credit: 3 }
      ]
    }
  })

  it('de-duplicates core courses and skips electives that are already core', () => {
    assert.deepEqual(built.coreCourses.map(c => c.code), ['AAA1101', 'BBB2211'])
    assert.equal(built.courseByCode.AAA1101.title, 'ALPHA')
    assert.deepEqual(built.majorElectives.map(c => c.code), ['CCC4118', 'ODD-CODE'])
    assert.deepEqual(built.electiveSlots, [{ semester: 2, label: 'T MAJOR 1', group: null }])
  })

  it('normalises each course: prerequisites, credits, lab flag, category and default semester', () => {
    assert.deepEqual(built.courseByCode.BBB2211, {
      code: 'BBB2211',
      title: 'Beta',
      prerequisites: ['AAA1101'],
      creditRequirement: null,
      credits: 3,
      hasLab: true,
      category: 'core',
      major: null,
      defaultSemester: 4 // from the code digits: year 2, semester 2
    })
    assert.equal(built.courseByCode.CCC4118.category, 'majorElective')
    assert.equal(built.courseByCode.CCC4118.major, 'majorInTesting')
    assert.equal(built.courseByCode['ODD-CODE'].creditRequirement, 100)

    assert.equal(built.courseByCode.AAA1101.defaultSemester, 2) // the semester row wins
    assert.equal(built.courseByCode.CCC4118.defaultSemester, 7) // year 4, semester 1
    assert.equal(built.courseByCode['ODD-CODE'].defaultSemester, 7) // no digits to read
  })

  it('fills in labels and defaults that the raw catalog leaves out', () => {
    assert.deepEqual(built.majorLabels, {
      majorInTesting: 'Major in Testing',
      generalElectiveQualityAssurance: 'General Elective: Quality Assurance'
    })
    assert.equal(built.totalCredits, 148)
    assert.equal(built.semesterCount, 8)
    assert.equal(built.logo, 'T')
    assert.deepEqual(built.careers, [])
    assert.deepEqual(built.careerById, {})
  })
})
