import { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

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

  return (
    <>
      <div
        className={`menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
      />
      <nav className={`navbar ${hidden ? 'navbar-hidden' : ''}`}>
        <div className="navbar-content">
          <a href="#" className="nav-logo" onClick={closeMenu}>
            TR
          </a>
          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li><a href="#projects" onClick={closeMenu}>Projects</a></li>
            <li><a href="#music" onClick={closeMenu}>Music</a></li>
            <li><a href="#socials" onClick={closeMenu}>Socials</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
