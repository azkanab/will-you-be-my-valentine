"use client"

import { PixelEnvelope, PixelHeart, FloatingHearts } from "./pixel-art"

export function EnvelopePage({ onOpen }: { onOpen: () => void }) {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 overflow-hidden">
      <FloatingHearts />

      {/* Title */}
      <div className="relative">
        <h1 className="mb-16 font-pixel text-sm md:text-lg text-primary text-center animate-bounce-gentle">
          {"Hey, Adylan. You've got mail!"}
        </h1>
      </div>

      {/* Envelope with speech bubble */}
      <div className="relative">
        {/* Speech bubble */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-10 animate-float">
          <div className="relative rounded-xl border-2 border-primary bg-card px-4 py-2 shadow-lg">
            <span className="font-pixel text-xs text-primary whitespace-nowrap">
              {"Open me <3"}
            </span>
            {/* Bubble tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary" />
          </div>
        </div>

        {/* Envelope button */}
        <button
          onClick={onOpen}
          className="group relative cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring rounded-xl"
          aria-label="Open the valentine letter"
        >
          <PixelEnvelope size={220} className="drop-shadow-lg" />
          
          {/* Small floating hearts around envelope */}
          <PixelHeart
            size={20}
            className="absolute -top-4 -right-4 animate-pulse-heart"
          />
          <PixelHeart
            size={14}
            className="absolute -bottom-2 -left-3 animate-pulse-heart"
            
          />
          <PixelHeart
            size={16}
            className="absolute top-2 -left-6 animate-float"
          />
        </button>
      </div>

      <p className="font-sans text-sm text-muted-foreground animate-sparkle mt-2">
        Tap the envelope!
      </p>
    </main>
  )
}
