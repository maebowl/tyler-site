import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <a href="#" className="nav-logo">
          <span className="logo-bracket">[</span>
          <span className="logo-text">TR</span>
          <span className="logo-bracket">]</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#music">Music</a></li>
          <li><a href="#socials">Socials</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
