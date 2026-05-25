import { parsePrereq } from '../../utils/prerequisites'
import { parseCredit } from '../../utils/credits'
import { cse } from './cse'
import { dataScience } from './dataScience'
import { cncs } from './cncs'

// AIUB academic calendar: 3 semesters per year, Spring → Summer → Fall.
// Each program is 8 program-semesters; the calendar term rotates from the student's start term.
export const TERM_ORDER = ['spring', 'summer', 'fall']
export const TERM_LABEL = { spring: 'Spring', summer: 'Summer', fall: 'Fall' }
export const DEFAULT_START_TERM = 'spring'

export function buildSemesterLabels(startTerm = DEFAULT_START_TERM, count = 8) {
  const startIdx = Math.max(0, TERM_ORDER.indexOf(startTerm))
  return Array.from({ length: count }, (_, i) => {
    const term = TERM_ORDER[(startIdx + i) % TERM_ORDER.length]
    return `T${i + 1} · ${TERM_LABEL[term]}`
  })
}

export const REQUIRED_MAJOR_COURSES = 3
export const REQUIRED_COS_ELECTIVES = 2

function deriveDefaultSemester(code) {
  const match = code.match(/(\d)(\d)\d{2}$/)
  if (!match) return 7
  const year = parseInt(match[1], 10)
  const sem = parseInt(match[2], 10)
  const slot = (year - 1) * 2 + (sem >= 2 ? 2 : 1)
  return Math.min(Math.max(slot, 1), 8)
}

function buildCourse(raw, category, major, semesterOverride) {
  const { codes, creditRequirement } = parsePrereq(raw.prereq ?? raw.prerequisite)
  const { credits, hasLab } = parseCredit(raw.credit)
  const code = raw.code
  return {
    code,
    title: raw.title || raw.course,
    prerequisites: codes,
    creditRequirement,
    credits,
    hasLab,
    category,
    major,
    defaultSemester: semesterOverride ?? deriveDefaultSemester(code)
  }
}

export function buildProgram(rawProgram) {
  const coreCourses = []
  const electiveSlots = []
  const seenCoreCodes = new Set()

  // If program uses semester-based layout (DS, CNCS), iterate semesters
  if (Array.isArray(rawProgram.semesters)) {
    rawProgram.semesters.forEach(sem => {
      sem.courses.forEach(rawCourse => {
        if (rawCourse.code === '0' || rawCourse.code === 0) {
          // placeholder slot like "DS MAJOR 1"
          electiveSlots.push({
            semester: sem.semester,
            label: rawCourse.course,
            group: rawProgram.slotGroupMap?.[rawCourse.course] ?? null
          })
          return
        }
        if (seenCoreCodes.has(rawCourse.code)) return
        seenCoreCodes.add(rawCourse.code)
        coreCourses.push(buildCourse(rawCourse, 'core', null, sem.semester))
      })
    })
  }

  // CSE-style flat rawCore array
  if (Array.isArray(rawProgram.rawCore)) {
    rawProgram.rawCore.forEach(raw => {
      if (seenCoreCodes.has(raw.code)) return
      seenCoreCodes.add(raw.code)
      coreCourses.push(buildCourse(raw, 'core', null))
    })
  }

  const majorElectives = []
  const electivesSource = rawProgram.electives || rawProgram.rawElectives || {}
  Object.entries(electivesSource).forEach(([majorKey, list]) => {
    list.forEach(raw => {
      if (seenCoreCodes.has(raw.code)) return // skip if already core
      majorElectives.push(buildCourse(raw, 'majorElective', majorKey))
    })
  })

  const allCourses = [...coreCourses, ...majorElectives]
  const courseByCode = Object.fromEntries(allCourses.map(c => [c.code, c]))

  // Derive majorLabels from electives keys when not provided
  const majorLabels = rawProgram.majorLabels || Object.fromEntries(
    Object.keys(electivesSource).map(key => [key, humanizeKey(key)])
  )

  const careers = rawProgram.careers || []
  const careerById = Object.fromEntries(careers.map(c => [c.id, c]))

  return {
    id: rawProgram.id,
    name: rawProgram.name,
    shortName: rawProgram.shortName,
    logo: rawProgram.logo || rawProgram.shortName,
    totalCredits: rawProgram.totalCredits ?? rawProgram.grandTotalCredits ?? 148,
    semesterCount: rawProgram.semesterCount ?? 8,
    coreCourses,
    majorElectives,
    allCourses,
    courseByCode,
    majorLabels,
    majorDescriptions: rawProgram.majorDescriptions || {},
    electiveSlots,
    careers,
    careerById
  }
}

function humanizeKey(key) {
  // generalElectiveDataScience -> General Elective (Data Science)
  // majorInComputing -> Major in Computing
  if (key.startsWith('majorIn')) {
    return 'Major in ' + key.slice('majorIn'.length).replace(/([A-Z])/g, ' $1').trim()
  }
  if (key.startsWith('generalElective')) {
    return 'General Elective: ' + key.slice('generalElective'.length).replace(/([A-Z])/g, ' $1').trim()
  }
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()).trim()
}

export const programs = [
  buildProgram(cse),
  buildProgram(dataScience),
  buildProgram(cncs)
]

export const programById = Object.fromEntries(programs.map(p => [p.id, p]))

export const DEFAULT_PROGRAM_ID = 'cse'
