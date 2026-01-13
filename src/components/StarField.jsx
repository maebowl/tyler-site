import { useEffect, useRef } from 'react'
import './StarField.css'

function StarField() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const starCount = 100

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`
      star.style.animationDelay = `${Math.random() * 3}s`
      star.style.animationDuration = `${2 + Math.random() * 3}s`

      // Random star sizes
      const size = Math.random() < 0.8 ? 1 : 2
      star.style.width = `${size}px`
      star.style.height = `${size}px`

      container.appendChild(star)
    }

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return <div ref={containerRef} className="star-field" />
}

export default StarField
