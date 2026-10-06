// Test-only helper, loaded with `node --import` (see the "test" script in package.json).
//
// The app is written for Vite, so modules import each other without file
// extensions ('./cse', '../data/programs'). Node's own ESM loader needs the
// full file name, so this registers a small resolve hook that lets the built-in
// test runner load src/ unchanged — no bundler and no extra dependencies.
import { register } from 'node:module'

register('./resolve-extensionless.mjs', import.meta.url)
