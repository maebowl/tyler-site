import './Socials.css'

const socials = [
  {
    id: 'discord',
    name: 'Discord',
    description: 'Join the server or add me',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    )
  },
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'Watch my content',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    id: 'twitch',
    name: 'Twitch',
    description: 'Catch me live',
    url: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
      </svg>
    )
  }
]

function Socials() {
  return (
    <section id="socials" className="socials">
      <h2 className="section-title">Socials</h2>
      <p className="socials-intro">
        Come hang out, talk retro games, or watch me fail at whatever I'm doing.
      </p>
      <div className="socials-grid">
        {socials.map((social, index) => (
          <a
            key={social.id}
            href={social.url}
            className={`social-card social-${social.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="social-icon-wrapper">
              {social.icon}
            </div>
            <div className="social-info">
              <h3 className="social-name">{social.name}</h3>
              <p className="social-description">{social.description}</p>
            </div>
            <div className="social-arrow">-&gt;</div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Socials
