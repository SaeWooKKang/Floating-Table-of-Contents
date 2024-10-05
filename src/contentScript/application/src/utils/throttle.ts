// biome-ignore lint/complexity/noBannedTypes: <explanation>
export const throttle = <T>(func: Function, limit: number) => {
  let inThrottle: boolean

  return (...args: T[]) => {
    if (!inThrottle) {
      func(...args)

      inThrottle = true

      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}
