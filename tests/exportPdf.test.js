import { describe, it, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { downloadPlannerPdf } from '../src/utils/exportPdf'

// exportPdf.js writes an HTML string into a pop-up window with document.write().
// These tests swap in a fake `window` so the generated markup can be inspected
// without a browser.
function exportToHtml(args) {
  let written = null
  const popup = {
    document: {
      open() {},
      write(html) { written = html },
      close() {}
    }
  }
  globalThis.window = { open: () => popup }
  downloadPlannerPdf(args)
  return written
}

const program = {
  name: 'BSc in Computer Science & Engineering',
  totalCredits: 148,
  majorLabels: { softwareEngineering: 'Software Engineering' }
}

const projection = {
  finalLabel: 'Fall 2029',
  yearsApprox: 4,
  termsNeeded: 12,
  creditsCompleted: 4,
  remainingCredits: 144
}

describe('downloadPlannerPdf', () => {
  afterEach(() => {
    delete globalThis.window
    delete globalThis.alert
  })

  it('writes a printable page with the plan, slots and graduation summary', () => {
    const html = exportToHtml({
      program,
      semesterLabels: ['T1 · Spring 2026', 'T2 · Summer 2026'],
      semesterCourses: [
        [
          { code: 'CSC1102', title: 'Introduction to Programming', credits: 3 },
          { code: 'CSC1103', title: 'Introduction to Programming Lab', credits: 1 }
        ],
        []
      ],
      semesterSlots: [[{ label: 'CSE MAJOR 1', resolvedGroup: 'softwareEngineering' }], []],
      completedSet: new Set(['CSC1102']),
      projection
    })

    assert.ok(html.startsWith('<!doctype html>'))
    assert.ok(html.includes('<h1>BSc in Computer Science &amp; Engineering</h1>'))
    assert.ok(html.includes('<h3>T1 · Spring 2026</h3>'))
    assert.ok(html.includes('<span class="sem-credit">7 cr</span>'), 'credits: 3 + 1 + one 3-credit slot')
    assert.ok(html.includes('<td class="title">Introduction to Programming</td>'))
    assert.ok(html.includes('CSE MAJOR 1 — Software Engineering'))
    assert.ok(html.includes('No courses planned'), 'empty semester is labelled')
    assert.ok(html.includes('<strong>Expected graduation:</strong> Fall 2029'))
    assert.ok(html.includes('4 / 148 completed · 144 to go'))
    assert.equal(html.match(/<td class="status">✓<\/td>/g).length, 1, 'only the completed course is ticked')
  })

  it('escapes HTML in every text field before it reaches document.write', () => {
    const payload = `<img src=x onerror="alert('xss')"></td><script>alert(1)</script>&`
    const escaped = '&lt;img src=x onerror=&quot;alert(&#39;xss&#39;)&quot;&gt;&lt;/td&gt;&lt;script&gt;alert(1)&lt;/script&gt;&amp;'

    const html = exportToHtml({
      program: { name: payload, totalCredits: 148, majorLabels: { known: payload } },
      semesterLabels: [payload],
      semesterCourses: [[{ code: payload, title: payload, credits: 3 }]],
      semesterSlots: [
        [
          { label: payload, resolvedGroup: 'known' },
          { label: 'SLOT', resolvedGroup: payload } // unknown group: the raw value is shown
        ]
      ],
      completedSet: new Set(),
      projection: { ...projection, finalLabel: payload }
    })

    assert.ok(!html.includes('<img'), 'no injected element')
    assert.ok(!html.includes('onerror="'), 'no injected attribute')
    assert.ok(!html.includes('alert(1)</script>'), 'no injected script')
    assert.equal(html.match(/<script/g).length, 1, "only the page's own print script")

    // title, heading, semester label, course code, course title, slot label,
    // known group label, unknown group value, projection label
    assert.equal(html.split(escaped).length - 1, 9)
  })

  it('renders with the defaults when optional data is missing', () => {
    const html = exportToHtml({ program: null })
    assert.ok(html.includes('<h1>Course Planner</h1>'))
    assert.ok(html.includes('<div class="grid"></div>'))
    assert.ok(!html.includes('Expected graduation'))
  })

  it('tells the user when the pop-up is blocked instead of throwing', () => {
    const alerts = []
    globalThis.window = { open: () => null }
    globalThis.alert = message => alerts.push(message)

    assert.doesNotThrow(() => downloadPlannerPdf({ program }))
    assert.equal(alerts.length, 1)
    assert.match(alerts[0], /pop-ups/i)
  })
})
