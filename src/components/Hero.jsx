import './Hero.css'
import osSun from '../assets/os_sun.png'

function Hero() {
  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <div className="hero-lightbulb">
          <img
            src={osSun}
            alt="The Sun"
            className="oneshot-sun pixel-art"
          />
        </div>
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-line">Tyler</span>
            <span className="title-line accent">Richardson</span>
          </h1>
          <div className="hero-terminal">
            <span className="terminal-prompt">&gt;</span>
            <span className="terminal-text">Drummer, Ryo-in-training, retro gaming enthusiast</span>
            <span className="terminal-cursor">_</span>
          </div>
          <p className="hero-description">
            DougDoug enjoyer, Nintendo collector, and proud owner of a DougDoug mug mug.
            Currently learning bass and perfecting my Dick Vitale's Awesome Baby College Hoops skills.
          </p>
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="scroll-text">scroll down</span>
        <div className="scroll-arrow">v</div>
      </div>
    </section>
  )
}

export default Hero
