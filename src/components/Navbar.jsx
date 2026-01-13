import { useState } from 'react'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
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
  )
}

export default Navbar
