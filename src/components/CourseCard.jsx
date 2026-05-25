import { usePlanner } from '../context/PlannerContext'

export default function CourseCard({ code, recommended = false }) {
  const { getCourseStatus, toggleCourse, completedSet } = usePlanner()
  const status = getCourseStatus(code)
  if (!status) return null
  const { course, completed, unlocked, missing } = status

  const classes = [
    'course-card',
    completed && 'course-completed',
    !unlocked && !completed && 'course-locked',
    recommended && 'course-recommended'
  ].filter(Boolean).join(' ')

  return (
    <label className={classes}>
      <input
        type="checkbox"
        checked={completed}
        disabled={!unlocked && !completed}
        onChange={() => toggleCourse(code)}
        aria-label={`Mark ${course.code} as completed`}
      />
      <div className="course-body">
        <div className="course-head">
          <span className="course-code">{course.code}</span>
          <span className="course-credit">
            {course.credits} cr{course.hasLab && ' · Lab'}
          </span>
        </div>
        <div className="course-title">{course.title}</div>
        <div className="course-prereqs">
          {course.prerequisites.length === 0 && !course.creditRequirement && (
            <span className="prereq-none">No prerequisites</span>
          )}
          {course.prerequisites.map(p => (
            <span
              key={p}
              className={`prereq-chip ${completedSet.has(p) ? 'prereq-done' : 'prereq-missing'}`}
            >
              {p}
            </span>
          ))}
          {course.creditRequirement && (
            <span className="prereq-chip prereq-credit">{course.creditRequirement} credits</span>
          )}
        </div>
        {!unlocked && !completed && missing.length > 0 && (
          <div className="lock-note">🔒 Needs: {missing.join(', ')}</div>
        )}
        {recommended && <div className="rec-badge">★ Recommended for your career</div>}
      </div>
    </label>
  )
}
