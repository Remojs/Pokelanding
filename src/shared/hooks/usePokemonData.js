/**
 * Custom hook for managing Pokemon data fetching and filtering
 */
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { pokemonApi } from '../services/pokemonApi.js';
import { transformPokemonData } from '../utils/pokemonUtils.js';

export const usePokemonData = (searchQuery, selectedTypes) => {
  // Query for general Pokemon list (when no type filters)
  const infiniteQuery = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: async ({ pageParam = 0 }) => {
      const pokemonListData = await pokemonApi.getPokemonList(pageParam, 20);
      
      // Transform the Pokemon data to match component expectations
      const transformedPokemon = pokemonListData.results.map(transformPokemonData);
      
      return {
        pokemon: transformedPokemon,
        nextOffset: pageParam + 20,
        hasMore: pokemonListData.next !== null
      };
    },
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextOffset : undefined,
    initialPageParam: 0,
    enabled: selectedTypes.length === 0, // Only fetch when no type filters
  });

  // Query for Pokemon by specific types
  const typeQuery = useQuery({
    queryKey: ['pokemon-by-types', selectedTypes],
    queryFn: async () => {
      if (selectedTypes.length === 0) return [];
      
      // Get Pokemon for each selected type
      const typePromises = selectedTypes.map(type => pokemonApi.getPokemonByType(type));
      const typeResults = await Promise.all(typePromises);
      
      // Combine and deduplicate Pokemon (some may appear in multiple types)
      const allPokemon = typeResults.flat();
      const uniquePokemon = allPokemon.filter((pokemon, index, array) => 
        array.findIndex(p => p.ID === pokemon.ID) === index
      );
      
      // Transform and sort by ID for consistent ordering
      const transformedPokemon = uniquePokemon.map(transformPokemonData);
      return transformedPokemon.sort((a, b) => a.id - b.id);
    },
    enabled: selectedTypes.length > 0, // Only fetch when type filters are selected
  });

  // Combine data and apply search filter
  const filteredPokemon = useMemo(() => {
    let pokemonToFilter = [];

    if (selectedTypes.length > 0) {
      // Use type-filtered data
      pokemonToFilter = typeQuery.data || [];
    } else {
      // Use infinite scroll data
      pokemonToFilter = infiniteQuery.data ? 
        infiniteQuery.data.pages.flatMap(page => page.pokemon) : [];
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      return pokemonToFilter.filter(pokemon => 
        pokemon.name.toLowerCase().includes(query) ||
        pokemon.id.toString().includes(query)
      );
    }

    return pokemonToFilter;
  }, [infiniteQuery.data, typeQuery.data, searchQuery, selectedTypes]);

  // Determine loading and error states
  const isLoading = selectedTypes.length > 0 ? typeQuery.isLoading : infiniteQuery.isLoading;
  const error = selectedTypes.length > 0 ? typeQuery.error : infiniteQuery.error;

  return {
    filteredPokemon,
    isLoading,
    error,
    fetchNextPage: infiniteQuery.fetchNextPage,
    hasNextPage: infiniteQuery.hasNextPage,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
    isUsingTypeFilter: selectedTypes.length > 0
  };
};
