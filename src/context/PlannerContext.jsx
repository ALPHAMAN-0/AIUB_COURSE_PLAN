import { createContext, useContext, useMemo, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { programs, programById } from '../data/programs'
import { isUnlocked, missingPrereqs } from '../utils/prerequisites'

const STORAGE_KEY = 'aiub_planner_v2'
const LEGACY_KEY = 'aiub_cse_planner_v1'

const emptyPlanner = () => ({
  completedCourses: [],
  careerPath: null,
  majorTrack: null,
  semesterPlan: {},
  startTerm: 'spring'
})

function makeDefaultState() {
  const byProgram = {}
  programs.forEach(p => { byProgram[p.id] = emptyPlanner() })
  return { programId: null, byProgram }
}

function initialState() {
  const base = makeDefaultState()
  if (typeof window === 'undefined') return base
  try {
    const legacy = window.localStorage.getItem(LEGACY_KEY)
    if (legacy) {
      const parsed = JSON.parse(legacy)
      base.programId = 'cse'
      base.byProgram.cse = {
        completedCourses: Array.isArray(parsed.completedCourses) ? parsed.completedCourses : [],
        careerPath: parsed.careerPath ?? null,
        majorTrack: parsed.majorTrack ?? null,
        semesterPlan: parsed.semesterPlan && typeof parsed.semesterPlan === 'object' ? parsed.semesterPlan : {},
        startTerm: parsed.startTerm || 'spring'
      }
    }
  } catch {
    // ignore — keep defaults
  }
  return base
}

const PlannerContext = createContext(null)

export function PlannerProvider({ children }) {
  // useLocalStorage returns the parsed v2 state if it exists; otherwise our initialState (which itself migrates v1 if present)
  const [state, setState] = useLocalStorage(STORAGE_KEY, initialState())

  const activeProgramId = state.programId
  const program = activeProgramId ? programById[activeProgramId] : null
  const active = activeProgramId && state.byProgram?.[activeProgramId]
    ? { ...emptyPlanner(), ...state.byProgram[activeProgramId] }
    : emptyPlanner()

  const completedSet = useMemo(() => new Set(active.completedCourses), [active.completedCourses])

  const totalCreditsCompleted = useMemo(() => {
    if (!program) return 0
    return active.completedCourses.reduce((acc, code) => {
      const c = program.courseByCode[code]
      return acc + (c ? c.credits : 0)
    }, 0)
  }, [active.completedCourses, program])

  const mutateActive = useCallback((fn) => {
    setState(prev => {
      if (!prev || !prev.programId) return prev
      const id = prev.programId
      const current = prev.byProgram?.[id] || emptyPlanner()
      const next = fn(current)
      return {
        ...prev,
        byProgram: { ...prev.byProgram, [id]: next }
      }
    })
  }, [setState])

  const setProgram = useCallback((id) => {
    setState(prev => {
      const base = prev && prev.byProgram ? prev : makeDefaultState()
      const byProgram = { ...base.byProgram }
      if (!byProgram[id]) byProgram[id] = emptyPlanner()
      return { ...base, programId: id, byProgram }
    })
  }, [setState])

  const toggleCourse = useCallback((code) => {
    mutateActive(curr => {
      const set = new Set(curr.completedCourses)
      if (set.has(code)) set.delete(code)
      else set.add(code)
      return { ...curr, completedCourses: [...set] }
    })
  }, [mutateActive])

  const setCareerPath = useCallback((id) => {
    if (!program) return
    const career = program.careerById[id]
    mutateActive(curr => ({
      ...curr,
      careerPath: id,
      majorTrack: career ? career.majorTrack : curr.majorTrack
    }))
  }, [mutateActive, program])

  const setMajorTrack = useCallback((track) => {
    mutateActive(curr => ({ ...curr, majorTrack: track }))
  }, [mutateActive])

  const setStartTerm = useCallback((term) => {
    mutateActive(curr => ({ ...curr, startTerm: term }))
  }, [mutateActive])

  const assignSemester = useCallback((code, semester) => {
    mutateActive(curr => ({
      ...curr,
      semesterPlan: { ...curr.semesterPlan, [code]: semester }
    }))
  }, [mutateActive])

  const removeFromSemester = useCallback((code) => {
    mutateActive(curr => {
      const next = { ...curr.semesterPlan }
      delete next[code]
      return { ...curr, semesterPlan: next }
    })
  }, [mutateActive])

  const reset = useCallback(() => {
    mutateActive(() => emptyPlanner())
  }, [mutateActive])

  const getCourseStatus = useCallback((code) => {
    if (!program) return null
    const course = program.courseByCode[code]
    if (!course) return null
    const completed = completedSet.has(code)
    const unlocked = isUnlocked(course, completedSet, totalCreditsCompleted)
    const missing = unlocked ? [] : missingPrereqs(course, completedSet, totalCreditsCompleted)
    return { course, completed, unlocked, missing }
  }, [completedSet, totalCreditsCompleted, program])

  const value = {
    state: { ...active, programId: activeProgramId },
    setProgram,
    program,
    programs,
    coreCourses: program?.coreCourses || [],
    majorElectives: program?.majorElectives || [],
    allCourses: program?.allCourses || [],
    courseByCode: program?.courseByCode || {},
    careers: program?.careers || [],
    careerById: program?.careerById || {},
    majorLabels: program?.majorLabels || {},
    majorDescriptions: program?.majorDescriptions || {},
    electiveSlots: program?.electiveSlots || [],
    totalCredits: program?.totalCredits || 148,
    completedSet,
    totalCreditsCompleted,
    toggleCourse,
    setCareerPath,
    setMajorTrack,
    setStartTerm,
    assignSemester,
    removeFromSemester,
    reset,
    getCourseStatus
  }

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>
}

export function usePlanner() {
  const ctx = useContext(PlannerContext)
  if (!ctx) throw new Error('usePlanner must be used inside PlannerProvider')
  return ctx
}
