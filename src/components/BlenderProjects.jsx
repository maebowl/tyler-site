import './BlenderProjects.css'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const projects = [
  {
    id: 1,
    title: "Project One",
    description: "A mysterious scene rendered in cycles",
  },
  {
    id: 2,
    title: "Project Two",
    description: "Low-poly environment design",
  },
  {
    id: 3,
    title: "Project Three",
    description: "Character modeling experiment",
  }
]

function BlenderProjects() {
  const [ref, isVisible] = useScrollAnimation(0.2)

  return (
    <section id="projects" className="projects">
      <div ref={ref} className={`section-container ${isVisible ? 'animate-in' : ''}`}>
        <h2 className="section-title">Blender Projects</h2>
        <p className="section-intro">
          Yes, I've made the donut. No, I won't stop there.
        </p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-card"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="project-image">
                <div className="placeholder-art">
                  <span className="placeholder-text">Coming Soon</span>
                </div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlenderProjects
