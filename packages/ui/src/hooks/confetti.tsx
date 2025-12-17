import confetti from 'canvas-confetti'
import { useCallback } from 'react'

export const useConfettiCannons = () => {
  const start = useCallback(() => {
    const end = Date.now() + 3 * 1000 // 3 seconds
    const colors = ['#C8981E', '#EF4444']
    const frame = () => {
      if (Date.now() > end) {
        return
      }

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      })
      requestAnimationFrame(frame)
    }
    frame()
  }, [])

  return { start }
}
