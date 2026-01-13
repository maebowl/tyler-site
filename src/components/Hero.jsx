import './Hero.css'

function Hero() {
  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-greeting">Hey, I'm</p>
          <h1 className="hero-title">Tyler Richardson</h1>
          <p className="hero-subtitle">
            Drummer, Ryo-in-training, retro gaming enthusiast
          </p>
          <p className="hero-description">
            DougDoug enjoyer, Nintendo collector, and proud owner of a DougDoug mug mug.
            Currently learning bass and perfecting my Dick Vitale's Awesome Baby College Hoops skills.
          </p>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="scroll-line"></span>
      </div>
    </section>
  )
}

export default Hero
