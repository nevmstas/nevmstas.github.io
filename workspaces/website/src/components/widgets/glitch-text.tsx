"use client"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  titles: string[]
  interval?: number 
  typingSpeed?: number
}

export function GlitchText({
  titles,
  interval = 3000,
  typingSpeed = 100,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [count, setCount] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentTitle = titles[count]
    let timeoutId: NodeJS.Timeout

    if (isDeleting) {
      timeoutId = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
        if (displayText.length === 0) {
          setIsDeleting(false)
          setCount((prev) => (prev + 1) % titles.length)
        }
      }, typingSpeed)
    } else {
      timeoutId = setTimeout(() => {
        setDisplayText((prev) => currentTitle.slice(0, prev.length + 1))
        if (displayText === currentTitle) {
          setTimeout(() => {
            setIsDeleting(true)
          }, interval)
        }
      }, typingSpeed)
    }

    return () => clearTimeout(timeoutId)
  }, [displayText, isDeleting, count, titles, interval, typingSpeed])

  return (
    <p
      className={cn(
        "text-2xl md:text-4xl font-mono relative inline-block",
        "before:content-[''] before:absolute before:top-0 before:right-0 before:w-full before:h-full before:bg-black before:border-r-2 before:border-cyan-400 before:animate-typewriter"
      )}
    >
      <span className="text-cyan-400 mr-2">&lt;</span>
      <span
        className={cn(
          "glitch-text relative",
          "before:content-[attr(data-text)] before:absolute before:left-0 before:text-cyan-400 before:animate-glitch-1",
          "after:content-[attr(data-text)] after:absolute after:left-0 after:text-purple-500 after:animate-glitch-2"
        )}
        data-text={displayText}
      >
        {displayText}
      </span>
    </p>
  )
}