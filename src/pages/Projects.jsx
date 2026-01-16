import { useEffect } from 'react'
import { useSiteData } from '../data/siteData'
import './Projects.css'

function Projects() {
  const { projects, siteSettings } = useSiteData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="projects-page">
      <div className="page-container">
        <header className="page-header">
          <h1 className="page-title">{siteSettings.projects.title}</h1>
          <p className="page-intro">
            {siteSettings.projects.intro}
          </p>
        </header>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-media">
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="project-video"
                  />
                ) : project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="project-image"
                  />
                ) : (
                  <div className="placeholder-art">
                    <span className="placeholder-text">Coming Soon</span>
                  </div>
                )}
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
