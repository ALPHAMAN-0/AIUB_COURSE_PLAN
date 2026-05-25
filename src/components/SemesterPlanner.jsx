import { useMemo, useState } from 'react'
import { usePlanner } from '../context/PlannerContext'
import { SEMESTER_LABELS } from '../data/programs'

function getSemesterAssignment(course, semesterPlan) {
  if (semesterPlan[course.code] !== undefined) return semesterPlan[course.code]
  return course.defaultSemester
}

export default function SemesterPlanner() {
  const {
    state,
    assignSemester,
    removeFromSemester,
    completedSet,
    getCourseStatus,
    allCourses,
    electiveSlots,
    program
  } = usePlanner()
  const [showMajor, setShowMajor] = useState(true)
  const [dragCode, setDragCode] = useState(null)

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
    const buckets = Array.from({ length: 8 }, () => [])
    visibleCourses.forEach(c => {
      const slot = getSemesterAssignment(c, state.semesterPlan)
      const idx = Math.min(Math.max((slot || 1) - 1, 0), 7)
      buckets[idx].push(c)
    })
    return buckets
  }, [visibleCourses, state.semesterPlan])

  // Group slot definitions per semester and compute fill counters
  const slotsBySemester = useMemo(() => {
    const buckets = Array.from({ length: 8 }, () => [])
    electiveSlots.forEach(slot => {
      const idx = Math.min(Math.max((slot.semester || 1) - 1, 0), 7)
      // Resolve group: explicit value, else fall back to student's active major track
      const group = slot.group || state.majorTrack || null
      buckets[idx].push({ ...slot, resolvedGroup: group })
    })
    return buckets
  }, [electiveSlots, state.majorTrack])

  // Per-group completion counts (across all electives in that group that the student has completed)
  const completionByGroup = useMemo(() => {
    const counts = {}
    Object.keys(program.majorLabels || {}).forEach(group => {
      const codes = (program.majorElectives || []).filter(c => c.major === group).map(c => c.code)
      counts[group] = codes.filter(code => completedSet.has(code)).length
    })
    return counts
  }, [program, completedSet])

  // Per-group slot totals (how many slots in the curriculum point at each group)
  const totalSlotsByGroup = useMemo(() => {
    const totals = {}
    electiveSlots.forEach(s => {
      const g = s.group || state.majorTrack || '__unresolved__'
      totals[g] = (totals[g] || 0) + 1
    })
    return totals
  }, [electiveSlots, state.majorTrack])

  function handleDrop(e, targetSem) {
    e.preventDefault()
    const code = e.dataTransfer.getData('text/plain') || dragCode
    if (!code) return
    assignSemester(code, targetSem)
    setDragCode(null)
  }

  return (
    <section className="planner">
      <div className="planner-head">
        <div>
          <h2>Semester Roadmap</h2>
          <p>Drag courses between semesters to plan your degree. Defaults follow course codes.</p>
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
                <span className="semester-name">{SEMESTER_LABELS[idx]}</span>
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
