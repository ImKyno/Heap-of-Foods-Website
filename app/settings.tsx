"use client"

import { useState, useEffect } from "react"

interface SettingsProps {
  initialDarkMode?: boolean
  initialLanguage?: string
  onLanguageChange?: (lang: string) => void
}

export default function Settings({
  initialDarkMode = false,
  initialLanguage = "en",
  onLanguageChange,
}: SettingsProps) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(initialDarkMode)
  const [language, setLanguage] = useState(initialLanguage)

  // Atualiza o modo escuro no <html>
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    if (onLanguageChange) onLanguageChange(lang)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setSettingsOpen(!settingsOpen)}
        className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-semibold transition"
      >
        ⚙️
      </button>

      {settingsOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-4 flex flex-col gap-4">
          {/* Dark / Light Mode */}
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="toggle-checkbox"
            />
          </div>

          {/* Seleção de linguagem */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Language</label>
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-zinc-800 text-white p-2 rounded-lg"
            >
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}