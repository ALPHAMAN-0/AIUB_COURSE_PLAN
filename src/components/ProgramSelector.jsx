import { usePlanner } from '../context/PlannerContext'

export default function ProgramSelector({ mode = 'picker' }) {
  const { programs, program, setProgram } = usePlanner()

  if (mode === 'switcher') {
    return (
      <select
        className="program-switcher"
        value={program?.id || ''}
        onChange={e => setProgram(e.target.value)}
        aria-label="Switch program"
      >
        {programs.map(p => (
          <option key={p.id} value={p.id}>{p.shortName} — {p.name}</option>
        ))}
      </select>
    )
  }

  return (
    <div className="program-picker">
      <div className="program-picker-inner">
        <h1>AIUB Course Planner</h1>
        <p className="program-picker-sub">Pick your program to get started. You can switch anytime later.</p>
        <div className="program-picker-grid">
          {programs.map(p => (
            <button
              key={p.id}
              className="program-picker-card"
              onClick={() => setProgram(p.id)}
            >
              <div className="program-picker-logo">{p.logo || p.shortName}</div>
              <h3>{p.name}</h3>
              <p className="program-picker-meta">{p.totalCredits} credits · {p.semesterCount} semesters</p>
              <p className="program-picker-meta">{p.coreCourses.length} core courses · {Object.keys(p.majorLabels).length} elective tracks</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
