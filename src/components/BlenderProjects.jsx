import './BlenderProjects.css'

const projects = [
  {
    id: 1,
    title: "Project One",
    description: "A mysterious scene rendered in cycles",
    image: null,
    placeholder: true
  },
  {
    id: 2,
    title: "Project Two",
    description: "Low-poly environment design",
    image: null,
    placeholder: true
  },
  {
    id: 3,
    title: "Project Three",
    description: "Character modeling experiment",
    image: null,
    placeholder: true
  }
]

function BlenderProjects() {
  return (
    <section id="projects" className="projects">
      <h2 className="section-title">Blender Projects</h2>
      <p className="projects-intro">
        Yes, I've made the donut. No, I won't stop there.
      </p>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="project-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="project-image">
              {project.placeholder ? (
                <div className="placeholder-art">
                  <div className="placeholder-icon">
                    <span className="cube-face top"></span>
                    <span className="cube-face front"></span>
                    <span className="cube-face side"></span>
                  </div>
                  <span className="placeholder-text">[ render ]</span>
                </div>
              ) : (
                <img src={project.image} alt={project.title} />
              )}
            </div>
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="projects-note">
        <span className="note-icon">[i]</span>
        More projects coming soon...
      </p>
    </section>
  )
}

export default BlenderProjects
