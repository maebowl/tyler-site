import { useEffect } from 'react'
import { useSiteData } from '../data/siteData'
import './Music.css'

function Music() {
  const { songs } = useSiteData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="song-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="song-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="song-info">
                <span className="song-title">{song.title}</span>
                <span className="song-artist">{song.artist}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Music
