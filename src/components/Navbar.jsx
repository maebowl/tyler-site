import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    closeMenu()

    // If not on home page, navigate there first
    if (!isHome) {
      window.location.href = `/${sectionId}`
      return
    }

    const section = document.querySelector(sectionId)
    if (section) {
      const offset = 20 // Small offset from top after navbar hides
      const targetPosition = section.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })

      // Hide navbar after scroll starts
      setTimeout(() => {
        setHidden(true)
        setLastScrollY(targetPosition)
      }, 100)
    }
  }

  const handleLogoClick = (e) => {
    closeMenu()
    if (isHome) {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <div
        className={`menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />
      <nav className={`navbar ${hidden ? 'navbar-hidden' : ''}`}>
        <div className="navbar-content">
          <Link to="/" className="nav-logo" onClick={handleLogoClick}>
            TR
          </Link>
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#projects" onClick={(e) => scrollToSection(e, '#projects')}>Projects</a></li>
            <li><a href="#music" onClick={(e) => scrollToSection(e, '#music')}>Music</a></li>
            <li><a href="#socials" onClick={(e) => scrollToSection(e, '#socials')}>Socials</a></li>
            <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
