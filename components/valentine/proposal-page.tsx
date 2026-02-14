"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { PixelCharacter, PixelHeart, FloatingHearts } from "./pixel-art"

function getRandomPosition(buttonWidth: number, buttonHeight: number) {
  const padding = 16
  const vw = typeof window !== "undefined" ? window.innerWidth : 400
  const vh = typeof window !== "undefined" ? window.innerHeight : 700
  const maxX = vw - buttonWidth - padding
  const maxY = vh - buttonHeight - padding
  return {
    x: Math.max(padding, Math.random() * maxX),
    y: Math.max(padding, Math.random() * maxY),
  }
}

export function ProposalPage({ onYes }: { onYes: () => void }) {
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null)
  const [noCount, setNoCount] = useState(0)
  const [shaking, setShaking] = useState(false)
  const noRef = useRef<HTMLButtonElement>(null)

  const noTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Don't do this!",
    "Last chance!",
    "You're breaking my heart!",
    "Pls?",
    "I'll cry!",
    "Pretty please?",
  ]

  const moveNoButton = useCallback(() => {
    if (!noRef.current) return
    const buttonRect = noRef.current.getBoundingClientRect()
    const newPos = getRandomPosition(buttonRect.width, buttonRect.height)
    setNoPos(newPos)
    setNoCount((c) => Math.min(c + 1, noTexts.length - 1))
    setShaking(true)
    setTimeout(() => setShaking(false), 500)
  }, [noTexts.length])

  // For mobile: when No button is tapped, move it
  const handleNoClick = useCallback(() => {
    moveNoButton()
  }, [moveNoButton])

  // For desktop: when hovered, move it  
  const handleNoHover = useCallback(() => {
    moveNoButton()
  }, [moveNoButton])

  // Touch move handler for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    moveNoButton()
  }, [moveNoButton])

  // Growing yes button based on no count
  const yesScale = 1 + noCount * 0.12

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 overflow-hidden">
      <FloatingHearts />

      {/* Pixel character */}
      <div className={`animate-pop-in ${shaking ? "animate-shake" : ""}`}>
        <PixelCharacter type="bunny" size={100} />
      </div>

      {/* Question */}
      <div className="text-center animate-pop-in">
        <h2 className="font-pixel text-base md:text-xl text-primary leading-relaxed">
          Will you be my
        </h2>
        <h2 className="font-pixel text-lg md:text-2xl text-accent mt-2 animate-pulse-heart">
          Valentine?
        </h2>
      </div>

      {/* Hearts decoration */}
      <div className="flex items-center gap-3">
        <PixelHeart size={24} className="animate-pulse-heart" />
        <PixelHeart size={32} className="animate-pulse-heart" style={{ animationDelay: "0.3s" }} />
        <PixelHeart size={24} className="animate-pulse-heart" style={{ animationDelay: "0.6s" }} />
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-6 mt-4">
        <button
          onClick={onYes}
          className="z-10 rounded-xl border-4 border-primary bg-primary px-8 py-4 font-pixel text-sm md:text-base text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
          style={{ transform: `scale(${yesScale})` }}
        >
          Yes!
        </button>

        {!noPos && (
          <button
            ref={noRef}
            onClick={handleNoClick}
            onMouseEnter={handleNoHover}
            onTouchStart={handleTouchStart}
            className="rounded-xl border-2 border-border bg-secondary px-6 py-3 font-pixel text-xs text-secondary-foreground shadow transition-all duration-100 hover:cursor-not-allowed focus:outline-none"
          >
            {noTexts[noCount]}
          </button>
        )}
      </div>

      {/* Fleeing No button - fixed to viewport so it stays in frame */}
      {noPos && (
        <button
          ref={noRef}
          onClick={handleNoClick}
          onMouseEnter={handleNoHover}
          onTouchStart={handleTouchStart}
          className="fixed z-50 rounded-xl border-2 border-border bg-secondary px-6 py-3 font-pixel text-xs text-secondary-foreground shadow transition-all duration-150 hover:cursor-not-allowed focus:outline-none"
          style={{
            left: `${noPos.x}px`,
            top: `${noPos.y}px`,
          }}
        >
          {noTexts[noCount]}
        </button>
      )}

      {noCount >= 3 && (
        <p className="font-sans text-xs text-muted-foreground animate-sparkle text-center mt-4">
          {"You literally have no other choice..."}
        </p>
      )}
    </main>
  )
}
