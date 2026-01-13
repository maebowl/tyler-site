const GITHUB_REPO = 'maebowl/tyler-site'
const DATA_FILE_PATH = 'src/data/siteData.jsx'

// Helper to properly encode UTF-8 to base64
function utf8ToBase64(str) {
  const encoder = new TextEncoder()
  const bytes = encoder.encode(str)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export async function saveToGitHub(data, token) {
  if (!token) {
    throw new Error('GitHub token is required')
  }

  // Get the current file to get its SHA
  const fileResponse = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  )

  if (!fileResponse.ok) {
    const errorData = await fileResponse.json().catch(() => ({}))
    throw new Error(errorData.message || `Failed to fetch file: ${fileResponse.status}`)
  }

  const fileData = await fileResponse.json()
  const currentSha = fileData.sha

  // Generate the new file content
  const newContent = generateSiteDataFile(data)
  const encodedContent = utf8ToBase64(newContent)

  // Commit the changes
  const updateResponse = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Update site content via admin',
        content: encodedContent,
        sha: currentSha,
      }),
    }
  )

  if (!updateResponse.ok) {
    const error = await updateResponse.json()
    throw new Error(error.message || 'Failed to save to GitHub')
  }

  return await updateResponse.json()
}

function generateSiteDataFile(data) {
  const { projects, songs, posts, socials } = data

  return `import { createContext, useContext, useState } from 'react'

const defaultData = {
  projects: ${JSON.stringify(projects, null, 4).replace(/^/gm, '  ').trim()},
  songs: ${JSON.stringify(songs, null, 4).replace(/^/gm, '  ').trim()},
  posts: ${JSON.stringify(posts, null, 4).replace(/^/gm, '  ').trim()},
  socials: ${JSON.stringify(socials, null, 4).replace(/^/gm, '  ').trim()},
}

const SiteDataContext = createContext()

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(defaultData)

  const updateProjects = (projects) => setData(prev => ({ ...prev, projects }))
  const updateSongs = (songs) => setData(prev => ({ ...prev, songs }))
  const updatePosts = (posts) => setData(prev => ({ ...prev, posts }))
  const updateSocials = (socials) => setData(prev => ({ ...prev, socials }))

  const addProject = (project) => {
    const id = Math.max(0, ...data.projects.map(p => p.id)) + 1
    setData(prev => ({ ...prev, projects: [...prev.projects, { ...project, id }] }))
  }

  const updateProject = (id, updates) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates } : p)
    }))
  }

  const deleteProject = (id) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }))
  }

  const addSong = (song) => {
    const id = Math.max(0, ...data.songs.map(s => s.id)) + 1
    setData(prev => ({ ...prev, songs: [...prev.songs, { ...song, id }] }))
  }

  const updateSong = (id, updates) => {
    setData(prev => ({
      ...prev,
      songs: prev.songs.map(s => s.id === id ? { ...s, ...updates } : s)
    }))
  }

  const deleteSong = (id) => {
    setData(prev => ({ ...prev, songs: prev.songs.filter(s => s.id !== id) }))
  }

  const addPost = (post) => {
    setData(prev => ({ ...prev, posts: [...prev.posts, post] }))
  }

  const updatePost = (slug, updates) => {
    setData(prev => ({
      ...prev,
      posts: prev.posts.map(p => p.slug === slug ? { ...p, ...updates } : p)
    }))
  }

  const deletePost = (slug) => {
    setData(prev => ({ ...prev, posts: prev.posts.filter(p => p.slug !== slug) }))
  }

  const updateSocial = (id, updates) => {
    setData(prev => ({
      ...prev,
      socials: prev.socials.map(s => s.id === id ? { ...s, ...updates } : s)
    }))
  }

  const resetToDefaults = () => {
    setData(defaultData)
  }

  return (
    <SiteDataContext.Provider value={{
      ...data,
      updateProjects,
      updateSongs,
      updatePosts,
      updateSocials,
      addProject,
      updateProject,
      deleteProject,
      addSong,
      updateSong,
      deleteSong,
      addPost,
      updatePost,
      deletePost,
      updateSocial,
      resetToDefaults,
    }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const context = useContext(SiteDataContext)
  if (!context) {
    throw new Error('useSiteData must be used within SiteDataProvider')
  }
  return context
}
`
}
