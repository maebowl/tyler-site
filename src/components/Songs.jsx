import { useSiteData } from '../data/siteData'
import { InkSplat } from './InkSplatter'
import './Songs.css'

export default function Songs() {
  const { songs } = useSiteData()

  return (
    <section id="songs" className="section songs-section">
      <h2 className="section-title">Favorite Jams</h2>

      <div className="songs-container">
        <div className="boombox">
          <div className="boombox-speaker left"></div>
          <div className="boombox-display">
            <div className="equalizer">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="eq-bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
          <div className="boombox-speaker right"></div>
        </div>

        <div className="songs-list">
          {songs.map((song, index) => (
            <div key={song.id} className="song-item">
              <div className="song-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="song-info">
                <span className="song-title">{song.title}</span>
                <span className="song-artist">{song.artist}</span>
              </div>
              <div className="song-wave">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="wave-bar"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="songs-splatters">
        <InkSplat color="pink" size={120} variant={1} className="songs-splat" style={{ top: '15%', left: '5%' }} />
        <InkSplat color="green" size={100} variant={2} className="songs-splat" style={{ top: '60%', right: '8%' }} />
        <InkSplat color="blue" size={80} variant={3} className="songs-splat" style={{ bottom: '20%', left: '10%' }} />
        <InkSplat color="orange" size={90} variant={1} className="songs-splat" style={{ top: '40%', right: '3%' }} />
      </div>
    </section>
  )
}
