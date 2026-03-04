"use client"

import { type PokemonData, getTypeTheme, TYPE_NAMES_JP, POKEMON_NAMES_JP } from "@/lib/pokemon-types"
import { StatBars } from "./stat-bars"
import { ScatteredStars, ScanlineOverlay, Pokeball } from "./decorative-elements"

export function PokemonPoster({ pokemon }: { pokemon: PokemonData }) {
  const theme = getTypeTheme(pokemon.first_type)
  const pokemonId = String(pokemon.ID).padStart(3, "0")
  const japaneseName = POKEMON_NAMES_JP[pokemon.name.toLowerCase()] || pokemon.name
  const totalStats =
    pokemon.stats.hp +
    pokemon.stats.attack +
    pokemon.stats.defense +
    pokemon.stats.special_attack +
    pokemon.stats.special_defense +
    pokemon.stats.speed

  return (
    <div
      className="animate-pixel-fade-in relative mx-auto w-full max-w-2xl overflow-hidden"
      style={{
        backgroundColor: theme.bgDark,
        color: theme.text,
      }}
    >
      {/* Scanline overlay */}
      <ScanlineOverlay />

      {/* Scattered decorative stars */}
      <ScatteredStars color={theme.accent} count={10} />

      {/* ===== TOP SECTION: NAME HEADER ===== */}
      <div
        className="relative z-10 px-5 pt-5 pb-2"
        style={{ backgroundColor: theme.bgDark }}
      >
        {/* Pokemon number */}
        <div
          className="mb-1 font-mono text-[10px] tracking-[0.3em] opacity-60"
          style={{ color: theme.accent }}
        >
          No. {pokemonId}
        </div>

        {/* Big English name */}
        <h1
          className="font-mono text-3xl leading-none tracking-tighter uppercase sm:text-5xl md:text-6xl"
          style={{
            color: theme.accent,
            textShadow: `3px 3px 0px ${theme.accentDark}`,
            letterSpacing: '-0.05em',
          }}
        >
          {pokemon.name}
        </h1>

        {/* Japanese name under the title */}
        <p
          className="mt-1 font-sans text-xl sm:text-2xl"
          style={{ color: theme.accent, opacity: 0.8 }}
        >
          {japaneseName}
        </p>
      </div>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="relative z-10 flex flex-col md:flex-row">
        {/* Left: Pokemon artwork with sunburst */}
        <div className="relative flex-1 overflow-hidden" style={{ minHeight: '320px' }}>
          {/* Sunburst background */}
          <div
            className="sunburst absolute inset-0"
            style={{
              '--ray-color-1': theme.rayColor1,
              '--ray-color-2': theme.rayColor2,
              opacity: 0.3,
            } as React.CSSProperties}
          />

          {/* Solid color overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: theme.bg, opacity: 0.4 }}
          />

          {/* Halftone texture overlay */}
          <div
            className="halftone-overlay absolute inset-0 opacity-[0.08]"
            style={{ color: theme.textDark }}
          />

          {/* Pokemon image */}
          <div className="animate-float relative z-10 flex items-center justify-center p-8">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="relative z-10 h-64 w-64 drop-shadow-2xl sm:h-72 sm:w-72"
              style={{
                filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
                imageRendering: 'pixelated',
              }}
            />
          </div>

          {/* Pokeball decoration in corner */}
          <div className="absolute bottom-3 right-3 z-10 opacity-20">
            <Pokeball size={50} color={theme.accent} bgColor={theme.bgDark} />
          </div>
        </div>

        {/* Right: Info panel */}
        <div
          className="relative z-10 flex flex-col justify-between p-5 md:w-[280px]"
          style={{ backgroundColor: theme.accentDark }}
        >
          {/* Type badge */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span
              className="inline-flex items-center gap-1 border-2 px-3 py-1 font-mono text-[9px] uppercase tracking-widest"
              style={{
                borderColor: theme.accent,
                color: theme.accent,
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}
            >
              {TYPE_NAMES_JP[pokemon.first_type] || pokemon.first_type}
              <span className="ml-1 text-[7px] opacity-60">{pokemon.first_type}</span>
            </span>
          </div>

          {/* Divider */}
          <div
            className="mb-4 h-px w-full"
            style={{ backgroundColor: theme.accent, opacity: 0.2 }}
          />

          {/* Physical info */}
          <div className="mb-4 flex gap-6">
            <div>
              <span
                className="block font-mono text-[8px] uppercase tracking-widest"
                style={{ color: theme.accent, opacity: 0.5 }}
              >
                Height
              </span>
              <span
                className="font-mono text-sm"
                style={{ color: theme.accent }}
              >
                {pokemon.height}
              </span>
            </div>
            <div>
              <span
                className="block font-mono text-[8px] uppercase tracking-widest"
                style={{ color: theme.accent, opacity: 0.5 }}
              >
                Weight
              </span>
              <span
                className="font-mono text-sm"
                style={{ color: theme.accent }}
              >
                {pokemon.weight}
              </span>
            </div>
          </div>

          {/* Ability */}
          <div className="mb-4">
            <span
              className="mb-1 block font-mono text-[8px] uppercase tracking-widest"
              style={{ color: theme.accent, opacity: 0.5 }}
            >
              Ability
            </span>
            <span
              className="font-sans text-xs capitalize"
              style={{ color: theme.accent, opacity: 0.8 }}
            >
              {pokemon.ability.replace('-', ' ')}
            </span>
          </div>

          {/* Decorative pokeball */}
          <div className="mt-auto flex justify-center pt-4 opacity-15">
            <Pokeball size={60} color={theme.accent} bgColor={theme.accentDark} />
          </div>
        </div>
      </div>

      {/* ===== BOTTOM: STATS SECTION ===== */}
      <div
        className="relative z-10 p-5"
        style={{ backgroundColor: theme.bgDark }}
      >
        {/* Stats header */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.3em]"
            style={{ color: theme.accent }}
          >
            Base Stats
          </span>
          <div
            className="h-px flex-1"
            style={{ backgroundColor: theme.accent, opacity: 0.2 }}
          />
        </div>

        <StatBars
          stats={pokemon.stats}
          accentColor={theme.accent}
          textColor={theme.accent}
          bgColor={theme.accentDark}
        />

        {/* Total */}
        <div className="mt-3 flex items-center justify-end gap-2">
          <span
            className="font-mono text-[9px] uppercase tracking-widest"
            style={{ color: theme.accent, opacity: 0.5 }}
          >
            Total
          </span>
          <span
            className="font-mono text-sm"
            style={{ color: theme.accent }}
          >
            {totalStats}
          </span>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div
        className="relative z-10 flex items-center justify-between px-5 py-3"
        style={{ backgroundColor: theme.accent }}
      >
        <span
          className="font-mono text-[8px] uppercase tracking-[0.2em]"
          style={{ color: theme.bgDark }}
        >
          {TYPE_NAMES_JP[pokemon.first_type]} Type
        </span>
        <div className="flex items-center gap-2">
          <Pokeball size={16} color={theme.bgDark} bgColor={theme.accent} />
          <span
            className="font-mono text-[8px] uppercase tracking-[0.2em]"
            style={{ color: theme.bgDark }}
          >
            #{pokemonId}
          </span>
        </div>
      </div>

      {/* Noise texture overlay */}
      <div className="noise-texture pointer-events-none absolute inset-0 z-20" />
    </div>
  )
}
