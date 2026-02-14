"use client"

import { useEffect, useState } from "react"
import { PixelHeart, PixelCharacter, FloatingHearts, PixelStar } from "./pixel-art"

function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    duration: `${3 + Math.random() * 4}s`,
    color: [
      "hsl(340, 80%, 58%)",
      "hsl(350, 85%, 65%)",
      "hsl(45, 90%, 60%)",
      "hsl(340, 60%, 75%)",
      "hsl(0, 0%, 100%)",
    ][i % 5],
    size: 5 + Math.random() * 8,
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

export function FinalPage() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-8 overflow-hidden">
      <Confetti />
      <FloatingHearts />

      {show && (
        <div className="flex flex-col items-center gap-8 z-20 animate-pop-in max-w-md text-center">
          {/* Characters */}
          <div className="flex items-end gap-4">
            <PixelCharacter type="bear" size={70} className="animate-bounce-gentle" />
            <PixelHeart size={40} className="animate-pulse-heart mb-4" />
            <PixelCharacter type="bunny" size={70} className="animate-bounce-gentle" style={{ animationDelay: "0.3s" }} />
          </div>

          {/* Stars */}
          <div className="flex items-center gap-3">
            <PixelStar size={20} className="animate-sparkle" />
            <PixelStar size={28} className="animate-sparkle" style={{ animationDelay: "0.3s" }} />
            <PixelStar size={20} className="animate-sparkle" style={{ animationDelay: "0.6s" }} />
          </div>

          {/* Main message card */}
          <div className="rounded-2xl border-4 border-primary bg-card p-8 shadow-2xl">
            <h2 className="font-pixel text-sm md:text-lg text-primary leading-loose">
              See you tomorrow at
            </h2>
            <h1 className="font-pixel text-lg md:text-xl text-accent mt-3 animate-pulse-heart">
              Edmondo, Hamburg
            </h1>
            <div className="w-16 h-1 bg-primary rounded-full mx-auto my-4" />
            <p className="font-pixel text-xs md:text-sm text-primary mt-2">
              February 15th 2026
            </p>
            <p className="font-pixel text-base md:text-xl text-accent mt-2 animate-bounce-gentle">
              at 13.00
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <PixelHeart size={16} className="animate-pulse-heart" />
              <PixelHeart size={24} className="animate-pulse-heart" style={{ animationDelay: "0.2s" }} />
              <PixelHeart size={16} className="animate-pulse-heart" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>

          {/* Dress code */}
          <div className="rounded-xl border-2 border-border bg-secondary/50 px-6 py-4">
            <p className="font-pixel text-[10px] md:text-xs text-secondary-foreground leading-relaxed">
              Wear something nice please
            </p>
            <div className="flex items-center justify-center gap-1 mt-2">
              <PixelHeart size={12} className="animate-pulse-heart" />
            </div>
          </div>

          {/* Final hearts */}
          <div className="flex items-center gap-2">
            <PixelHeart size={20} className="animate-pulse-heart" />
            <PixelHeart size={32} className="animate-pulse-heart" style={{ animationDelay: "0.2s" }} />
            <PixelHeart size={20} className="animate-pulse-heart" style={{ animationDelay: "0.4s" }} />
          </div>

          <p className="font-pixel text-xs text-muted-foreground animate-sparkle">
            {"I love you <3"}
          </p>

          {/* Cat at the bottom */}
          <PixelCharacter type="cat" size={50} className="animate-wiggle" />
        </div>
      )}
    </main>
  )
}
