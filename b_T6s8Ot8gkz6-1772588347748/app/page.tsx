"use client"

import { useState, useCallback, useEffect } from "react"
import { type PokemonData, getTypeTheme } from "@/lib/pokemon-types"
import { PokemonPoster } from "@/components/pokemon/pokemon-poster"
import { Pokeball } from "@/components/pokemon/decorative-elements"

// Sample data in the provided format
const POKEMON_LIST: PokemonData[] = [
  {
    stats: { hp: 45, attack: 49, defense: 49, special_attack: 65, special_defense: 65, speed: 45 },
    _id: "6394ccde0444413377f3288b",
    ID: 1,
    name: "bulbasaur",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    first_type: "grass",
    ability: "overgrow",
    height: "0.7m",
    weight: "6.9kg",
  },
  {
    stats: { hp: 39, attack: 52, defense: 43, special_attack: 60, special_defense: 50, speed: 65 },
    _id: "6394ccde0444413377f3288e",
    ID: 4,
    name: "charmander",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    first_type: "fire",
    ability: "blaze",
    height: "0.6m",
    weight: "8.5kg",
  },
  {
    stats: { hp: 44, attack: 48, defense: 65, special_attack: 50, special_defense: 64, speed: 43 },
    _id: "6394ccde0444413377f32892",
    ID: 7,
    name: "squirtle",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    first_type: "water",
    ability: "torrent",
    height: "0.5m",
    weight: "9kg",
  },
  {
    stats: { hp: 35, attack: 55, defense: 40, special_attack: 50, special_defense: 50, speed: 90 },
    _id: "6394ccde0444413377f32891",
    ID: 25,
    name: "pikachu",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    first_type: "electric",
    ability: "static",
    height: "0.4m",
    weight: "6kg",
  },
  {
    stats: { hp: 78, attack: 84, defense: 78, special_attack: 109, special_defense: 85, speed: 100 },
    _id: "6394ccde0444413377f328a0",
    ID: 6,
    name: "charizard",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    first_type: "fire",
    ability: "blaze",
    height: "1.7m",
    weight: "90.5kg",
  },
  {
    stats: { hp: 60, attack: 65, defense: 60, special_attack: 130, special_defense: 75, speed: 110 },
    _id: "6394ccde0444413377f328b0",
    ID: 94,
    name: "gengar",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
    first_type: "ghost",
    ability: "cursed-body",
    height: "1.5m",
    weight: "40.5kg",
  },
  {
    stats: { hp: 106, attack: 110, defense: 90, special_attack: 154, special_defense: 90, speed: 130 },
    _id: "6394ccde0444413377f328c0",
    ID: 150,
    name: "mewtwo",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
    first_type: "psychic",
    ability: "pressure",
    height: "2m",
    weight: "122kg",
  },
  {
    stats: { hp: 91, attack: 134, defense: 95, special_attack: 100, special_defense: 100, speed: 80 },
    _id: "6394ccde0444413377f328d0",
    ID: 149,
    name: "dragonite",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png",
    first_type: "dragon",
    ability: "inner-focus",
    height: "2.2m",
    weight: "210kg",
  },
  {
    stats: { hp: 65, attack: 65, defense: 60, special_attack: 110, special_defense: 95, speed: 130 },
    _id: "6394ccde0444413377f328e0",
    ID: 135,
    name: "jolteon",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png",
    first_type: "electric",
    ability: "volt-absorb",
    height: "0.8m",
    weight: "24.5kg",
  },
  {
    stats: { hp: 55, attack: 55, defense: 50, special_attack: 45, special_defense: 65, speed: 55 },
    _id: "6394ccde0444413377f328f0",
    ID: 133,
    name: "eevee",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
    first_type: "normal",
    ability: "run-away",
    height: "0.3m",
    weight: "6.5kg",
  },
  {
    stats: { hp: 45, attack: 25, defense: 50, special_attack: 25, special_defense: 25, speed: 35 },
    _id: "6394ccde0444413377f328f1",
    ID: 93,
    name: "haunter",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png",
    first_type: "ghost",
    ability: "levitate",
    height: "1.6m",
    weight: "0.1kg",
  },
  {
    stats: { hp: 160, attack: 110, defense: 65, special_attack: 65, special_defense: 110, speed: 30 },
    _id: "6394ccde0444413377f328f2",
    ID: 143,
    name: "snorlax",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
    first_type: "normal",
    ability: "immunity",
    height: "2.1m",
    weight: "460kg",
  },
  {
    stats: { hp: 95, attack: 125, defense: 79, special_attack: 60, special_defense: 100, speed: 81 },
    _id: "6394ccde0444413377f328f3",
    ID: 130,
    name: "gyarados",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png",
    first_type: "water",
    ability: "intimidate",
    height: "6.5m",
    weight: "235kg",
  },
  {
    stats: { hp: 70, attack: 110, defense: 70, special_attack: 115, special_defense: 70, speed: 90 },
    _id: "6394ccde0444413377f328f4",
    ID: 448,
    name: "lucario",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png",
    first_type: "fighting",
    ability: "steadfast",
    height: "1.2m",
    weight: "54kg",
  },
  {
    stats: { hp: 90, attack: 65, defense: 65, special_attack: 110, special_defense: 130, speed: 60 },
    _id: "6394ccde0444413377f328f5",
    ID: 131,
    name: "lapras",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png",
    first_type: "water",
    ability: "water-absorb",
    height: "2.5m",
    weight: "220kg",
  },
  {
    stats: { hp: 68, attack: 65, defense: 65, special_attack: 125, special_defense: 115, speed: 80 },
    _id: "6394ccde0444413377f328f6",
    ID: 282,
    name: "gardevoir",
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png",
    first_type: "psychic",
    ability: "synchronize",
    height: "1.6m",
    weight: "48.4kg",
  },
]

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [bgColor, setBgColor] = useState("#1a1a2e")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const pokemon = POKEMON_LIST[currentIndex]

  const updateTheme = useCallback((poke: PokemonData) => {
    const theme = getTypeTheme(poke.first_type)
    setBgColor(theme.bgDark)
  }, [])

  useEffect(() => {
    updateTheme(pokemon)
  }, [pokemon, updateTheme])

  const goToPrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev <= 0 ? POKEMON_LIST.length - 1 : prev - 1))
      setIsTransitioning(false)
    }, 150)
  }, [isTransitioning])

  const goToNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev >= POKEMON_LIST.length - 1 ? 0 : prev + 1))
      setIsTransitioning(false)
    }, 150)
  }, [isTransitioning])

  const theme = getTypeTheme(pokemon.first_type)

  return (
    <main
      className="relative flex min-h-screen items-center justify-center transition-colors duration-700"
      style={{ backgroundColor: bgColor }}
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${theme.bg}20 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
        {/* Prev / Next navigation */}
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={goToPrev}
            disabled={isTransitioning}
            className="font-mono text-[10px] uppercase tracking-widest transition-opacity hover:opacity-100 disabled:opacity-20"
            style={{ color: theme.accent }}
          >
            {'<< '}Prev
          </button>
          <span
            className="font-mono text-[10px] uppercase tracking-widest opacity-40"
            style={{ color: theme.accent }}
          >
            #{String(pokemon.ID).padStart(3, '0')}
          </span>
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="font-mono text-[10px] uppercase tracking-widest transition-opacity hover:opacity-100 disabled:opacity-20"
            style={{ color: theme.accent }}
          >
            Next{' >>'}
          </button>
        </div>

        {/* Pokemon poster */}
        <div
          className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          key={pokemon._id}
        >
          <PokemonPoster pokemon={pokemon} />
        </div>

        {/* Footer */}
        <footer className="mt-8 flex items-center justify-center gap-2 pb-6">
          <Pokeball size={16} color={theme.accent} bgColor={bgColor} />
          <p
            className="font-mono text-[8px] uppercase tracking-[0.3em] opacity-30"
            style={{ color: theme.accent }}
          >
            {currentIndex + 1} / {POKEMON_LIST.length}
          </p>
          <Pokeball size={16} color={theme.accent} bgColor={bgColor} />
        </footer>
      </div>
    </main>
  )
}
