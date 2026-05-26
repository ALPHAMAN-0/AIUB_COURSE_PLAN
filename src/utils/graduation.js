import { TERM_ORDER, TERM_LABEL, DEFAULT_START_TERM } from '../data/programs'

export const MIN_TERM_CREDITS = 10
export const MAX_TERM_CREDITS = 20
export const DEFAULT_CREDIT_TARGETS = { spring: 15, summer: 10, fall: 15 }

// Resolve the calendar term/year of the n-th term (0-indexed) given a start anchor.
export function termCalendar(startTerm, startYear, termIndex) {
  const startIdx = Math.max(0, TERM_ORDER.indexOf(startTerm || DEFAULT_START_TERM))
  const term = TERM_ORDER[(startIdx + termIndex) % TERM_ORDER.length]
  const yearsForward = Math.floor((startIdx + termIndex) / TERM_ORDER.length)
  const year = typeof startYear === 'number' && Number.isFinite(startYear)
    ? startYear + yearsForward
    : null
  return {
    term,
    year,
    label: year ? `${TERM_LABEL[term]} ${year}` : TERM_LABEL[term]
  }
}

// Build calendar-aware semester labels: "T1 · Spring 2026"
export function buildCalendarLabels(startTerm, startYear, count) {
  return Array.from({ length: count }, (_, i) => {
    const cal = termCalendar(startTerm, startYear, i)
    return `T${i + 1} · ${cal.label}`
  })
}

// Project the graduation term based on credit targets, completed credits,
// and any manual semester assignments (drag-drop into later semesters).
export function projectGraduation({
  program,
  completedCourses = [],
  semesterPlan = {},
  startTerm = DEFAULT_START_TERM,
  startYear = null,
  creditTargets = DEFAULT_CREDIT_TARGETS
}) {
  if (!program) return null
  const targets = { ...DEFAULT_CREDIT_TARGETS, ...creditTargets }
  const totalCredits = program.totalCredits || 148

  const creditsCompleted = completedCourses.reduce((acc, code) => {
    const c = program.courseByCode?.[code]
    return acc + (c ? c.credits : 0)
  }, 0)
  const remainingCredits = Math.max(totalCredits - creditsCompleted, 0)

  // Highest semester index (1-based) the user has manually placed a course into.
  let highestUsedSemester = 0
  Object.values(semesterPlan).forEach(s => {
    const n = Number(s) || 0
    if (n > highestUsedSemester) highestUsedSemester = n
  })

  // Walk forward term-by-term subtracting target credits until the remaining hits 0.
  let needed = remainingCredits
  let projectedTerms = 0
  const SAFETY = 60 // 20 years of terms; safety break
  while (needed > 0 && projectedTerms < SAFETY) {
    const cal = termCalendar(startTerm, startYear, projectedTerms)
    const take = Math.max(targets[cal.term] || 0, 0)
    if (take === 0) {
      // user wants 0 credits this season — skip it but don't infinite-loop
      projectedTerms += 1
      continue
    }
    needed -= take
    projectedTerms += 1
  }

  // Never under-promise: if the user manually placed a course in a later semester,
  // graduation can't be earlier than that.
  const termsNeeded = Math.max(projectedTerms, highestUsedSemester, remainingCredits === 0 ? 0 : 1)

  // termsNeeded is 1-based count of terms (T1, T2, ...). Index into termCalendar = termsNeeded - 1.
  const finalIdx = Math.max(termsNeeded - 1, 0)
  const finalCal = termCalendar(startTerm, startYear, finalIdx)

  const yearsApprox = termsNeeded > 0 ? Math.round((termsNeeded / TERM_ORDER.length) * 10) / 10 : 0

  return {
    termsNeeded,
    finalTerm: finalCal.term,
    finalYear: finalCal.year,
    finalLabel: finalCal.label,
    yearsApprox,
    remainingCredits,
    creditsCompleted,
    totalCredits
  }
}
