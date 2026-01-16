import { useSiteData } from '../data/siteData'
import './Hero.css'

function Hero() {
  const { siteSettings } = useSiteData()
  const { greeting, name, subtitle } = siteSettings.hero

  return (
    <section id="about" className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-greeting">{greeting}</p>
          <h1 className="hero-title">{name}</h1>
          <p className="hero-subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
