import { useState } from 'react'
import Header from './components/Header'
import TabNav from './components/TabNav'
import ProgressDashboard from './components/ProgressDashboard'
import CareerPathSelector from './components/CareerPathSelector'
import MajorTrackSelector from './components/MajorTrackSelector'
import CourseList from './components/CourseList'
import SemesterPlanner from './components/SemesterPlanner'

export default function App() {
  const [tab, setTab] = useState('career')

  return (
    <div className="app">
      <Header />
      <main className="main">
        <ProgressDashboard />
        <TabNav active={tab} onChange={setTab} />
        {tab === 'career' && (
          <>
            <CareerPathSelector />
            <MajorTrackSelector />
          </>
        )}
        {tab === 'courses' && <CourseList />}
        {tab === 'planner' && <SemesterPlanner />}
      </main>
      <footer className="footer">
        <span>AIUB BSc in CSE · 148 credits</span>
        <span>Progress saved locally in your browser</span>
      </footer>
    </div>
  )
}
