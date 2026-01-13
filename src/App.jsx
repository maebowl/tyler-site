import './App.css'
import Hero from './components/Hero'
import BlenderProjects from './components/BlenderProjects'
import FavoriteSongs from './components/FavoriteSongs'
import Socials from './components/Socials'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <BlenderProjects />
        <FavoriteSongs />
        <Socials />
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-copyright">Tyler Richardson {new Date().getFullYear()}</p>
          <a
            href="https://github.com/maebowl/tyler-site"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-source"
          >
            Source
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
