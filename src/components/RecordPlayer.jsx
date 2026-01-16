import { useState, useRef, useEffect } from 'react'
import { useSiteData } from '../data/siteData'
import './RecordPlayer.css'

export default function RecordPlayer() {
  const { songs } = useSiteData()
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [armPosition, setArmPosition] = useState('rest') // 'rest', 'playing', 'lifting'
  const audioRef = useRef(null)

  // Only show songs that have audio files
  const playableSongs = songs.filter(s => s.audioUrl)
  const currentSong = playableSongs[currentIndex]

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (isPlaying) {
      setArmPosition('playing')
    } else {
      setArmPosition('rest')
    }
  }, [isPlaying])

  // Auto-play when track changes and isPlaying is true
  useEffect(() => {
    if (audioRef.current && currentSong && isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false))
    }
  }, [currentIndex, currentSong])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
      setDuration(audioRef.current.duration || 0)
    }
  }

  const handleEnded = () => {
    if (currentIndex < playableSongs.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    if (audioRef.current && duration) {
      audioRef.current.currentTime = percent * duration
    }
  }

  const togglePlay = () => {
    if (!currentSong) return

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().catch(() => setIsPlaying(false))
        setIsPlaying(true)
      }
    }
  }

  const prevTrack = () => {
    if (playableSongs.length === 0) return
    setArmPosition('lifting')
    setTimeout(() => {
      setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : playableSongs.length - 1)
      if (isPlaying) {
        setTimeout(() => audioRef.current?.play(), 100)
      }
    }, 300)
  }

  const nextTrack = () => {
    if (playableSongs.length === 0) return
    setArmPosition('lifting')
    setTimeout(() => {
      setCurrentIndex(currentIndex < playableSongs.length - 1 ? currentIndex + 1 : 0)
      if (isPlaying) {
        setTimeout(() => audioRef.current?.play(), 100)
      }
    }, 300)
  }

  const selectTrack = (index) => {
    setArmPosition('lifting')
    setTimeout(() => {
      setCurrentIndex(index)
      setIsPlaying(true)
      setTimeout(() => audioRef.current?.play(), 100)
    }, 300)
  }

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00'
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Don't render if no playable songs
  if (playableSongs.length === 0) return null

  return (
    <>
      {/* Floating record button */}
      <button
        className="record-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Music Player"
      >
        <div className={`record-icon ${isPlaying ? 'spinning' : ''}`}>
          <div className="record-groove"></div>
          <div className="record-label"></div>
        </div>
      </button>

      {/* Player panel */}
      <div className={`record-player ${isOpen ? 'open' : ''}`}>
        {/* Turntable base */}
        <div className="turntable">
          {/* Record platter */}
          <div className="platter">
            <div className={`vinyl ${isPlaying ? 'spinning' : ''}`}>
              <div className="vinyl-grooves"></div>
              <div className="vinyl-label">
                <span className="label-title">{currentSong?.title || 'No Track'}</span>
                <span className="label-artist">{currentSong?.artist || ''}</span>
              </div>
              <div className="vinyl-hole"></div>
            </div>
          </div>

          {/* Tone arm */}
          <div className={`tone-arm ${armPosition}`}>
            <div className="arm-base"></div>
            <div className="arm-tube">
              <div className="arm-head">
                <div className="cartridge"></div>
                <div className="stylus"></div>
              </div>
            </div>
          </div>

          {/* Speed indicator */}
          <div className="speed-indicator">
            <span className="speed-dot active"></span>
            <span className="speed-text">33⅓</span>
          </div>
        </div>

        {/* Now playing info */}
        <div className="now-playing">
          <div className="track-info-display">
            <span className="current-title">{currentSong?.title || 'Select a track'}</span>
            <span className="current-artist">{currentSong?.artist || ''}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="record-progress" onClick={handleSeek}>
          <div
            className="progress-groove"
            style={{ width: duration ? `${(progress / duration) * 100}%` : '0%' }}
          ></div>
        </div>
        <div className="record-time">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="record-controls">
          <button className="control-btn prev-btn" onClick={prevTrack} title="Previous">
            ⏮
          </button>
          <button
            className={`control-btn play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="control-btn next-btn" onClick={nextTrack} title="Next">
            ⏭
          </button>
        </div>

        {/* Volume control */}
        <div className="record-volume">
          <span className="volume-label">VOL</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-knob"
          />
        </div>

        {/* Playlist */}
        <div className="record-playlist">
          <div className="playlist-label">TRACKLIST</div>
          <div className="playlist-tracks">
            {playableSongs.map((song, index) => (
              <button
                key={song.id}
                className={`playlist-track ${index === currentIndex ? 'active' : ''}`}
                onClick={() => selectTrack(index)}
              >
                <span className="track-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="track-details">
                  <span className="track-name">{song.title}</span>
                  <span className="track-by">{song.artist}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Close button */}
        <button className="player-close" onClick={() => setIsOpen(false)}>×</button>

        {/* Audio element */}
        {currentSong && (
          <audio
            ref={audioRef}
            src={currentSong.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onLoadedMetadata={handleTimeUpdate}
          />
        )}
      </div>
    </>
  )
}
