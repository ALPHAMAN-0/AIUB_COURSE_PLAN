// Resolve hook: when a relative import cannot be found as written, retry it the
// way Vite would — first with '.js', then as a directory with '/index.js'.
const SUFFIXES = ['.js', '/index.js']
const RETRYABLE = new Set(['ERR_MODULE_NOT_FOUND', 'ERR_UNSUPPORTED_DIR_IMPORT'])

export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context)
  } catch (error) {
    const isRelative = specifier.startsWith('./') || specifier.startsWith('../')
    if (!isRelative || !RETRYABLE.has(error?.code)) throw error
    for (const suffix of SUFFIXES) {
      try {
        return await nextResolve(specifier + suffix, context)
      } catch {
        // not this one — try the next candidate
      }
    }
    throw error
  }
}
