import { usePlanner } from '../context/PlannerContext'
import ProgramSelector from './ProgramSelector'

export default function Header() {
  const { totalCreditsCompleted, totalCredits, program, reset } = usePlanner()

  function handleReset() {
    if (window.confirm(`Reset all ${program.shortName} progress? This clears completed courses, career, and semester plan for ${program.shortName} only.`)) {
      reset()
    }
  }

  return (
    <header className="app-header">
      <div className="brand">
        <div className="logo">{program.logo || program.shortName}</div>
        <div>
          <h1>AIUB Course Planner</h1>
          <p className="subtitle">{program.name} · {program.totalCredits} credits</p>
        </div>
      </div>
      <div className="header-actions">
        <ProgramSelector mode="switcher" />
        <div className="credit-pill" title="Completed credits / Total required">
          <span className="credit-num">{totalCreditsCompleted}</span>
          <span className="credit-sep">/</span>
          <span className="credit-total">{totalCredits}</span>
          <span className="credit-label">credits</span>
        </div>
        <button className="btn btn-ghost" onClick={handleReset}>Reset</button>
      </div>
    </header>
  )
}
