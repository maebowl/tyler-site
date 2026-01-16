import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

// Theme definitions with color overrides
const themes = {
  default: {
    name: 'Default',
    colors: {
      '--bg-primary': '#1B1B23',
      '--bg-secondary': '#2B2D42',
      '--bg-tertiary': '#363850',
      '--accent-primary': '#8287E1',
      '--accent-secondary': '#7A82AB',
      '--accent-hover': '#9da2f0',
      '--text-primary': '#F0F7EE',
      '--text-secondary': '#c4c9c2',
      '--text-dim': '#7A82AB',
    }
  },
  christmas: {
    name: 'Christmas',
    colors: {
      '--bg-primary': '#1a1f1a',
      '--bg-secondary': '#2d3830',
      '--bg-tertiary': '#3d4a40',
      '--accent-primary': '#e74c3c',
      '--accent-secondary': '#27ae60',
      '--accent-hover': '#ff6b5b',
      '--text-primary': '#f5f5f5',
      '--text-secondary': '#d4d4d4',
      '--text-dim': '#8fbc8f',
    }
  },
  halloween: {
    name: 'Halloween',
    colors: {
      '--bg-primary': '#1a1515',
      '--bg-secondary': '#2d2020',
      '--bg-tertiary': '#3d2d2d',
      '--accent-primary': '#ff6b00',
      '--accent-secondary': '#9b59b6',
      '--accent-hover': '#ff8c33',
      '--text-primary': '#f5f0e6',
      '--text-secondary': '#d4cfc5',
      '--text-dim': '#8b7355',
    }
  },
  birthday: {
    name: 'Birthday',
    colors: {
      '--bg-primary': '#1a1a2e',
      '--bg-secondary': '#2d2d4a',
      '--bg-tertiary': '#3d3d5c',
      '--accent-primary': '#ff69b4',
      '--accent-secondary': '#ffd700',
      '--accent-hover': '#ff8dc7',
      '--text-primary': '#fff5f8',
      '--text-secondary': '#e8d8dd',
      '--text-dim': '#b399a2',
    }
  },
  pride: {
    name: 'Pride',
    colors: {
      '--bg-primary': '#1B1B23',
      '--bg-secondary': '#2B2D42',
      '--bg-tertiary': '#363850',
      '--accent-primary': '#ff6b6b',
      '--accent-secondary': '#ffd93d',
      '--accent-hover': '#ff8e8e',
      '--text-primary': '#F0F7EE',
      '--text-secondary': '#c4c9c2',
      '--text-dim': '#9b8ab8',
    }
  }
}

function getActiveTheme() {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-12
  const day = now.getDate()

  // Birthday: August 12th (and a few days around)
  if (month === 8 && day >= 10 && day <= 14) {
    return 'birthday'
  }

  // Pride Month: June
  if (month === 6) {
    return 'pride'
  }

  // Halloween: October 15 - November 1
  if ((month === 10 && day >= 15) || (month === 11 && day === 1)) {
    return 'halloween'
  }

  // Christmas: December 10 - January 2
  if ((month === 12 && day >= 10) || (month === 1 && day <= 2)) {
    return 'christmas'
  }

  return 'default'
}

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => getActiveTheme())

  useEffect(() => {
    const theme = themes[currentTheme]
    if (!theme) return

    // Apply CSS variables to root
    const root = document.documentElement
    Object.entries(theme.colors).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })

    // Add theme class to body for theme-specific styles
    document.body.className = `theme-${currentTheme}`

    return () => {
      // Cleanup: remove theme class
      document.body.className = ''
    }
  }, [currentTheme])

  // Check for theme change at midnight
  useEffect(() => {
    const checkTheme = () => {
      const newTheme = getActiveTheme()
      if (newTheme !== currentTheme) {
        setCurrentTheme(newTheme)
      }
    }

    // Check every hour
    const interval = setInterval(checkTheme, 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes, getActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export default ThemeProvider
