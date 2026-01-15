import { useEffect } from 'react'
import { useSiteData } from '../data/siteData'
import './Videos.css'

// Extract YouTube video ID from various URL formats
function getYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function Videos() {
  const { videos } = useSiteData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="videos-page">
      <div className="page-container">
        <header className="page-header">
          <h1 className="page-title">Videos</h1>
          <p className="page-intro">
            Check out some of my favorite videos and content.
          </p>
        </header>
        <div className="videos-grid">
          {videos.map((video, index) => {
            const videoId = getYouTubeId(video.youtubeUrl)
            return (
              <article
                key={video.id}
                className="video-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="video-embed">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="video-error">Invalid YouTube URL</div>
                  )}
                </div>
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-subtitle">{video.subtitle}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Videos
