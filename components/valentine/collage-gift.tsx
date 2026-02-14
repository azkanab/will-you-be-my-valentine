"use client"

import { useState } from "react"
import { PixelHeart, FloatingHearts, PixelStar } from "./pixel-art"

const photos = [
  { src: "/images/collage-1.jpg", caption: "Our first trip in Germany" },
  { src: "/images/collage-2.jpg", caption: "Selfie with you" },
  { src: "/images/collage-3.jpg", caption: "Watching Dota with you" },
  { src: "/images/collage-4.jpg", caption: "First hackathon together" },
  { src: "/images/collage-5.jpg", caption: "Cooking chaos but we made it" },
  { src: "/images/collage-6.jpg", caption: "Our first christmas market" },
]

export function CollageGift({ onBack }: { onBack: () => void }) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-8 overflow-hidden">
      <FloatingHearts />

      <div className="flex flex-col items-center gap-6 z-10 w-full max-w-2xl animate-pop-in">
        <div className="flex items-center gap-2">
          <PixelStar size={24} className="animate-sparkle" />
          <h2 className="font-pixel text-sm md:text-lg text-primary text-center">
            Our Memories
          </h2>
          <PixelStar size={24} className="animate-sparkle" style={{ animationDelay: "0.5s" }} />
        </div>

        <p className="font-sans text-xs text-muted-foreground text-center">
          A collection of our sweetest moments
        </p>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setSelectedPhoto(i)}
              className="group relative rounded-xl border-4 border-primary/30 bg-card overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.03] hover:border-primary hover:shadow-xl active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring aspect-square"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 bg-primary/80 px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-pixel text-[8px] md:text-[10px] text-primary-foreground text-center">
                  {photo.caption}
                </p>
              </div>
              {/* Corner heart */}
              <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <PixelHeart size={14} />
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4"
            onClick={() => setSelectedPhoto(null)}
            role="dialog"
            aria-label={`Photo: ${photos[selectedPhoto].caption}`}
          >
            <div
              className="relative max-w-lg w-full rounded-2xl border-4 border-primary bg-card p-3 shadow-2xl animate-pop-in"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[selectedPhoto].src}
                alt={photos[selectedPhoto].caption}
                className="w-full rounded-xl object-cover"
                crossOrigin="anonymous"
              />
              <div className="flex items-center justify-center gap-2 mt-3 pb-1">
                <PixelHeart size={14} className="animate-pulse-heart" />
                <p className="font-pixel text-[10px] text-primary text-center">
                  {photos[selectedPhoto].caption}
                </p>
                <PixelHeart size={14} className="animate-pulse-heart" />
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-3 -right-3 rounded-full border-2 border-primary bg-primary w-8 h-8 flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
                aria-label="Close photo"
              >
                x
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mt-2">
          <PixelHeart size={16} className="animate-pulse-heart" />
          <PixelHeart size={24} className="animate-pulse-heart" style={{ animationDelay: "0.3s" }} />
          <PixelHeart size={16} className="animate-pulse-heart" style={{ animationDelay: "0.6s" }} />
        </div>

        <button
          onClick={onBack}
          className="mt-2 rounded-xl border-4 border-primary bg-primary px-8 py-4 font-pixel text-xs text-primary-foreground shadow-lg transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring"
        >
          Back to Gifts
        </button>
      </div>
    </main>
  )
}
