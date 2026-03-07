"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { t, useTranslation, type Locale } from "@/lib/i18n"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faSun,
  faMoon,
  faLanguage,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

interface SettingsProps {
  initialLanguage?: string;
  onLanguageChange?: (lang: Locale) => void;
}

type Lang = "en" | "pt";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
];

export default function Settings({
  initialLanguage = "en",
  onLanguageChange,
}: SettingsProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [language, setLanguage] = useState<Lang>(initialLanguage as Lang);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // THEME HOOK
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  // I18N HOOK
  const { locale, setLocale: setGlobalLocale } = useTranslation();

  // LOAD SAVED LANGUAGE PREFERENCE  
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      setLanguage(savedLang as Lang);
      setGlobalLocale(savedLang as Lang);
    }
  }, [setGlobalLocale]);

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleDarkMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const handleLanguageChange = (lang: Lang) => {
    setLanguage(lang);
    setGlobalLocale(lang);
    localStorage.setItem("lang", lang);
    onLanguageChange?.(lang);
    setLangOpen(false);
  };

  const currentLang = LANGUAGES.find((l) => l.code === language);

  return (
    <div className="fixed top-4 right-4 z-50 select-none text-zinc-900 dark:text-white">
      {/* SETTINGS BUTTON */}
      <button
        onClick={() => setSettingsOpen(!settingsOpen)}
        className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-4 py-2 rounded-xl flex items-center gap-2 cursor-pointer"
      >
        <FontAwesomeIcon icon={faGear} />
      </button>

      {settingsOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-xl shadow-lg px-5 py-4 flex flex-col gap-3">
          {/* THEMES */}
          
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-bold">
              <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
              {t("settings.theme")}
            </span>

            <button
              onClick={toggleDarkMode}
              className={`
                relative w-14 h-7 rounded-full
                transition-colors
                cursor-pointer
                ${isDarkMode ? "bg-zinc-100 dark:bg-zinc-800" : "bg-zinc-100 dark:bg-zinc-800"}
              `}
            >
              <span
                className={`
                  absolute top-0.5
                  flex items-center justify-center
                  w-6 h-6 bg-zinc-100 dark:bg-white rounded-full shadow
                  transition-transform
                  ${isDarkMode ? "translate-x-7" : "translate-x-1"}
                `}
              >
                <FontAwesomeIcon
                  icon={isDarkMode ? faMoon : faSun}
                  className="text-zinc-200 dark:text-zinc-800 text-xs"
                />
              </span>
            </button>
          </div>

          <div className="w-full h-1 bg-zinc-300/20 dark:bg-white/20" />
          
          {/* LANGUAGE */}
          <div className="flex flex-col gap-2" ref={langRef}>
            <label className="flex items-center gap-2 font-bold">
              <FontAwesomeIcon icon={faLanguage} />
              {t("settings.lang")}
            </label>

            <button
              onClick={() => setLangOpen(!langOpen)}
              className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg px-3 py-2 flex items-center justify-between transition cursor-pointer"
            >
              <span>{currentLang?.label}</span>

              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* LANGUAGE LIST */}
            {langOpen && (
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as Lang)}
                    className="w-full text-left px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
