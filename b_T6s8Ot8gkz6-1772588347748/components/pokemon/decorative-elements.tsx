"use client"

export function PixelStar({ className = "", size = 12, color = "#fff", delay = 0 }: {
  className?: string
  size?: number
  color?: string
  delay?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className={`animate-star-twinkle ${className}`}
      style={{ animationDelay: `${delay}s`, color }}
      fill="currentColor"
    >
      <path d="M6 0L7 4H11L8 7L9 11L6 9L3 11L4 7L1 4H5L6 0Z" />
    </svg>
  )
}

export function PixelDiamond({ className = "", size = 8, color = "#fff", delay = 0 }: {
  className?: string
  size?: number
  color?: string
  delay?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      className={`animate-star-twinkle ${className}`}
      style={{ animationDelay: `${delay}s`, color }}
      fill="currentColor"
    >
      <path d="M4 0L8 4L4 8L0 4Z" />
    </svg>
  )
}

export function PixelCross({ className = "", size = 10, color = "#fff" }: {
  className?: string
  size?: number
  color?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      className={className}
      fill="none"
      stroke={color}
      strokeWidth={1.5}
    >
      <line x1="2" y1="2" x2="8" y2="8" />
      <line x1="8" y1="2" x2="2" y2="8" />
    </svg>
  )
}

export function Pokeball({ className = "", size = 40, color = "#fff", bgColor = "#000" }: {
  className?: string
  size?: number
  color?: string
  bgColor?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className={className}
      fill="none"
    >
      <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="2" />
      <line x1="2" y1="20" x2="38" y2="20" stroke={color} strokeWidth="2" />
      <circle cx="20" cy="20" r="6" stroke={color} strokeWidth="2" fill={bgColor} />
      <circle cx="20" cy="20" r="3" fill={color} />
    </svg>
  )
}

export function ScanlineOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-[0.03]">
      <div
        className="absolute inset-0 animate-scanline"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          height: '200%',
        }}
      />
    </div>
  )
}

export function ScatteredStars({ color, count = 8 }: { color: string; count?: number }) {
  const positions = [
    { top: '8%', left: '5%' },
    { top: '15%', right: '8%' },
    { top: '35%', left: '3%' },
    { top: '55%', right: '5%' },
    { top: '70%', left: '7%' },
    { top: '85%', right: '10%' },
    { top: '25%', left: '92%' },
    { top: '45%', left: '2%' },
    { top: '65%', right: '3%' },
    { top: '90%', left: '12%' },
    { top: '12%', left: '50%' },
    { top: '78%', left: '88%' },
  ]

  return (
    <>
      {positions.slice(0, count).map((pos, i) => (
        <div key={i} className="absolute z-20" style={pos}>
          {i % 3 === 0 ? (
            <PixelStar size={i % 2 === 0 ? 14 : 10} color={color} delay={i * 0.4} />
          ) : i % 3 === 1 ? (
            <PixelDiamond size={i % 2 === 0 ? 10 : 7} color={color} delay={i * 0.3} />
          ) : (
            <PixelCross size={i % 2 === 0 ? 12 : 8} color={color} />
          )}
        </div>
      ))}
    </>
  )
}
