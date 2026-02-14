"use client"

import { useState } from "react"
import { PixelCharacter, PixelHeart, FloatingHearts, PixelStar } from "./pixel-art"
import { QuizGift } from "./quiz-gift"
import { TicketsGift } from "./tickets-gift"
import { CollageGift } from "./collage-gift"

export function GiftsPage({ onFinish }: { onFinish: () => void }) {
  const [openGift, setOpenGift] = useState<number | null>(null)
  const [opened, setOpened] = useState<Set<number>>(new Set())

  const handleOpen = (gift: number) => {
    setOpened((prev) => new Set(prev).add(gift))
    setOpenGift(gift)
  }

  const handleClose = () => {
    setOpenGift(null)
  }

  if (openGift === 1) return <QuizGift onBack={handleClose} />
  if (openGift === 2) return <TicketsGift onBack={handleClose} />
  if (openGift === 3) return <CollageGift onBack={handleClose} />

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-8 px-4 py-8 overflow-hidden">
      <FloatingHearts />

      <div className="flex flex-col items-center gap-4 z-10 animate-pop-in">
        {/* Title */}
        <div className="flex items-center gap-2">
          <PixelStar size={28} className="animate-sparkle" />
          <h2 className="font-pixel text-base md:text-xl text-primary text-center">
            I have a gift for you!
          </h2>
          <PixelStar size={28} className="animate-sparkle" style={{ animationDelay: "0.5s" }} />
        </div>

        <p className="font-sans text-sm text-muted-foreground text-center">
          Pick a gift to open it
        </p>

        {/* Gift buttons */}
        <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
          {/* Gift 1 */}
          <button
            onClick={() => handleOpen(1)}
            className="group flex flex-col items-center gap-3 rounded-2xl border-4 border-primary bg-card p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring w-44"
          >
            <PixelCharacter type="bear" size={70} className="group-hover:animate-wiggle" />
            <span className="font-pixel text-xs text-primary">Gift 1</span>
            {/* <span className="font-sans text-xs text-muted-foreground">Quiz Time!</span> */}
            {opened.has(1) && (
              <span className="font-pixel text-[10px] text-accent">Opened!</span>
            )}
          </button>

          {/* Gift 2 */}
          <button
            onClick={() => handleOpen(2)}
            className="group flex flex-col items-center gap-3 rounded-2xl border-4 border-accent bg-card p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring w-44"
          >
            <PixelCharacter type="bunny" size={70} className="group-hover:animate-wiggle" />
            <span className="font-pixel text-xs text-accent">Gift 2</span>
            {/* <span className="font-sans text-xs text-muted-foreground">Special Tickets</span> */}
            {opened.has(2) && (
              <span className="font-pixel text-[10px] text-accent">Opened!</span>
            )}
          </button>

          {/* Gift 3 */}
          <button
            onClick={() => handleOpen(3)}
            className="group flex flex-col items-center gap-3 rounded-2xl border-4 border-primary bg-card p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring w-44"
          >
            <PixelCharacter type="cat" size={70} className="group-hover:animate-wiggle" />
            <span className="font-pixel text-xs text-primary">Gift 3</span>
            {/* <span className="font-sans text-xs text-muted-foreground">Photo Collage</span> */}
            {opened.has(3) && (
              <span className="font-pixel text-[10px] text-accent">Opened!</span>
            )}
          </button>
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-2 mt-2">
          <PixelHeart size={16} className="animate-pulse-heart" />
          <PixelHeart size={24} className="animate-pulse-heart" style={{ animationDelay: "0.3s" }} />
          <PixelHeart size={16} className="animate-pulse-heart" style={{ animationDelay: "0.6s" }} />
        </div>

        {/* Finish button */}
        <button
          onClick={onFinish}
          className="mt-6 rounded-xl border-4 border-primary bg-primary px-8 py-4 font-pixel text-xs md:text-sm text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
        >
          Finish
        </button>
      </div>
    </main>
  )
}
