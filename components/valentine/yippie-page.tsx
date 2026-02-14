"use client"

import { useEffect, useState } from "react"
import { PixelHeart, FloatingHearts } from "./pixel-art"

function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 3}s`,
    color: [
      "hsl(340, 80%, 58%)",
      "hsl(350, 85%, 65%)",
      "hsl(45, 90%, 60%)",
      "hsl(340, 60%, 75%)",
      "hsl(0, 0%, 100%)",
    ][i % 5],
    size: 6 + Math.random() * 8,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0"
          style={{
            left: p.left,
            animation: `confetti-fall ${p.duration} ${p.delay} linear infinite`,
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.id % 3 === 0 ? "50%" : "2px",
            }}
          />
        </div>
      ))}
    </div>
  )
}

export function YippiePage({ onContinue }: { onContinue: () => void }) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 overflow-hidden">
      <Confetti />
      <FloatingHearts />

      {showContent && (
        <div className="flex flex-col items-center gap-6 animate-pop-in z-20">
          {/* Hearts explosion */}
          <div className="flex items-center gap-2">
            <PixelHeart size={30} className="animate-pulse-heart" />
            <PixelHeart size={50} className="animate-pulse-heart" style={{ animationDelay: "0.2s" }} />
            <PixelHeart size={30} className="animate-pulse-heart" style={{ animationDelay: "0.4s" }} />
          </div>

          {/* Main text */}
          <div className="text-center">
            <h2 className="font-pixel text-lg md:text-2xl text-primary leading-relaxed">
              I KNEW IT!
            </h2>
            <p className="font-pixel text-xs md:text-sm text-accent mt-3 leading-relaxed">
              You made the right decision
            </p>
          </div>

          {/* Yippie GIF */}
          <div className="relative rounded-2xl border-4 border-primary bg-card p-2 shadow-xl overflow-hidden">
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnRzN2c1MXVvZ3g5eTFheTR5eGdvNXk5NTZ5cTM5aGxpNDN0dzZ1MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UO5elnTqo4vSg/giphy.gif"
              alt="Yippie celebration"
              className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-xl"
            />
            <div className="absolute top-2 right-2">
              <PixelHeart size={20} className="animate-pulse-heart" />
            </div>
          </div>

          {/* Celebration text */}
          <p className="font-pixel text-xs text-primary animate-bounce-gentle">
            YIPPIEEE!!!
          </p>

          {/* Continue button */}
          <button
            onClick={onContinue}
            className="mt-2 rounded-xl border-4 border-primary bg-primary px-8 py-4 font-pixel text-sm text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
          >
            Continue
          </button>
        </div>
      )}
    </main>
  )
}
