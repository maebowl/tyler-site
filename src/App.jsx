import './App.css'
import Hero from './components/Hero'
import BlenderProjects from './components/BlenderProjects'
import FavoriteSongs from './components/FavoriteSongs'
import Socials from './components/Socials'
import StarField from './components/StarField'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="app">
      <StarField />
      <Navbar />
      <main>
        <Hero />
        <BlenderProjects />
        <FavoriteSongs />
        <Socials />
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            <span className="lightbulb-icon">*</span>
            You only have one shot.
            <span className="lightbulb-icon">*</span>
          </p>
          <p className="footer-copyright">Tyler Richardson {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
