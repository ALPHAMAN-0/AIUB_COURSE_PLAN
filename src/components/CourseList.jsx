import { useMemo, useState } from 'react'
import { coreCourses, majorElectives, MAJOR_LABELS } from '../data/courses'
import { careerById } from '../data/careers'
import { usePlanner } from '../context/PlannerContext'
import CourseCard from './CourseCard'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'core', label: 'Core' },
  { id: 'major', label: 'My Major' },
  { id: 'electives', label: 'All Electives' },
  { id: 'recommended', label: 'Recommended' }
]

export default function CourseList() {
  const { state } = usePlanner()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const career = state.careerPath ? careerById[state.careerPath] : null
  const recommendedSet = useMemo(() => {
    if (!career) return new Set()
    return new Set([...career.recommended, ...career.cosElectives])
  }, [career])

  const myMajor = state.majorTrack
  const myMajorCourses = useMemo(
    () => majorElectives.filter(c => c.major === myMajor),
    [myMajor]
  )

  const matchesQuery = c => {
    if (!query) return true
    const q = query.toLowerCase()
    return c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
  }

  const renderSection = (title, courses, subtitle) => {
    const visible = courses.filter(matchesQuery)
    if (visible.length === 0) return null
    return (
      <div className="course-section" key={title}>
        <div className="course-section-head">
          <h3>{title}</h3>
          {subtitle && <span className="course-section-sub">{subtitle}</span>}
          <span className="course-section-count">{visible.length}</span>
        </div>
        <div className="course-grid">
          {visible.map(c => (
            <CourseCard key={c.code} code={c.code} recommended={recommendedSet.has(c.code)} />
          ))}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (filter === 'core') return renderSection('Core Courses', coreCourses, 'Required for all CSE students')
    if (filter === 'major') {
      if (!myMajor) {
        return <div className="empty-note">Pick a major track on the Career tab first.</div>
      }
      return renderSection(`${MAJOR_LABELS[myMajor]} Courses`, myMajorCourses, 'Your chosen track')
    }
    if (filter === 'electives') {
      return Object.entries(MAJOR_LABELS).map(([key, label]) =>
        renderSection(label, majorElectives.filter(c => c.major === key))
      )
    }
    if (filter === 'recommended') {
      if (recommendedSet.size === 0) {
        return <div className="empty-note">Pick a career path on the Career tab to see recommendations.</div>
      }
      const recList = [...coreCourses, ...majorElectives].filter(c => recommendedSet.has(c.code))
      return renderSection('Recommended for Your Career', recList)
    }
    return (
      <>
        {renderSection('Core Courses', coreCourses, 'Required for all CSE students')}
        {Object.entries(MAJOR_LABELS).map(([key, label]) =>
          renderSection(`${label} Electives`, majorElectives.filter(c => c.major === key))
        )}
      </>
    )
  }

  return (
    <section className="course-list">
      <div className="course-toolbar">
        <div className="filter-chips">
          {FILTERS.map(f => (
            <button
              key={f.id}
              className={`chip ${filter === f.id ? 'chip-active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search code or title…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="search-input"
        />
      </div>
      {renderContent()}
    </section>
  )
}
