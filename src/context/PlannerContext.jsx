import { createContext, useContext, useMemo, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { allCourses, courseByCode } from '../data/courses'
import { careerById } from '../data/careers'
import { isUnlocked, missingPrereqs } from '../utils/prerequisites'

const STORAGE_KEY = 'aiub_cse_planner_v1'

const defaultState = {
  completedCourses: [],
  careerPath: null,
  majorTrack: null,
  semesterPlan: {}
}

const PlannerContext = createContext(null)

export function PlannerProvider({ children }) {
  const [state, setState] = useLocalStorage(STORAGE_KEY, defaultState)

  const completedSet = useMemo(() => new Set(state.completedCourses), [state.completedCourses])

  const totalCreditsCompleted = useMemo(
    () =>
      state.completedCourses.reduce((acc, code) => {
        const c = courseByCode[code]
        return acc + (c ? c.credits : 0)
      }, 0),
    [state.completedCourses]
  )

  const toggleCourse = useCallback(
    code => {
      setState(prev => {
        const set = new Set(prev.completedCourses)
        if (set.has(code)) set.delete(code)
        else set.add(code)
        return { ...prev, completedCourses: [...set] }
      })
    },
    [setState]
  )

  const setCareerPath = useCallback(
    id => {
      setState(prev => {
        const career = careerById[id]
        return {
          ...prev,
          careerPath: id,
          majorTrack: career ? career.majorTrack : prev.majorTrack
        }
      })
    },
    [setState]
  )

  const setMajorTrack = useCallback(
    track => {
      setState(prev => ({ ...prev, majorTrack: track }))
    },
    [setState]
  )

  const assignSemester = useCallback(
    (code, semester) => {
      setState(prev => ({
        ...prev,
        semesterPlan: { ...prev.semesterPlan, [code]: semester }
      }))
    },
    [setState]
  )

  const removeFromSemester = useCallback(
    code => {
      setState(prev => {
        const next = { ...prev.semesterPlan }
        delete next[code]
        return { ...prev, semesterPlan: next }
      })
    },
    [setState]
  )

  const reset = useCallback(() => {
    setState(defaultState)
  }, [setState])

  const getCourseStatus = useCallback(
    code => {
      const course = courseByCode[code]
      if (!course) return null
      const completed = completedSet.has(code)
      const unlocked = isUnlocked(course, completedSet, totalCreditsCompleted)
      const missing = unlocked ? [] : missingPrereqs(course, completedSet, totalCreditsCompleted)
      return { course, completed, unlocked, missing }
    },
    [completedSet, totalCreditsCompleted]
  )

  const value = {
    state,
    completedSet,
    totalCreditsCompleted,
    toggleCourse,
    setCareerPath,
    setMajorTrack,
    assignSemester,
    removeFromSemester,
    reset,
    getCourseStatus,
    allCourses
  }

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
}

export function usePlanner() {
  const ctx = useContext(PlannerContext)
  if (!ctx) throw new Error('usePlanner must be used inside PlannerProvider')
  return ctx
}
