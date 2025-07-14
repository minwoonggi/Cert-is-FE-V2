"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, ArrowUp } from "lucide-react"

// Floating Buttons Component
function FloatingButtons({
  isDark,
  setIsDark,
}: {
  isDark: boolean
  setIsDark: (value: boolean) => void
}) {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
      {/* Theme Toggle Button */}
      <Button
        size="icon"
        onClick={() => setIsDark(!isDark)}
        className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-black dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-red-300 dark:hover:border-red-500 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </Button>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          size="icon"
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full text-white transition-all duration-300 shadow-lg hover:shadow-xl animate-in slide-in-from-bottom-2"
          style={{ backgroundColor: "#9E0101" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(158, 1, 1, 0.9)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#9E0101"
          }}
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  )
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDark(saved === "dark" || (!saved && systemPrefersDark))
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", isDark)
      localStorage.setItem("theme", isDark ? "dark" : "light")
    }
  }, [isDark, mounted])

  if (!mounted) {
    return <div>{children}</div>
  }

  return (
    <div className={isDark ? "dark" : ""}>
      {children}
      <FloatingButtons isDark={isDark} setIsDark={setIsDark} />
    </div>
  )
}
