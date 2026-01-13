import { useState, useEffect } from 'react'
import './Hero.css'

function Hero() {
  const [scrollOpacity, setScrollOpacity] = useState(1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const fadeStart = 50
      const fadeEnd = 300

      if (scrollY <= fadeStart) {
        setScrollOpacity(1)
      } else if (scrollY >= fadeEnd) {
        setScrollOpacity(0)
      } else {
        setScrollOpacity(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-greeting">Hey, I'm</p>
          <h1 className="hero-title">Tyler Richardson</h1>
        </div>
      </div>
      <div
        className="scroll-indicator"
        style={{ opacity: scrollOpacity, pointerEvents: scrollOpacity < 0.1 ? 'none' : 'auto' }}
      >
        <svg className="scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  )
}

export default Hero
