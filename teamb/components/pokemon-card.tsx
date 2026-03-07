"use client";

import Image from "next/image";
import { usePokemonDetails } from "@/hooks/use-pokemon";
import { TYPE_COLORS, STAT_COLORS, STAT_LABELS } from "@/lib/pokemon-types";
import { Loader2 } from "lucide-react";

interface PokemonCardProps {
  pokemonId: number | null;
}

export function PokemonCard({ pokemonId }: PokemonCardProps) {
  const { pokemon, isLoading } = usePokemonDetails(pokemonId);

  if (!pokemonId) {
    return (
      <div className="relative h-full flex flex-col items-center justify-center bg-gradient-to-br from-card via-muted/30 to-card border-4 border-dashed border-border p-8">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNTUsMTA5LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        <div className="relative z-10 text-center">
          <div className="w-32 h-32 mx-auto mb-4 bg-muted/50 flex items-center justify-center border-4 border-border">
            <span className="text-4xl opacity-30">?</span>
          </div>
          <p className="text-muted-foreground font-mono text-sm">Select a Pokemon from your team</p>
        </div>
      </div>
    );
  }

  if (isLoading || !pokemon) {
    return (
      <div className="h-full flex items-center justify-center bg-card border-4 border-border">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const mainType = pokemon.types[0]?.type.name || "normal";
  const bgColor = TYPE_COLORS[mainType] || TYPE_COLORS.normal;

  return (
    <div className="relative h-full overflow-hidden border-4 border-primary/50">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${bgColor} 0%, transparent 50%)`,
        }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNTUsMTA5LDI1NSwwLjE1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-secondary">
                N°{pokemon.id.toString().padStart(4, "0")}
              </span>
            </div>
            <h2 className="text-2xl font-bold capitalize text-foreground tracking-wide" style={{ fontFamily: 'var(--font-press-start)' }}>
              {pokemon.name}
            </h2>
          </div>
          <div className="flex flex-col gap-1">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="px-3 py-1 text-xs font-bold text-white uppercase border-2 border-white/20"
                style={{ backgroundColor: TYPE_COLORS[t.type.name] || "#777" }}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Pokemon Image */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-48 h-48 opacity-30 blur-3xl"
              style={{ backgroundColor: bgColor }}
            />
          </div>
          <div className="relative w-56 h-56">
            <Image
              src={pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
              fill
              className="object-contain drop-shadow-2xl"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 space-y-2">
          <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Base Stats</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-muted-foreground w-12">
                  {STAT_LABELS[stat.stat.name] || stat.stat.name}
                </span>
                <div className="flex-1 h-3 bg-muted overflow-hidden border border-border">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                      backgroundColor: STAT_COLORS[stat.stat.name] || "#9b6dff",
                    }}
                  />
                </div>
                <span className="text-xs font-bold text-foreground w-8 text-right">
                  {stat.base_stat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-border flex justify-between text-xs">
          <div className="text-center">
            <span className="text-muted-foreground">Height</span>
            <p className="font-bold text-foreground">{(pokemon.height / 10).toFixed(1)}m</p>
          </div>
          <div className="text-center">
            <span className="text-muted-foreground">Weight</span>
            <p className="font-bold text-foreground">{(pokemon.weight / 10).toFixed(1)}kg</p>
          </div>
          <div className="text-center">
            <span className="text-muted-foreground">Abilities</span>
            <p className="font-bold text-foreground capitalize">
              {pokemon.abilities[0]?.ability.name.replace("-", " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
