const TABS = [
  { id: 'career', icon: '🎯', label: 'Career' },
  { id: 'courses', icon: '📚', label: 'Courses' },
  { id: 'planner', icon: '🗓', label: 'Planner' }
]

export default function TabNav({ active, onChange }) {
  return (
    <nav className="tab-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`tab ${active === tab.id ? 'tab-active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
