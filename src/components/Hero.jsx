import './Hero.css'

function Hero() {
  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-greeting">Hey, I'm</p>
          <h1 className="hero-title">Tyler Richardson</h1>
        </div>
      </div>
      <div className="scroll-indicator">
        <svg className="scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  )
}

export default Hero
