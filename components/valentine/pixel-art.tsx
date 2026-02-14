"use client"

export function PixelHeart({ size = 120, className = "" }: { size?: number; className?: string }) {
  const pixelSize = size / 13
  const heartPattern = [
    [0,0,1,1,0,0,0,1,1,0,0,0,0],
    [0,1,1,1,1,0,1,1,1,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,1,1,1,1,1,0,0,0,0],
    [0,0,0,1,1,1,1,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0,0,0],
  ]

  return (
    <svg
      width={size}
      height={(heartPattern.length * pixelSize)}
      className={className}
      viewBox={`0 0 ${13 * pixelSize} ${heartPattern.length * pixelSize}`}
      aria-hidden="true"
      style={{ imageRendering: "pixelated" }}
    >
      {heartPattern.map((row, y) =>
        row.map((cell, x) =>
          cell === 1 ? (
            <rect
              key={`${x}-${y}`}
              x={x * pixelSize}
              y={y * pixelSize}
              width={pixelSize}
              height={pixelSize}
              fill="hsl(340, 80%, 58%)"
            />
          ) : null
        )
      )}
    </svg>
  )
}

export function PixelEnvelope({ size = 200, className = "" }: { size?: number; className?: string }) {
  // 0=empty 1=envelope body 2=flap 3=border 4=heart 5=flap line / V detail 6=lighter body
  const palette: Record<number, string> = {
    1: "hsl(340, 50%, 92%)",
    2: "hsl(340, 60%, 86%)",
    3: "hsl(340, 80%, 58%)",
    4: "hsl(350, 85%, 65%)",
    5: "hsl(340, 70%, 72%)",
    6: "hsl(340, 45%, 95%)",
  }
  const grid = [
    [0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,3,2,3,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,3,2,2,2,3,0,0,0,0,0,0],
    [0,0,0,0,0,3,2,2,2,2,2,3,0,0,0,0,0],
    [0,0,0,0,3,2,2,2,2,2,2,2,3,0,0,0,0],
    [0,0,0,3,2,2,2,2,2,2,2,2,2,3,0,0,0],
    [0,0,3,5,5,2,2,2,2,2,2,2,5,5,3,0,0],
    [0,3,1,1,5,5,2,2,2,2,2,5,5,1,1,3,0],
    [3,1,1,1,1,5,5,2,2,2,5,5,1,1,1,1,3],
    [3,1,1,1,1,1,5,5,5,5,5,1,1,1,1,1,3],
    [3,1,1,1,1,4,4,1,1,4,4,1,1,1,1,1,3],
    [3,1,1,1,4,4,4,4,4,4,4,4,1,1,1,1,3],
    [3,1,1,1,4,4,4,4,4,4,4,4,1,1,1,1,3],
    [3,1,1,1,1,4,4,4,4,4,4,1,1,1,1,1,3],
    [3,1,1,1,1,1,4,4,4,4,1,1,1,1,1,1,3],
    [3,1,1,1,1,1,1,4,4,1,1,1,1,1,1,1,3],
    [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3],
    [0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0],
  ]

  const rows = grid.length
  const cols = grid[0].length
  const px = size / cols

  return (
    <svg
      width={cols * px}
      height={rows * px}
      className={className}
      viewBox={`0 0 ${cols} ${rows}`}
      aria-label="Pixel envelope"
      role="img"
      style={{ imageRendering: "pixelated" }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) =>
          cell !== 0 && palette[cell] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[cell]} />
          ) : null
        )
      )}
    </svg>
  )
}

// Helper to render a pixel grid from a color map
function PixelGrid({ grid, palette, size, className }: { grid: number[][]; palette: Record<number, string>; size: number; className?: string }) {
  const rows = grid.length
  const cols = Math.max(...grid.map(r => r.length))
  const px = size / Math.max(rows, cols)

  return (
    <svg width={cols * px} height={rows * px} className={className} viewBox={`0 0 ${cols} ${rows}`} aria-hidden="true" style={{ imageRendering: "pixelated" }}>
      {grid.map((row, y) =>
        row.map((cell, x) =>
          cell !== 0 && palette[cell] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[cell]} />
          ) : null
        )
      )}
    </svg>
  )
}

export function PixelCharacter({ type = "bear", size = 80, className = "" }: { type?: "bear" | "bunny" | "cat"; size?: number; className?: string }) {
  if (type === "bear") {
    // Brown bear with pink body
    // 0=empty 1=brown 2=light brown(face) 3=dark(eyes) 4=pink(blush) 5=dark(nose/mouth) 6=pink(body) 7=white(eye shine) 8=pink ear inner
    const palette: Record<number, string> = {
      1: "hsl(20, 50%, 55%)",
      2: "hsl(25, 40%, 75%)",
      3: "hsl(340, 40%, 15%)",
      4: "hsl(340, 80%, 75%)",
      5: "hsl(340, 40%, 30%)",
      6: "hsl(340, 70%, 68%)",
      7: "#ffffff",
      8: "hsl(340, 60%, 72%)",
    }
    const grid = [
      [0,0,1,1,0,0,0,0,0,0,1,1,0,0],
      [0,0,1,8,1,0,0,0,0,1,8,1,0,0],
      [0,0,1,1,1,0,0,0,0,1,1,1,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,1,2,2,2,2,2,2,2,2,1,0,0],
      [0,0,1,2,3,7,2,2,3,7,2,1,0,0],
      [0,0,1,2,3,3,2,2,3,3,2,1,0,0],
      [0,0,1,4,2,2,5,5,2,2,4,1,0,0],
      [0,0,1,4,2,2,2,2,2,2,4,1,0,0],
      [0,0,1,2,2,5,5,5,5,2,2,1,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,0,6,6,6,6,6,6,0,0,0,0],
      [0,0,0,6,6,6,6,6,6,6,6,0,0,0],
      [0,0,0,6,6,6,6,6,6,6,6,0,0,0],
      [0,0,0,0,6,6,0,0,6,6,0,0,0,0],
    ]
    return <PixelGrid grid={grid} palette={palette} size={size} className={className} />
  }

  if (type === "bunny") {
    // White bunny with pink accents
    // 0=empty 1=white 2=pink(ear inner) 3=dark(eyes) 4=pink(nose) 5=pink(blush) 6=pink(body) 7=white(eye shine)
    const palette: Record<number, string> = {
      1: "hsl(0, 0%, 93%)",
      2: "hsl(340, 60%, 78%)",
      3: "hsl(340, 40%, 15%)",
      4: "hsl(340, 60%, 65%)",
      5: "hsl(340, 80%, 75%)",
      6: "hsl(350, 70%, 73%)",
      7: "#ffffff",
    }
    const grid = [
      [0,0,0,1,1,0,0,0,0,1,1,0,0,0],
      [0,0,0,1,2,1,0,0,1,2,1,0,0,0],
      [0,0,0,1,2,1,0,0,1,2,1,0,0,0],
      [0,0,0,1,2,1,0,0,1,2,1,0,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,1,1,3,7,1,1,3,7,1,1,0,0],
      [0,0,1,1,3,3,1,1,3,3,1,1,0,0],
      [0,0,1,5,1,1,4,4,1,1,5,1,0,0],
      [0,0,1,5,1,1,1,1,1,1,5,1,0,0],
      [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
      [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
      [0,0,0,0,6,6,6,6,6,6,0,0,0,0],
      [0,0,0,6,6,6,6,6,6,6,6,0,0,0],
      [0,0,0,6,6,6,6,6,6,6,6,0,0,0],
      [0,0,0,0,6,6,0,0,6,6,0,0,0,0],
    ]
    return <PixelGrid grid={grid} palette={palette} size={size} className={className} />
  }

  // Cat - orange tabby with green eyes
  // 0=empty 1=orange 2=dark orange(stripes) 3=green(eyes) 4=dark(pupils) 5=pink(nose) 6=dark(whiskers) 7=pink(body) 8=pink(ear inner) 9=white(eye shine)
  const palette: Record<number, string> = {
    1: "hsl(28, 55%, 58%)",
    2: "hsl(25, 50%, 42%)",
    3: "hsl(140, 50%, 50%)",
    4: "hsl(340, 40%, 15%)",
    5: "hsl(340, 55%, 62%)",
    6: "hsl(25, 30%, 35%)",
    7: "hsl(340, 55%, 66%)",
    8: "hsl(340, 60%, 72%)",
    9: "#ffffff",
  }
  const grid = [
    [0,0,1,1,0,0,0,0,0,0,1,1,0,0],
    [0,0,1,8,1,0,0,0,0,1,8,1,0,0],
    [0,0,0,1,1,0,0,0,0,1,1,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,1,1,2,1,1,1,2,1,1,1,0,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,1,3,4,9,1,1,3,4,9,1,0,0],
    [0,0,1,3,4,4,1,1,3,4,4,1,0,0],
    [0,6,1,1,1,1,5,5,1,1,1,1,6,0],
    [0,0,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,6,1,1,2,1,1,1,1,2,1,1,6,0],
    [0,0,0,1,1,1,1,1,1,1,1,0,0,0],
    [0,0,0,0,7,7,7,7,7,7,0,0,0,0],
    [0,0,0,7,7,7,7,7,7,7,7,0,0,0],
    [0,0,0,7,7,7,7,7,7,7,7,0,0,0],
    [0,0,0,0,7,7,0,0,7,7,0,0,0,0],
  ]
  return <PixelGrid grid={grid} palette={palette} size={size} className={className} />
}

export function PixelStar({ size = 24, className = "" }: { size?: number; className?: string }) {
  // 0=empty 1=yellow 2=lighter yellow highlight
  const palette: Record<number, string> = {
    1: "hsl(45, 90%, 55%)",
    2: "hsl(45, 95%, 72%)",
  }
  const grid = [
    [0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,2,1,0,0,0,0],
    [0,0,0,0,1,1,1,0,0,0,0],
    [1,1,1,1,1,2,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,1,1,0],
    [0,0,1,1,2,1,2,1,1,0,0],
    [0,0,0,1,1,1,1,1,0,0,0],
    [0,0,1,1,2,0,2,1,1,0,0],
    [0,1,1,0,0,0,0,0,1,1,0],
    [0,1,0,0,0,0,0,0,0,1,0],
  ]
  return <PixelGrid grid={grid} palette={palette} size={size} className={className} />
}

export function FloatingHearts() {
  const hearts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 8.5) % 100}%`,
    delay: `${i * 0.7}s`,
    duration: `${3 + (i % 3)}s`,
    size: 10 + (i % 3) * 6,
    opacity: 0.15 + (i % 4) * 0.08,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: heart.left,
            top: `${10 + (heart.id * 7) % 80}%`,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            opacity: heart.opacity,
          }}
        >
          <PixelHeart size={heart.size} />
        </div>
      ))}
    </div>
  )
}
