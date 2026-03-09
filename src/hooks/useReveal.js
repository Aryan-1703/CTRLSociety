import { useEffect } from 'react'

export function useReveal(deps = []) {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.08 }
    )
    // Small delay so newly-rendered cards are in the DOM
    const tid = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el))
    }, 30)
    return () => { clearTimeout(tid); io.disconnect() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
