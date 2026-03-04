"use client"

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  special_attack: 'SP.A',
  special_defense: 'SP.D',
  speed: 'SPD',
}

const STAT_ORDER = ['hp', 'attack', 'defense', 'special_attack', 'special_defense', 'speed'] as const

export function StatBars({
  stats,
  accentColor,
  textColor,
  bgColor,
}: {
  stats: {
    hp: number
    attack: number
    defense: number
    special_attack: number
    special_defense: number
    speed: number
  }
  accentColor: string
  textColor: string
  bgColor: string
}) {
  return (
    <div className="flex flex-col gap-2">
      {STAT_ORDER.map((key) => {
        const value = stats[key]
        return (
          <div key={key} className="flex items-center gap-2">
            <span
              className="w-12 text-right font-mono text-[8px] uppercase tracking-wider"
              style={{ color: textColor }}
            >
              {STAT_LABELS[key]}
            </span>
            <div className="relative h-3 flex-1" style={{ backgroundColor: bgColor }}>
              <div
                className="h-full transition-all duration-1000 ease-out"
                style={{
                  width: `${Math.min((value / 255) * 100, 100)}%`,
                  backgroundColor: accentColor,
                }}
              />
              {/* Pixel steps overlay */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-full border-r"
                    style={{
                      width: '5%',
                      borderColor: bgColor,
                      borderWidth: '0 1px 0 0',
                    }}
                  />
                ))}
              </div>
            </div>
            <span
              className="w-8 text-left font-mono text-[8px]"
              style={{ color: textColor }}
            >
              {value}
            </span>
          </div>
        )
      })}
    </div>
  )
}
