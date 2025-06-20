export function debounceAsync(fn, wait) {
  let timeout
  let lastCall

  return (...args) => {
    clearTimeout(timeout)

    return new Promise((resolve, reject) => {
      timeout = setTimeout(async () => {
        try {
          const result = await fn(...args)
          resolve(result)
        } catch (err) {
          reject(err)
        }
      }, wait)

      lastCall = timeout
    })
  }
}

