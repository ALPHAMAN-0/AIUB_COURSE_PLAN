import { useMemo, useState } from 'react'
import { allCourses, SEMESTER_LABELS, majorElectives } from '../data/courses'
import { usePlanner } from '../context/PlannerContext'

function getSemesterAssignment(course, semesterPlan) {
  if (semesterPlan[course.code] !== undefined) return semesterPlan[course.code]
  return course.defaultSemester
}

export default function SemesterPlanner() {
  const { state, assignSemester, removeFromSemester, completedSet, getCourseStatus } = usePlanner()
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
  }, [showMajor, state.majorTrack])

  const semesters = useMemo(() => {
    const buckets = Array.from({ length: 8 }, () => [])
    visibleCourses.forEach(c => {
      const slot = getSemesterAssignment(c, state.semesterPlan)
      buckets[slot - 1].push(c)
    })
    return buckets
  }, [visibleCourses, state.semesterPlan])

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
          const credits = courses.reduce((acc, c) => acc + c.credits, 0)
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
                {courses.length === 0 && <div className="semester-empty">Drop courses here</div>}
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
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
