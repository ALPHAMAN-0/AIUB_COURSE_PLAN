import { useMemo, useState } from 'react'
import { usePlanner } from '../context/PlannerContext'
import { TERM_ORDER, TERM_LABEL } from '../data/programs'
import { buildCalendarLabels, projectGraduation, DEFAULT_CREDIT_TARGETS } from '../utils/graduation'
import { downloadPlannerPdf } from '../utils/exportPdf'

function getSemesterAssignment(course, semesterPlan) {
  if (semesterPlan[course.code] !== undefined) return semesterPlan[course.code]
  return course.defaultSemester
}

const CURRENT_YEAR = new Date().getFullYear()

export default function SemesterPlanner() {
  const {
    state,
    assignSemester,
    removeFromSemester,
    completedSet,
    getCourseStatus,
    allCourses,
    electiveSlots,
    setStartTerm,
    setStartYear,
    setCreditTargets,
    program
  } = usePlanner()
  const [showMajor, setShowMajor] = useState(true)
  const [dragCode, setDragCode] = useState(null)

  const startTerm = state.startTerm || 'spring'
  const startYear = typeof state.startYear === 'number' ? state.startYear : null
  const creditTargets = { ...DEFAULT_CREDIT_TARGETS, ...(state.creditTargets || {}) }
  const semesterCount = program.semesterCount || 8

  const semesterLabels = useMemo(
    () => buildCalendarLabels(startTerm, startYear, semesterCount),
    [startTerm, startYear, semesterCount]
  )

  const visibleCourses = useMemo(() => {
    return allCourses.filter(c => {
      if (c.category === 'majorElective') {
        if (!showMajor) return false
        if (state.majorTrack && c.major !== state.majorTrack) return false
      }
      return true
    })
  }, [allCourses, showMajor, state.majorTrack])

  const semesters = useMemo(() => {
    const buckets = Array.from({ length: semesterCount }, () => [])
    visibleCourses.forEach(c => {
      const slot = getSemesterAssignment(c, state.semesterPlan)
      const idx = Math.min(Math.max((slot || 1) - 1, 0), semesterCount - 1)
      buckets[idx].push(c)
    })
    return buckets
  }, [visibleCourses, state.semesterPlan, semesterCount])

  // Group slot definitions per semester and compute fill counters
  const slotsBySemester = useMemo(() => {
    const buckets = Array.from({ length: semesterCount }, () => [])
    electiveSlots.forEach(slot => {
      const idx = Math.min(Math.max((slot.semester || 1) - 1, 0), semesterCount - 1)
      const group = slot.group || state.majorTrack || null
      buckets[idx].push({ ...slot, resolvedGroup: group })
    })
    return buckets
  }, [electiveSlots, state.majorTrack, semesterCount])

  // Per-group completion counts
  const completionByGroup = useMemo(() => {
    const counts = {}
    Object.keys(program.majorLabels || {}).forEach(group => {
      const codes = (program.majorElectives || []).filter(c => c.major === group).map(c => c.code)
      counts[group] = codes.filter(code => completedSet.has(code)).length
    })
    return counts
  }, [program, completedSet])

  // Per-group slot totals
  const totalSlotsByGroup = useMemo(() => {
    const totals = {}
    electiveSlots.forEach(s => {
      const g = s.group || state.majorTrack || '__unresolved__'
      totals[g] = (totals[g] || 0) + 1
    })
    return totals
  }, [electiveSlots, state.majorTrack])

  const projection = useMemo(
    () => projectGraduation({
      program,
      completedCourses: state.completedCourses,
      semesterPlan: state.semesterPlan,
      startTerm,
      startYear,
      creditTargets
    }),
    [program, state.completedCourses, state.semesterPlan, startTerm, startYear, creditTargets]
  )

  function handleDrop(e, targetSem) {
    e.preventDefault()
    const code = e.dataTransfer.getData('text/plain') || dragCode
    if (!code) return
    assignSemester(code, targetSem)
    setDragCode(null)
  }

  function handleSeasonCredit(season, value) {
    const n = Number(value)
    if (!Number.isFinite(n) || n < 0) return
    setCreditTargets({ [season]: Math.min(n, 30) })
  }

  function handleDownload() {
    downloadPlannerPdf({
      program,
      semesterPlan: state.semesterPlan,
      semesterLabels,
      semesterCourses: semesters,
      semesterSlots: slotsBySemester,
      completedSet,
      projection
    })
  }

  return (
    <section className="planner">
      <div className="planner-head no-print">
        <div>
          <h2>Semester Roadmap</h2>
          <p>Drag courses between semesters to plan your degree. AIUB runs Spring → Summer → Fall — pick when you started and how many credits you take each season.</p>
        </div>
        <label className="toggle">
          <input
            type="checkbox"
            checked={showMajor}
            onChange={e => setShowMajor(e.target.checked)}
          />
          Show major electives
        </label>
      </div>

      <div className="planner-settings no-print">
        <div className="settings-row">
          <div className="setting">
            <label htmlFor="start-term">Start term</label>
            <select
              id="start-term"
              value={startTerm}
              onChange={e => setStartTerm(e.target.value)}
            >
              {TERM_ORDER.map(t => (
                <option key={t} value={t}>{TERM_LABEL[t]}</option>
              ))}
            </select>
          </div>
          <div className="setting">
            <label htmlFor="start-year">Start year</label>
            <input
              id="start-year"
              type="number"
              min="2000"
              max="2100"
              step="1"
              placeholder={String(CURRENT_YEAR)}
              value={startYear ?? ''}
              onChange={e => setStartYear(e.target.value)}
            />
          </div>
          <div className="setting setting-group">
            <span className="setting-label">Credits per term</span>
            <div className="credit-targets">
              {TERM_ORDER.map(t => (
                <label key={t} className="credit-target">
                  <span>{TERM_LABEL[t]}</span>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    step="1"
                    value={creditTargets[t]}
                    onChange={e => handleSeasonCredit(t, e.target.value)}
                  />
                </label>
              ))}
            </div>
          </div>
          <button className="btn download-btn" onClick={handleDownload} type="button">
            ⬇ Download PDF
          </button>
        </div>

        {projection && (
          <div className="projection-banner" role="status">
            <div className="projection-main">
              <span className="projection-icon">🎓</span>
              <div>
                <div className="projection-title">
                  Expected graduation: <strong>{projection.finalLabel || '—'}</strong>
                </div>
                <div className="projection-sub">
                  ~{projection.yearsApprox} years · {projection.termsNeeded} terms ·{' '}
                  {projection.creditsCompleted}/{projection.totalCredits} credits completed ·{' '}
                  {projection.remainingCredits} to go
                </div>
              </div>
            </div>
            {startYear === null && (
              <span className="projection-hint">Set a start year above to see calendar years.</span>
            )}
          </div>
        )}
      </div>

      <div className="planner-grid">
        {semesters.map((courses, idx) => {
          const semNum = idx + 1
          const slots = slotsBySemester[idx] || []
          const credits = courses.reduce((acc, c) => acc + c.credits, 0) + slots.length * 3
          return (
            <div
              key={semNum}
              className="semester-col"
              onDragOver={e => e.preventDefault()}
              onDrop={e => handleDrop(e, semNum)}
            >
              <div className="semester-head">
                <span className="semester-name">{semesterLabels[idx]}</span>
                <span className="semester-credit">{credits} cr</span>
              </div>
              <div className="semester-body">
                {courses.length === 0 && slots.length === 0 && <div className="semester-empty">Drop courses here</div>}
                {courses.map(c => {
                  const status = getCourseStatus(c.code)
                  const completed = completedSet.has(c.code)
                  return (
                    <div
                      key={c.code}
                      draggable
                      onDragStart={e => {
                        e.dataTransfer.setData('text/plain', c.code)
                        setDragCode(c.code)
                      }}
                      className={`plan-pill ${completed ? 'plan-completed' : ''} ${status && !status.unlocked && !completed ? 'plan-locked' : ''}`}
                      title={c.title}
                    >
                      <span className="plan-code">{c.code}</span>
                      <span className="plan-title">{c.title}</span>
                      <span className="plan-credit">{c.credits}cr</span>
                      {state.semesterPlan[c.code] !== undefined && (
                        <button
                          className="plan-reset"
                          onClick={e => {
                            e.stopPropagation()
                            removeFromSemester(c.code)
                          }}
                          title="Reset to default semester"
                        >↺</button>
                      )}
                    </div>
                  )
                })}
                {slots.map((slot, sidx) => {
                  const group = slot.resolvedGroup
                  const filled = group ? (completionByGroup[group] || 0) : 0
                  const total = group ? (totalSlotsByGroup[slot.group || state.majorTrack || '__unresolved__'] || 0) : 0
                  const groupLabel = group ? (program.majorLabels?.[group] || group) : 'Pick a major track first'
                  return (
                    <div
                      key={`slot-${semNum}-${sidx}`}
                      className="plan-pill course-slot"
                      title={`${slot.label} — fill from ${groupLabel}`}
                    >
                      <span className="plan-code">🎯 {slot.label}</span>
                      <span className="plan-title">{groupLabel}</span>
                      {total > 0 && (
                        <span className="slot-counter">{Math.min(filled, total)} / {total} filled</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
