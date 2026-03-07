"use client";

import Image from "next/image";
import { X } from "lucide-react";
import type { PokemonBasic } from "@/lib/pokemon-types";
import { TYPE_COLORS } from "@/lib/pokemon-types";

interface TeamSlotsProps {
  pokemon: (PokemonBasic | null)[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  onRemove: (index: number) => void;
}

export function TeamSlots({ pokemon, selectedIndex, onSelect, onRemove }: TeamSlotsProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-bold text-secondary uppercase tracking-wider text-center" style={{ fontFamily: 'var(--font-press-start)' }}>
        Team
      </h3>
      <div className="grid grid-cols-1 gap-2">
        {pokemon.map((poke, index) => (
          <TeamSlot
            key={index}
            pokemon={poke}
            slotNumber={index + 1}
            isSelected={selectedIndex === index}
            onSelect={() => onSelect(index)}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}

interface TeamSlotProps {
  pokemon: PokemonBasic | null;
  slotNumber: number;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

function TeamSlot({ pokemon, slotNumber, isSelected, onSelect, onRemove }: TeamSlotProps) {
  const mainType = pokemon?.types[0] || "normal";
  const bgColor = TYPE_COLORS[mainType] || TYPE_COLORS.normal;

  return (
    <button
      onClick={onSelect}
      className={`relative group w-full p-2 border-2 transition-all duration-200 ${
        isSelected
          ? "border-secondary bg-secondary/10 shadow-lg shadow-secondary/20"
          : pokemon
          ? "border-primary/30 bg-card hover:border-primary/60"
          : "border-border border-dashed bg-card/30 hover:bg-card/50"
      }`}
    >
      {pokemon ? (
        <div className="flex items-center gap-2">
          <div 
            className="relative w-12 h-12 flex items-center justify-center border-2 border-border"
            style={{ backgroundColor: `${bgColor}20` }}
          >
            <Image
              src={pokemon.sprite}
              alt={pokemon.name}
              width={48}
              height={48}
              className="object-contain pixelated"
              unoptimized
            />
          </div>
          <div className="flex-1 text-left">
            <p className="text-xs font-bold text-foreground capitalize truncate">
              {pokemon.name}
            </p>
            <div className="flex gap-1 mt-0.5">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="px-1 text-[7px] font-bold text-white uppercase"
                  style={{ backgroundColor: TYPE_COLORS[type] || "#777" }}
                >
                  {type.slice(0, 3)}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="opacity-0 group-hover:opacity-100 p-1 bg-destructive/80 hover:bg-destructive transition-all"
          >
            <X className="w-3 h-3 text-destructive-foreground" />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center h-12 border-2 border-dashed border-border/50">
          <span className="text-[10px] font-mono text-muted-foreground">
            Slot {slotNumber}
          </span>
        </div>
      )}
    </button>
  );
}
