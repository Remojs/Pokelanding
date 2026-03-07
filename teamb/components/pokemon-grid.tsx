"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePokemonList, extractPokemonId } from "@/hooks/use-pokemon";
import { TYPE_COLORS } from "@/lib/pokemon-types";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PokemonGridProps {
  onSelect: (id: number) => void;
}

interface PokemonWithTypes {
  id: number;
  name: string;
  types: string[];
}

export function PokemonGrid({ onSelect }: PokemonGridProps) {
  const { pokemonList, isLoading } = usePokemonList(151);
  const [pokemonData, setPokemonData] = useState<PokemonWithTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingTypes, setLoadingTypes] = useState(true);

  useEffect(() => {
    if (pokemonList) {
      // Fetch types for all pokemon
      const fetchTypes = async () => {
        setLoadingTypes(true);
        const data = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const id = extractPokemonId(pokemon.url);
            try {
              const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
              const details = await res.json();
              return {
                id,
                name: pokemon.name,
                types: details.types.map((t: { type: { name: string } }) => t.type.name),
              };
            } catch {
              return {
                id,
                name: pokemon.name,
                types: ["normal"],
              };
            }
          })
        );
        setPokemonData(data);
        setLoadingTypes(false);
      };
      fetchTypes();
    }
  }, [pokemonList]);

  const filteredPokemon = pokemonData.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.id.toString().includes(searchTerm)
  );

  if (isLoading || loadingTypes) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-xs text-muted-foreground">Loading Pokédex...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or #..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-10 text-sm bg-muted border-2 border-border"
        />
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
        {filteredPokemon.map((pokemon) => (
          <PokemonGridItem
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

interface PokemonGridItemProps {
  id: number;
  name: string;
  types: string[];
  onSelect: (id: number) => void;
}

function PokemonGridItem({ id, name, types, onSelect }: PokemonGridItemProps) {
  const mainType = types[0] || "normal";
  const bgColor = TYPE_COLORS[mainType];

  return (
    <button
      onClick={() => onSelect(id)}
      className="group flex flex-col items-center p-2 bg-card/50 hover:bg-primary/20 border-2 border-border hover:border-primary transition-all duration-200 cursor-pointer"
      style={{
        background: `linear-gradient(135deg, ${bgColor}20 0%, transparent 100%)`,
      }}
    >
      <div className="relative w-12 h-12 sm:w-14 sm:h-14">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={name}
          fill
          className="object-contain pixelated group-hover:scale-110 transition-transform"
          unoptimized
        />
      </div>
      <span className="text-[8px] sm:text-[9px] font-mono text-foreground truncate w-full text-center capitalize mt-1">
        {name}
      </span>
      <div className="flex flex-wrap gap-0.5 mt-1 justify-center">
        {types.map((type) => (
          <span
            key={type}
            className="px-1 py-0.5 text-[6px] sm:text-[7px] font-bold text-white uppercase"
            style={{ backgroundColor: TYPE_COLORS[type] || "#777" }}
          >
            {type.slice(0, 3)}
          </span>
        ))}
      </div>
    </button>
  );
}
