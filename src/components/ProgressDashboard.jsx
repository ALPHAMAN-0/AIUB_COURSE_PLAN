import { usePlanner } from '../context/PlannerContext'

export default function ProgressDashboard() {
  const { totalCreditsCompleted, completedSet, totalCredits, coreCourses } = usePlanner()
  const pct = Math.min(100, Math.round((totalCreditsCompleted / totalCredits) * 100))
  const coreDone = coreCourses.filter(c => completedSet.has(c.code)).length

  return (
    <div className="progress-card">
      <div className="progress-stats">
        <div className="stat">
          <span className="stat-num">{totalCreditsCompleted}</span>
          <span className="stat-label">Credits Earned</span>
        </div>
        <div className="stat">
          <span className="stat-num">{Math.max(0, totalCredits - totalCreditsCompleted)}</span>
          <span className="stat-label">Credits Remaining</span>
        </div>
        <div className="stat">
          <span className="stat-num">{coreDone}<span className="stat-sub">/{coreCourses.length}</span></span>
          <span className="stat-label">Core Courses</span>
        </div>
        <div className="stat">
          <span className="stat-num">{pct}<span className="stat-sub">%</span></span>
          <span className="stat-label">Toward Degree</span>
        </div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
