import { usePlanner } from '../context/PlannerContext'

export default function MajorTrackSelector() {
  const { state, setMajorTrack, majorLabels, majorDescriptions, program } = usePlanner()
  const selected = state.majorTrack
  const entries = Object.entries(majorLabels)

  if (entries.length === 0) return null

  const blurb = program.id === 'cse'
    ? 'You take 3 CSE Major courses + 2 COS Electives from your chosen track.'
    : `Pick a major track. Your ${program.shortName} MAJOR slots (5 courses) come from this group.`

  return (
    <section className="major-section">
      <div className="section-head">
        <h2>Choose your major track</h2>
        <p>{blurb}</p>
      </div>
      <div className="major-grid">
        {entries.map(([key, label]) => {
          const active = selected === key
          return (
            <button
              key={key}
              className={`major-card ${active ? 'major-card-active' : ''}`}
              onClick={() => setMajorTrack(key)}
            >
              <h3>{label}</h3>
              {majorDescriptions[key] && <p>{majorDescriptions[key]}</p>}
              {active && <span className="selected-tag">Selected</span>}
            </button>
          )
        })}
      </div>
    </section>
  )
}
