import { usePlanner } from '../context/PlannerContext'
import { TOTAL_CREDITS_REQUIRED } from '../data/courses'

export default function Header() {
  const { totalCreditsCompleted, reset } = usePlanner()

  function handleReset() {
    if (window.confirm('Reset all progress? This clears completed courses, career, and semester plan.')) {
      reset()
    }
  }

  return (
    <header className="app-header">
      <div className="brand">
        <div className="logo">CSE</div>
        <div>
          <h1>AIUB Course Planner</h1>
          <p className="subtitle">BSc in Computer Science &amp; Engineering · 148 credits</p>
        </div>
      </div>
      <div className="header-actions">
        <div className="credit-pill" title="Completed credits / Total required">
          <span className="credit-num">{totalCreditsCompleted}</span>
          <span className="credit-sep">/</span>
          <span className="credit-total">{TOTAL_CREDITS_REQUIRED}</span>
          <span className="credit-label">credits</span>
        </div>
        <button className="btn btn-ghost" onClick={handleReset}>Reset</button>
      </div>
    </header>
  )
}
