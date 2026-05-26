// Lightweight PDF export: open a print-styled HTML window and trigger the
// browser's print dialog. The user picks "Save as PDF" in the dialog.
// No new dependencies.

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function downloadPlannerPdf({
  program,
  semesterPlan = {},
  semesterLabels = [],
  semesterCourses = [],
  semesterSlots = [],
  completedSet,
  projection
}) {
  const win = window.open('', '_blank', 'width=900,height=1100')
  if (!win) {
    alert('Pop-ups blocked. Please allow pop-ups for this site to download your planner.')
    return
  }

  const programName = escapeHtml(program?.name || 'Course Planner')
  const totalCredits = program?.totalCredits || 148
  const generated = new Date().toLocaleString()

  const projSummary = projection
    ? `<div class="proj">
         <div><strong>Expected graduation:</strong> ${escapeHtml(projection.finalLabel || '—')}</div>
         <div><strong>Approx. duration:</strong> ${projection.yearsApprox} years (${projection.termsNeeded} terms)</div>
         <div><strong>Credits:</strong> ${projection.creditsCompleted} / ${totalCredits} completed · ${projection.remainingCredits} to go</div>
       </div>`
    : ''

  const semesterHtml = semesterLabels.map((label, idx) => {
    const courses = semesterCourses[idx] || []
    const slots = semesterSlots[idx] || []
    const creditSum = courses.reduce((acc, c) => acc + (c.credits || 0), 0) + slots.length * 3
    const courseRows = courses.map(c => {
      const done = completedSet && completedSet.has(c.code) ? '✓' : ''
      return `<tr>
        <td class="status">${done}</td>
        <td class="code">${escapeHtml(c.code)}</td>
        <td class="title">${escapeHtml(c.title)}</td>
        <td class="cr">${c.credits}cr</td>
      </tr>`
    }).join('')
    const slotRows = slots.map(s => `<tr class="slot-row">
      <td class="status"></td>
      <td class="code">[slot]</td>
      <td class="title">${escapeHtml(s.label)}${s.resolvedGroup ? ` — ${escapeHtml(program?.majorLabels?.[s.resolvedGroup] || s.resolvedGroup)}` : ''}</td>
      <td class="cr">3cr</td>
    </tr>`).join('')
    const empty = courses.length === 0 && slots.length === 0
      ? `<tr><td colspan="4" class="empty">No courses planned</td></tr>`
      : ''
    return `<section class="sem">
      <header>
        <h3>${escapeHtml(label)}</h3>
        <span class="sem-credit">${creditSum} cr</span>
      </header>
      <table>
        <thead>
          <tr><th></th><th>Code</th><th>Title</th><th>Cr</th></tr>
        </thead>
        <tbody>
          ${courseRows}${slotRows}${empty}
        </tbody>
      </table>
    </section>`
  }).join('')

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${programName} — Semester Plan</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, "Segoe UI", Roboto, Arial, sans-serif; color: #111; background: #fff; padding: 1.5rem 1.75rem; margin: 0; }
    h1 { font-size: 1.4rem; margin: 0 0 0.25rem; }
    h2 { font-size: 1rem; margin: 0; color: #555; font-weight: 500; }
    .meta { font-size: 0.75rem; color: #777; margin-top: 0.25rem; }
    .proj { margin: 1rem 0; padding: 0.75rem 1rem; background: #f4f7fb; border: 1px solid #d6dde5; border-radius: 8px; font-size: 0.9rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.5rem; }
    .proj strong { color: #1f2937; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 1rem; }
    .sem { border: 1px solid #ccc; border-radius: 6px; padding: 0.5rem 0.75rem; break-inside: avoid; }
    .sem header { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.35rem; margin-bottom: 0.4rem; }
    .sem h3 { font-size: 0.9rem; margin: 0; color: #111; }
    .sem-credit { font-size: 0.7rem; color: #555; }
    table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
    th { text-align: left; color: #6b7280; font-weight: 500; padding: 0.15rem 0.25rem; border-bottom: 1px solid #e5e7eb; }
    td { padding: 0.18rem 0.25rem; border-bottom: 1px dotted #eee; vertical-align: top; }
    td.status { width: 1.2em; color: #16a34a; font-weight: 700; }
    td.code { font-family: ui-monospace, "SF Mono", Monaco, monospace; color: #1f6feb; width: 5.5em; }
    td.cr { text-align: right; color: #6b7280; width: 2.5em; }
    td.empty { color: #9ca3af; font-style: italic; text-align: center; }
    .slot-row td.code { color: #b45309; }
    footer { margin-top: 1.5rem; padding-top: 0.5rem; border-top: 1px solid #e5e7eb; font-size: 0.7rem; color: #6b7280; }
    @page { size: A4; margin: 12mm; }
    @media print { body { padding: 0; } .grid { gap: 0.5rem; } }
  </style>
</head>
<body>
  <h1>${programName}</h1>
  <h2>Semester Plan</h2>
  <div class="meta">Generated ${escapeHtml(generated)}</div>
  ${projSummary}
  <div class="grid">${semesterHtml}</div>
  <footer>AIUB Course Planner — plan is approximate; confirm with your academic advisor.</footer>
  <script>
    window.addEventListener('load', () => {
      setTimeout(() => { window.print(); }, 100);
    });
    window.addEventListener('afterprint', () => { window.close(); });
  </script>
</body>
</html>`

  win.document.open()
  win.document.write(html)
  win.document.close()
}
