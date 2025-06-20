export function isUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

export function isPath(string) {
  return /^\/.*$/.test(string);
}
