import { useSiteData } from '../data/siteData'
import { InkSplat } from './InkSplatter'
import './Projects.css'

export default function Projects() {
  const { projects } = useSiteData()

  const inkColors = ['pink', 'green', 'blue', 'orange', 'purple']

  return (
    <section id="projects" className="section projects-section">
      <h2 className="section-title">3D Projects</h2>

      <div className="projects-grid">
        {projects.map((project, index) => {
          const color = inkColors[index % inkColors.length]
          return (
            <div
              key={project.id}
              className={`project-card splat-card ink-${color}`}
            >
              <div className="project-number">#{String(index + 1).padStart(2, '0')}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <InkSplat
                color={color}
                size={70}
                variant={(index % 3) + 1}
                className="project-splat-svg"
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
