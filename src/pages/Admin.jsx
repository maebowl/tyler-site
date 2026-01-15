import { useState, useEffect } from 'react'
import { useSiteData } from '../data/siteData'
import { saveToGitHub } from '../services/github'
import './Admin.css'

const ADMIN_PASSWORD = 'ilovelegobatman'
const AUTH_KEY = 'tyler-admin-auth'
const GITHUB_TOKEN_KEY = 'tyler-github-token'

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('posts')
  const [githubToken, setGithubToken] = useState('')
  const [showTokenInput, setShowTokenInput] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState('')

  const {
    videos, projects, songs, posts, socials,
    addVideo, updateVideo, deleteVideo,
    addProject, updateProject, deleteProject,
    addSong, updateSong, deleteSong,
    addPost, updatePost, deletePost,
    updateSocial, resetToDefaults
  } = useSiteData()

  useEffect(() => {
    const auth = sessionStorage.getItem(AUTH_KEY)
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    const savedToken = localStorage.getItem(GITHUB_TOKEN_KEY)
    if (savedToken) {
      setGithubToken(savedToken)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem(AUTH_KEY, 'true')
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem(AUTH_KEY)
  }

  const handleSaveToken = () => {
    localStorage.setItem(GITHUB_TOKEN_KEY, githubToken)
    setShowTokenInput(false)
    setSaveStatus('Token saved!')
    setTimeout(() => setSaveStatus(''), 3000)
  }

  const handleSaveToGitHub = async () => {
    if (!githubToken) {
      setShowTokenInput(true)
      return
    }

    setSaving(true)
    setSaveStatus('')

    try {
      await saveToGitHub({ videos, projects, songs, posts, socials }, githubToken)
      setSaveStatus('Saved to GitHub! Site will rebuild shortly.')
    } catch (err) {
      setSaveStatus(`Error: ${err.message}`)
    } finally {
      setSaving(false)
      setTimeout(() => setSaveStatus(''), 5000)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <h1>Admin</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
            />
            <button type="submit">Login</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-actions">
            <button
              onClick={handleSaveToGitHub}
              className="btn-primary"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save to GitHub'}
            </button>
            <button onClick={() => setShowTokenInput(!showTokenInput)} className="btn-secondary">
              {githubToken ? 'Change Token' : 'Set Token'}
            </button>
            <button onClick={resetToDefaults} className="btn-secondary">Reset to Defaults</button>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>

        {showTokenInput && (
          <div className="token-input-section">
            <p>Enter your GitHub Personal Access Token (needs repo scope):</p>
            <div className="token-input-row">
              <input
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxx"
              />
              <button onClick={handleSaveToken}>Save Token</button>
            </div>
          </div>
        )}

        {saveStatus && (
          <div className={`save-status ${saveStatus.includes('Error') ? 'error' : 'success'}`}>
            {saveStatus}
          </div>
        )}

        <div className="admin-tabs">
          <button
            className={`tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Blog Posts
          </button>
          <button
            className={`tab ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
          <button
            className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`tab ${activeTab === 'songs' ? 'active' : ''}`}
            onClick={() => setActiveTab('songs')}
          >
            Songs
          </button>
          <button
            className={`tab ${activeTab === 'socials' ? 'active' : ''}`}
            onClick={() => setActiveTab('socials')}
          >
            Contact
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'posts' && (
            <PostsManager posts={posts} addPost={addPost} updatePost={updatePost} deletePost={deletePost} />
          )}
          {activeTab === 'videos' && (
            <VideosManager videos={videos} addVideo={addVideo} updateVideo={updateVideo} deleteVideo={deleteVideo} />
          )}
          {activeTab === 'projects' && (
            <ProjectsManager projects={projects} addProject={addProject} updateProject={updateProject} deleteProject={deleteProject} />
          )}
          {activeTab === 'songs' && (
            <SongsManager songs={songs} addSong={addSong} updateSong={updateSong} deleteSong={deleteSong} />
          )}
          {activeTab === 'socials' && (
            <SocialsManager socials={socials} updateSocial={updateSocial} />
          )}
        </div>
      </div>
    </div>
  )
}

function PostsManager({ posts, addPost, updatePost, deletePost }) {
  const [editing, setEditing] = useState(null)
  const [newPost, setNewPost] = useState({ slug: '', title: '', date: '', excerpt: '', content: '' })

  const handleAdd = () => {
    if (!newPost.slug || !newPost.title) return
    addPost({
      ...newPost,
      date: newPost.date || new Date().toISOString().split('T')[0]
    })
    setNewPost({ slug: '', title: '', date: '', excerpt: '', content: '' })
  }

  const handleUpdate = (slug) => {
    updatePost(slug, editing)
    setEditing(null)
  }

  return (
    <div className="manager">
      <h2>Blog Posts</h2>

      <div className="add-form">
        <h3>Add New Post</h3>
        <input
          placeholder="Slug (url-friendly)"
          value={newPost.slug}
          onChange={(e) => setNewPost({ ...newPost, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
        />
        <input
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          type="date"
          value={newPost.date}
          onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
        />
        <input
          placeholder="Excerpt"
          value={newPost.excerpt}
          onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
        />
        <textarea
          placeholder="Content (HTML supported)"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          rows={5}
        />
        <button onClick={handleAdd}>Add Post</button>
      </div>

      <div className="items-list">
        {posts.map((post) => (
          <div key={post.slug} className="item">
            {editing?.slug === post.slug ? (
              <>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                />
                <input
                  type="date"
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                />
                <input
                  value={editing.excerpt}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                />
                <textarea
                  value={editing.content}
                  onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                  rows={5}
                />
                <div className="item-actions">
                  <button onClick={() => handleUpdate(post.slug)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="item-info">
                  <strong>{post.title}</strong>
                  <span className="item-meta">/{post.slug} - {post.date}</span>
                  <p>{post.excerpt}</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => setEditing({ ...post })}>Edit</button>
                  <button onClick={() => deletePost(post.slug)} className="btn-danger">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function VideosManager({ videos, addVideo, updateVideo, deleteVideo }) {
  const [editing, setEditing] = useState(null)
  const [newVideo, setNewVideo] = useState({ title: '', subtitle: '', youtubeUrl: '' })

  const handleAdd = () => {
    if (!newVideo.title || !newVideo.youtubeUrl) return
    addVideo(newVideo)
    setNewVideo({ title: '', subtitle: '', youtubeUrl: '' })
  }

  const handleUpdate = (id) => {
    updateVideo(id, editing)
    setEditing(null)
  }

  return (
    <div className="manager">
      <h2>Videos</h2>

      <div className="add-form">
        <h3>Add New Video</h3>
        <input
          placeholder="Title"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
        />
        <input
          placeholder="Subtitle"
          value={newVideo.subtitle}
          onChange={(e) => setNewVideo({ ...newVideo, subtitle: e.target.value })}
        />
        <input
          placeholder="YouTube URL (e.g. https://youtube.com/watch?v=...)"
          value={newVideo.youtubeUrl}
          onChange={(e) => setNewVideo({ ...newVideo, youtubeUrl: e.target.value })}
        />
        <button onClick={handleAdd}>Add Video</button>
      </div>

      <div className="items-list">
        {videos.map((video) => (
          <div key={video.id} className="item">
            {editing?.id === video.id ? (
              <>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="Title"
                />
                <input
                  value={editing.subtitle}
                  onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
                  placeholder="Subtitle"
                />
                <input
                  value={editing.youtubeUrl}
                  onChange={(e) => setEditing({ ...editing, youtubeUrl: e.target.value })}
                  placeholder="YouTube URL"
                />
                <div className="item-actions">
                  <button onClick={() => handleUpdate(video.id)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="item-info">
                  <strong>{video.title}</strong>
                  <span className="item-meta">{video.subtitle}</span>
                  <span className="item-meta item-url">{video.youtubeUrl}</span>
                </div>
                <div className="item-actions">
                  <button onClick={() => setEditing({ ...video })}>Edit</button>
                  <button onClick={() => deleteVideo(video.id)} className="btn-danger">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsManager({ projects, addProject, updateProject, deleteProject }) {
  const [editing, setEditing] = useState(null)
  const [newProject, setNewProject] = useState({ title: '', description: '' })

  const handleAdd = () => {
    if (!newProject.title) return
    addProject(newProject)
    setNewProject({ title: '', description: '' })
  }

  const handleUpdate = (id) => {
    updateProject(id, editing)
    setEditing(null)
  }

  return (
    <div className="manager">
      <h2>Blender Projects</h2>

      <div className="add-form">
        <h3>Add New Project</h3>
        <input
          placeholder="Title"
          value={newProject.title}
          onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
        />
        <button onClick={handleAdd}>Add Project</button>
      </div>

      <div className="items-list">
        {projects.map((project) => (
          <div key={project.id} className="item">
            {editing?.id === project.id ? (
              <>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                />
                <input
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
                <div className="item-actions">
                  <button onClick={() => handleUpdate(project.id)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="item-info">
                  <strong>{project.title}</strong>
                  <p>{project.description}</p>
                </div>
                <div className="item-actions">
                  <button onClick={() => setEditing({ ...project })}>Edit</button>
                  <button onClick={() => deleteProject(project.id)} className="btn-danger">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SongsManager({ songs, addSong, updateSong, deleteSong }) {
  const [editing, setEditing] = useState(null)
  const [newSong, setNewSong] = useState({ title: '', artist: '', youtubeUrl: '' })

  const handleAdd = () => {
    if (!newSong.title || !newSong.artist) return
    addSong(newSong)
    setNewSong({ title: '', artist: '', youtubeUrl: '' })
  }

  const handleUpdate = (id) => {
    updateSong(id, editing)
    setEditing(null)
  }

  return (
    <div className="manager">
      <h2>Favorite Songs</h2>

      <div className="add-form">
        <h3>Add New Song</h3>
        <input
          placeholder="Song Title"
          value={newSong.title}
          onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
        />
        <input
          placeholder="Artist"
          value={newSong.artist}
          onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
        />
        <input
          placeholder="YouTube Music Video URL (optional)"
          value={newSong.youtubeUrl}
          onChange={(e) => setNewSong({ ...newSong, youtubeUrl: e.target.value })}
        />
        <button onClick={handleAdd}>Add Song</button>
      </div>

      <div className="items-list">
        {songs.map((song) => (
          <div key={song.id} className="item">
            {editing?.id === song.id ? (
              <>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="Title"
                />
                <input
                  value={editing.artist}
                  onChange={(e) => setEditing({ ...editing, artist: e.target.value })}
                  placeholder="Artist"
                />
                <input
                  value={editing.youtubeUrl || ''}
                  onChange={(e) => setEditing({ ...editing, youtubeUrl: e.target.value })}
                  placeholder="YouTube URL (optional)"
                />
                <div className="item-actions">
                  <button onClick={() => handleUpdate(song.id)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="item-info">
                  <strong>{song.title}</strong>
                  <span className="item-meta">{song.artist}</span>
                  {song.youtubeUrl && <span className="item-meta item-url">{song.youtubeUrl}</span>}
                </div>
                <div className="item-actions">
                  <button onClick={() => setEditing({ ...song })}>Edit</button>
                  <button onClick={() => deleteSong(song.id)} className="btn-danger">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SocialsManager({ socials, updateSocial }) {
  const [editing, setEditing] = useState(null)

  const handleUpdate = (id) => {
    updateSocial(id, editing)
    setEditing(null)
  }

  return (
    <div className="manager">
      <h2>Contact Links</h2>
      <p className="manager-note">Edit your social media links and handles.</p>

      <div className="items-list">
        {socials.map((social) => (
          <div key={social.id} className="item">
            {editing?.id === social.id ? (
              <>
                <input
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  placeholder="Platform name"
                />
                <input
                  value={editing.handle}
                  onChange={(e) => setEditing({ ...editing, handle: e.target.value })}
                  placeholder="Handle/username"
                />
                <input
                  value={editing.url}
                  onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                  placeholder="URL"
                />
                <div className="item-actions">
                  <button onClick={() => handleUpdate(social.id)}>Save</button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <div className="item-info">
                  <strong>{social.name}</strong>
                  <span className="item-meta">{social.handle}</span>
                  <span className="item-meta">{social.url}</span>
                </div>
                <div className="item-actions">
                  <button onClick={() => setEditing({ ...social })}>Edit</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Admin
