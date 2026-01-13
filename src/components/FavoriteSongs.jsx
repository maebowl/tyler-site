import './FavoriteSongs.css'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const songs = [
  {
    id: 1,
    title: "Song Title One",
    artist: "Artist Name",
  },
  {
    id: 2,
    title: "Song Title Two",
    artist: "Artist Name",
  },
  {
    id: 3,
    title: "Song Title Three",
    artist: "Artist Name",
  },
  {
    id: 4,
    title: "Song Title Four",
    artist: "Artist Name",
  },
  {
    id: 5,
    title: "Song Title Five",
    artist: "Artist Name",
  }
]

function FavoriteSongs() {
  const [ref, isVisible] = useScrollAnimation(0.2)

  return (
    <section id="music" className="music">
      <div ref={ref} className={`section-container ${isVisible ? 'animate-in' : ''}`}>
        <h2 className="section-title">Favorite Songs</h2>
        <p className="section-intro">
          What's on rotation while I'm drumming, gaming, or pretending to practice bass.
        </p>
        <div className="song-list">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="song-item"
              style={{ transitionDelay: `${index * 0.05}s` }}
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
    </section>
  )
}

export default FavoriteSongs
