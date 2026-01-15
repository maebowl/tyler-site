import { createContext, useContext, useState } from 'react'

const defaultData = {
  videos: [
      {
          "id": 1,
          "title": "Sample Video",
          "subtitle": "A cool video description",
          "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      }
  ],
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
          "artist": "Artist Name"
      },
      {
          "id": 2,
          "title": "Song Title Two",
          "artist": "Artist Name"
      },
      {
          "id": 3,
          "title": "Song Title Three",
          "artist": "Artist Name"
      },
      {
          "id": 4,
          "title": "Song Title Four",
          "artist": "Artist Name"
      },
      {
          "id": 5,
          "title": "Song Title Five",
          "artist": "Artist Name"
      }
  ],
  posts: [
      {
          "slug": "hello-world",
          "title": "Hello World",
          "date": "2026-01-12",
          "excerpt": "Welcome to my blog! This is my first post where I talk about what I plan to write about.",
          "content": "<p>Welcome to my blog! I'm excited to finally have a space to share my thoughts and projects.</p>\n<p>Here's what you can expect to find here:</p>\n<ul>\n  <li>Updates on my Blender projects and 3D art</li>\n  <li>Music recommendations and playlists</li>\n  <li>Random thoughts and musings</li>\n  <li>Maybe some tutorials if I figure out something cool</li>\n</ul>\n<p>Stay tuned for more posts coming soon!</p>"
      },
      {
          "slug": "this-is-a-test",
          "title": "wowza",
          "date": "2026-01-13",
          "excerpt": "jeepers",
          "content": "mugmug"
      }
  ],
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

  const updateVideos = (videos) => setData(prev => ({ ...prev, videos }))
  const updateProjects = (projects) => setData(prev => ({ ...prev, projects }))
  const updateSongs = (songs) => setData(prev => ({ ...prev, songs }))
  const updatePosts = (posts) => setData(prev => ({ ...prev, posts }))
  const updateSocials = (socials) => setData(prev => ({ ...prev, socials }))

  const addVideo = (video) => {
    const id = Math.max(0, ...data.videos.map(v => v.id)) + 1
    setData(prev => ({ ...prev, videos: [...prev.videos, { ...video, id }] }))
  }

  const updateVideo = (id, updates) => {
    setData(prev => ({
      ...prev,
      videos: prev.videos.map(v => v.id === id ? { ...v, ...updates } : v)
    }))
  }

  const deleteVideo = (id) => {
    setData(prev => ({ ...prev, videos: prev.videos.filter(v => v.id !== id) }))
  }

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
      updateVideos,
      updateProjects,
      updateSongs,
      updatePosts,
      updateSocials,
      addVideo,
      updateVideo,
      deleteVideo,
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
