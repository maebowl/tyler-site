import { createContext, useContext, useState } from 'react'

const defaultData = {
  siteSettings: {
      "hero": {
          "greeting": "Hi, I'm",
          "name": "Tyler Richardson",
          "subtitle": "Creative developer & 3D artist"
      },
      "projects": {
          "title": "3D Modeling",
          "intro": "Yes, I've made the donut. No, I won't stop there."
      },
      "music": {
          "title": "Favorite Songs",
          "intro": "What's on rotation while I'm drumming, gaming, or pretending to practice bass."
      },
      "videos": {
          "title": "Videos",
          "intro": "Check out some of my favorite videos and content."
      },
      "contact": {
          "title": "Contact",
          "intro": "Come hang out, talk retro games, or watch me fail at whatever I'm doing."
      }
  },
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
          "title": "The Donut",
          "description": "you know the one.",
          "imageUrl": "/uploads/1768541664379-image.png",
          "videoUrl": "/uploads/1768541637397-ezgif-6c2ae73cef5eec86.mp4",
          "id": 1
      },
      {
          "title": "Fluid Simulation Test",
          "description": "this took so goddamn long to render",
          "imageUrl": "",
          "videoUrl": "/uploads/1768542204017-8mb.video-PUP-8GLXv6yL.mp4",
          "id": 2
      }
  ],
  songs: [
      {
          "title": "Blackened Banners",
          "artist": "Alestorm",
          "youtubeUrl": "https://www.youtube.com/watch?v=nEQ_kV428AU",
          "id": 1
      },
      {
          "title": "seishun complex",
          "artist": "kessoku band",
          "youtubeUrl": "https://www.youtube.com/watch?v=7FDRQifEMUQ",
          "id": 2
      },
      {
          "title": "Mantis Lords",
          "artist": "Christopher Larkin",
          "youtubeUrl": "https://www.youtube.com/watch?v=Lp5M2BAXwSo",
          "id": 3
      },
      {
          "title": "Death By Glamour",
          "artist": "Toby Fox",
          "youtubeUrl": "https://www.youtube.com/watch?v=Q9kDr4na0ls",
          "id": 4
      },
      {
          "title": "'Til Depth Do Us Part",
          "artist": "Deep Cut",
          "youtubeUrl": "https://www.youtube.com/watch?v=lw1XwyW39uk",
          "id": 5
      },
      {
          "title": "In Memory",
          "artist": "Nightmargin",
          "youtubeUrl": "https://www.youtube.com/watch?v=z9-6ZAVOwHo",
          "id": 6
      }
  ],
  posts: [],
  socials: [
      {
          "id": "discord",
          "name": "Discord",
          "handle": "rAAAAAvioli",
          "url": "@raaaaavioli"
      },
      {
          "id": "youtube",
          "name": "YouTube",
          "handle": "Nozoa",
          "url": "https://www.youtube.com/@NozoaST"
      },
      {
          "id": "twitch",
          "name": "Twitch",
          "handle": "NozoaST",
          "url": "https://www.twitch.tv/nozoast"
      },
      {
          "id": "letterboxd",
          "name": "Letterboxd",
          "handle": "LoreTie",
          "url": "https://letterboxd.com/loretie/"
      },
      {
          "id": "pinterest",
          "name": "Pinterest",
          "handle": "Nozoa",
          "url": "https://ca.pinterest.com/NozoaSLT/"
      },
      {
          "id": "characterhub",
          "name": "CharacterHub",
          "handle": "Nozoa",
          "url": "https://characterhub.com/profile/Nozoa"
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

  const updateSiteSettings = (section, updates) => {
    setData(prev => ({
      ...prev,
      siteSettings: {
        ...prev.siteSettings,
        [section]: { ...prev.siteSettings[section], ...updates }
      }
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
      updateSiteSettings,
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
