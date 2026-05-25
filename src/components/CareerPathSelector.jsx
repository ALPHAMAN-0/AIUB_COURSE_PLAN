import { usePlanner } from '../context/PlannerContext'

export default function CareerPathSelector() {
  const { state, setCareerPath, careers, majorLabels } = usePlanner()
  const selected = state.careerPath

  if (careers.length === 0) {
    return (
      <section className="career-section">
        <div className="section-head">
          <h2>Career paths</h2>
          <p>No careers are defined for this program yet.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="career-section">
      <div className="section-head">
        <h2>Pick your career path</h2>
        <p>We'll highlight the right major track and electives for you. You can change this anytime.</p>
      </div>
      <div className="career-grid">
        {careers.map(career => {
          const active = selected === career.id
          return (
            <button
              key={career.id}
              className={`career-card ${active ? 'career-card-active' : ''}`}
              onClick={() => setCareerPath(career.id)}
            >
              <span className="career-icon" aria-hidden>{career.icon}</span>
              <h3>{career.title}</h3>
              <p className="career-blurb">{career.blurb}</p>
              <div className="career-meta">
                <span className="major-tag">{majorLabels[career.majorTrack] || career.majorTrack}</span>
                {active && <span className="selected-tag">Selected</span>}
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
