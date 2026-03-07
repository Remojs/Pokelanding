"use client";

import useSWR from "swr";
import type { Pokemon, PokemonBasic } from "@/lib/pokemon-types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePokemonList(limit: number = 151) {
  const { data, error, isLoading } = useSWR(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
    fetcher
  );

  return {
    pokemonList: data?.results as { name: string; url: string }[] | undefined,
    isLoading,
    error,
  };
}

export function usePokemonDetails(id: number | null) {
  const { data, error, isLoading } = useSWR(
    id ? `https://pokeapi.co/api/v2/pokemon/${id}` : null,
    fetcher
  );

  return {
    pokemon: data as Pokemon | undefined,
    isLoading,
    error,
  };
}

export function extractPokemonId(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

export function getPokemonBasic(pokemon: Pokemon): PokemonBasic {
  return {
    id: pokemon.id,
    name: pokemon.name,
    sprite: pokemon.sprites.other["official-artwork"].front_default || pokemon.sprites.front_default,
    types: pokemon.types.map((t) => t.type.name),
  };
}
