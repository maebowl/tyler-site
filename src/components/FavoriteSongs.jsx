import './FavoriteSongs.css'

const songs = [
  {
    id: 1,
    title: "Song Title One",
    artist: "Artist Name",
    note: "Placeholder track"
  },
  {
    id: 2,
    title: "Song Title Two",
    artist: "Artist Name",
    note: "Placeholder track"
  },
  {
    id: 3,
    title: "Song Title Three",
    artist: "Artist Name",
    note: "Placeholder track"
  },
  {
    id: 4,
    title: "Song Title Four",
    artist: "Artist Name",
    note: "Placeholder track"
  },
  {
    id: 5,
    title: "Song Title Five",
    artist: "Artist Name",
    note: "Placeholder track"
  }
]

function FavoriteSongs() {
  return (
    <section id="music" className="music">
      <h2 className="section-title">Favorite Songs</h2>
      <p className="music-intro">
        What's on rotation while I'm drumming, gaming, or pretending to practice bass.
      </p>
      <div className="song-list">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="song-item"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="song-number">
              <span className="number-text">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="song-visualizer">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <div className="song-info">
              <h3 className="song-title">{song.title}</h3>
              <p className="song-artist">{song.artist}</p>
            </div>
            <div className="song-note">{song.note}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FavoriteSongs
