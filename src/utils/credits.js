export function parseCredit(raw) {
  if (!raw) return { credits: 0, hasLab: false }
  const num = parseInt(raw, 10) || 0
  const hasLab = /lab/i.test(raw)
  return { credits: num, hasLab }
}

export function sumCredits(courses) {
  return courses.reduce((acc, c) => acc + (c.credits || 0), 0)
}
