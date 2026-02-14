"use client"

import { useState, useEffect } from "react"
import { PixelHeart, FloatingHearts, PixelStar } from "./pixel-art"

const CLAIMED_KEY = "valentine-tickets-claimed"

function loadClaimed(): Set<number> {
  if (typeof window === "undefined") return new Set()
  try {
    const stored = localStorage.getItem(CLAIMED_KEY)
    if (stored) return new Set(JSON.parse(stored) as number[])
  } catch {}
  return new Set()
}

function saveClaimed(claimed: Set<number>) {
  try {
    localStorage.setItem(CLAIMED_KEY, JSON.stringify([...claimed]))
  } catch {}
}

interface Ticket {
  title: string
  emoji: string
  description: string
  color: string
  borderColor: string
}

const tickets: Ticket[] = [
  {
    title: "Hug Ticket",
    emoji: "\uD83E\uDD17",
    description: "Redeemable for one warm, tight, never-letting-go hug. Valid anytime, anywhere, no expiration!",
    color: "bg-pink-100",
    borderColor: "border-pink-400",
  },
  {
    title: "Hot Night Ticket",
    emoji: "\uD83D\uDD25",
    description: "One cozy night in with blankets, hot chocolate, movies, and cuddles. Temperature: extra warm!",
    color: "bg-red-100",
    borderColor: "border-red-400",
  },
  {
    title: "Kiss Ticket",
    emoji: "\uD83D\uDC8B",
    description: "Redeemable for unlimited kisses for an entire day. Side effects may include butterflies!",
    color: "bg-rose-100",
    borderColor: "border-rose-400",
  },
  {
    title: "Forgiveness Ticket",
    emoji: "\uD83D\uDE07",
    description: "Get out of one silly argument free! No questions asked. Use wisely (or not)!",
    color: "bg-purple-100",
    borderColor: "border-purple-400",
  },
]

export function TicketsGift({ onBack }: { onBack: () => void }) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set())
  const [claimed, setClaimed] = useState<Set<number>>(() => loadClaimed())

  // Keep flipped in sync — any claimed ticket should also appear flipped
  useEffect(() => {
    if (claimed.size > 0) {
      setFlipped((prev) => {
        const next = new Set(prev)
        claimed.forEach((i) => next.add(i))
        return next
      })
    }
  }, [claimed])

  const toggleFlip = (idx: number) => {
    if (claimed.has(idx)) return
    setFlipped((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const handleClaim = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation()
    setClaimed((prev) => {
      const next = new Set(prev)
      next.add(idx)
      saveClaimed(next)
      return next
    })
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-8 overflow-hidden">
      <FloatingHearts />

      <div className="flex flex-col items-center gap-6 z-10 w-full max-w-2xl animate-pop-in">
        <div className="flex items-center gap-2">
          <PixelStar size={24} className="animate-sparkle" />
          <h2 className="font-pixel text-sm md:text-lg text-primary text-center">
            Special Tickets
          </h2>
          <PixelStar size={24} className="animate-sparkle" style={{ animationDelay: "0.5s" }} />
        </div>

        <p className="font-sans text-xs text-muted-foreground text-center">
          Tap a ticket to reveal it!
        </p>

        {/* Tickets grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {tickets.map((ticket, i) => (
            <button
              key={i}
              onClick={() => toggleFlip(i)}
              className={`relative rounded-2xl border-4 ${ticket.borderColor} ${ticket.color} p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-ring min-h-[180px] overflow-hidden`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Dashed border inner */}
              <div className="absolute inset-3 rounded-xl border-2 border-dashed border-current opacity-20" />

              {!flipped.has(i) ? (
                <div className="flex flex-col items-center justify-center gap-3 h-full animate-pop-in">
                  <div className="text-4xl">{ticket.emoji}</div>
                  <span className="font-pixel text-xs text-foreground">{ticket.title}</span>
                  <PixelHeart size={18} className="animate-pulse-heart" />
                  <span className="font-sans text-[10px] text-muted-foreground">Tap to reveal!</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 h-full animate-pop-in">
                  <div className="font-pixel text-xs text-foreground">{ticket.title}</div>
                  <div className="text-2xl">{ticket.emoji}</div>
                  <p className="font-sans text-xs text-foreground text-center leading-relaxed">
                    {ticket.description}
                  </p>
                  {claimed.has(i) ? (
                    <div className="flex items-center gap-1 mt-1 rounded-lg bg-green-200 border-2 border-green-500 px-4 py-1.5">
                      <span className="font-pixel text-[9px] text-green-800">Claimed!</span>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => handleClaim(e, i)}
                      className="mt-1 rounded-lg border-2 border-primary bg-primary px-5 py-1.5 font-pixel text-[9px] text-primary-foreground shadow transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      Claim
                    </button>
                  )}
                  <div className="flex items-center gap-1">
                    <PixelHeart size={10} />
                    <span className="font-pixel text-[8px] text-muted-foreground">Valid Forever</span>
                    <PixelHeart size={10} />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

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
