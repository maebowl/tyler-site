import { useEffect, useState } from 'react'
import { useSiteData } from '../data/siteData'
import './Music.css'

// Extract YouTube video ID from various URL formats
function getYouTubeId(url) {
  if (!url) return null
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

function Music() {
  const { songs } = useSiteData()
  const [activeVideo, setActiveVideo] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setActiveVideo(null)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSongClick = (song) => {
    if (song.youtubeUrl) {
      setActiveVideo(song)
    }
  }

  return (
    <div className="music-page">
      <div className="page-container">
        <header className="page-header">
          <h1 className="page-title">Favorite Songs</h1>
          <p className="page-intro">
            What's on rotation while I'm drumming, gaming, or pretending to practice bass.
          </p>
        </header>
        <div className="song-list">
          {songs.map((song, index) => {
            const hasVideo = !!song.youtubeUrl
            return (
              <div
                key={song.id}
                className={`song-item ${hasVideo ? 'has-video' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleSongClick(song)}
              >
                <span className="song-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="song-info">
                  <span className="song-title">{song.title}</span>
                  <span className="song-artist">{song.artist}</span>
                </div>
                {hasVideo && (
                  <svg className="play-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="video-modal-overlay" onClick={() => setActiveVideo(null)}>
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveVideo(null)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="modal-video-container">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(activeVideo.youtubeUrl)}?autoplay=1`}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="modal-info">
              <h3 className="modal-title">{activeVideo.title}</h3>
              <p className="modal-artist">{activeVideo.artist}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Music
