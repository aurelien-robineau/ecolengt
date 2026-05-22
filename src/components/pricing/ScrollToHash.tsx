'use client'

import { useEffect } from 'react'

/** Scroll to the URL hash on load (e.g. /tarifs#stages-intensifs from the stages page). */
export function ScrollToHash() {
  useEffect(() => {
    const { hash } = window.location
    if (!hash) {
      return
    }

    const scrollToTarget = () => {
      const target = document.querySelector(hash)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    requestAnimationFrame(scrollToTarget)
  }, [])

  return null
}
