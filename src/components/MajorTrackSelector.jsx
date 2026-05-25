import { MAJOR_LABELS } from '../data/courses'
import { usePlanner } from '../context/PlannerContext'

const DESCRIPTIONS = {
  informationSystems: 'Databases, ERP, business intelligence, e-commerce.',
  softwareEngineering: 'Software design, testing, web, mobile, app development.',
  computationalTheory: 'Algorithms, ML, NLP, parallel computing, graph theory.',
  computerEngineering: 'Hardware, networks, embedded, VLSI, robotics, security.'
}

export default function MajorTrackSelector() {
  const { state, setMajorTrack } = usePlanner()
  const selected = state.majorTrack

  return (
    <section className="major-section">
      <div className="section-head">
        <h2>Choose your major track</h2>
        <p>You take 3 CSE Major courses + 2 COS Electives from your chosen track.</p>
      </div>
      <div className="major-grid">
        {Object.entries(MAJOR_LABELS).map(([key, label]) => {
          const active = selected === key
          return (
            <button
              key={key}
              className={`major-card ${active ? 'major-card-active' : ''}`}
              onClick={() => setMajorTrack(key)}
            >
              <h3>{label}</h3>
              <p>{DESCRIPTIONS[key]}</p>
              {active && <span className="selected-tag">Selected</span>}
            </button>
          )
        })}
      </div>
    </section>
  )
}
