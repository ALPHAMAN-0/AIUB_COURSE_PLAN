export function parsePrereq(raw) {
  if (raw == null || raw === 'Nil' || raw === 'Not mentioned') {
    return { codes: [], creditRequirement: null }
  }

  if (Array.isArray(raw)) {
    return { codes: raw.filter(Boolean).map(s => String(s).trim()), creditRequirement: null }
  }

  const creditMatch = String(raw).match(/^(\d+)\s*Credits?(\s+Completed)?$/i)
  if (creditMatch) {
    return { codes: [], creditRequirement: parseInt(creditMatch[1], 10) }
  }

  const codes = String(raw)
    .split(/&|,/)
    .map(s => s.trim())
    .filter(Boolean)
  return { codes, creditRequirement: null }
}

export function isUnlocked(course, completedSet, totalCreditsCompleted) {
  if (course.creditRequirement && totalCreditsCompleted < course.creditRequirement) {
    return false
  }
  return course.prerequisites.every(code => completedSet.has(code))
}

export function missingPrereqs(course, completedSet, totalCreditsCompleted) {
  const missing = course.prerequisites.filter(code => !completedSet.has(code))
  if (course.creditRequirement && totalCreditsCompleted < course.creditRequirement) {
    missing.push(`${course.creditRequirement} credits (${course.creditRequirement - totalCreditsCompleted} to go)`)
  }
  return missing
}
