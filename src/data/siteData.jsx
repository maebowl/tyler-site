import { createContext, useContext, useState } from 'react'

const defaultData = {
  projects: [
      {
          "id": 1,
          "title": "Project One",
          "description": "A mysterious scene rendered in cycles"
      },
      {
          "id": 2,
          "title": "Project Two",
          "description": "Low-poly environment design"
      },
      {
          "id": 3,
          "title": "Project Three",
          "description": "Character modeling experiment"
      }
  ],
  songs: [
      {
          "id": 1,
          "title": "Song Title One",
          "artist": "Artist Name",
          "youtubeUrl": ""
      },
      {
          "id": 2,
          "title": "Song Title Two",
          "artist": "Artist Name",
          "youtubeUrl": ""
      },
      {
          "id": 3,
          "title": "Song Title Three",
          "artist": "Artist Name",
          "youtubeUrl": ""
      },
      {
          "id": 4,
          "title": "Song Title Four",
          "artist": "Artist Name",
          "youtubeUrl": ""
      },
      {
          "id": 5,
          "title": "Song Title Five",
          "artist": "Artist Name",
          "youtubeUrl": ""
      }
  ],
  posts: [],
  socials: [
      {
          "id": "discord",
          "name": "Discord",
          "handle": "@tyler",
          "url": "#"
      },
      {
          "id": "youtube",
          "name": "YouTube",
          "handle": "Tyler Richardson",
          "url": "#"
      },
      {
          "id": "twitch",
          "name": "Twitch",
          "handle": "tyler_streams",
          "url": "#"
      },
      {
          "id": "letterboxd",
          "name": "Letterboxd",
          "handle": "tyler",
          "url": "#"
      }
  ],
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
