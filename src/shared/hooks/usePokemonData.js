/**
 * Custom hook for managing Pokemon data fetching and filtering
 */
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { pokemonApi } from '../services/pokemonApi.js';
import { transformPokemonData } from '../utils/pokemonUtils.js';

export const usePokemonData = (searchQuery, selectedTypes, sortBy) => {
  // Query for search results (when there's a search query)
  const searchQuery_trimmed = searchQuery?.trim() || '';
  
  const searchResultsQuery = useQuery({
    queryKey: ['pokemon-search', searchQuery_trimmed],
    queryFn: async () => {
      if (!searchQuery_trimmed) return [];
      
      const searchResults = await pokemonApi.searchPokemon(searchQuery_trimmed);
      return searchResults.map(transformPokemonData);
    },
    enabled: searchQuery_trimmed.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
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

  // Query for general Pokemon list (when no search)
  const infiniteQuery = useInfiniteQuery({
    queryKey: ['pokemon', sortBy],
    queryFn: async ({ pageParam = 0 }) => {
      let pokemonListData;
      
      if (sortBy === 'id-desc') {
        // For descending order, start from the end (1010) and go backwards
        const startId = Math.max(1, 1010 - pageParam);
        const endId = Math.max(1, startId - 19); // Get 20 Pokemon going backwards
        pokemonListData = await pokemonApi.getPokemonList(endId - 1, startId - endId + 1);
        // Reverse the results to maintain descending order
        pokemonListData.results = pokemonListData.results.reverse();
      } else {
        // For ascending order (default), normal pagination
        pokemonListData = await pokemonApi.getPokemonList(pageParam, 20);
      }
      
      // Transform the Pokemon data to match component expectations
      const transformedPokemon = pokemonListData.results.map(transformPokemonData);
      
      return {
        pokemon: transformedPokemon,
        nextOffset: pageParam + 20,
        hasMore: sortBy === 'id-desc' ? (1010 - pageParam) > 20 : pokemonListData.next !== null
      };
    },
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextOffset : undefined,
    initialPageParam: 0,
    enabled: !searchQuery_trimmed && selectedTypes.length === 0, // Only fetch when no search query and no type filters
  });

  // Apply sorting and combine data
  const filteredPokemon = useMemo(() => {
    let pokemonToSort = [];

    if (searchQuery_trimmed) {
      // Use search results
      pokemonToSort = searchResultsQuery.data || [];
    } else if (selectedTypes.length > 0) {
      // Use type-filtered data
      pokemonToSort = typeQuery.data || [];
    } else {
      // Use infinite scroll data
      pokemonToSort = infiniteQuery.data ? 
        infiniteQuery.data.pages.flatMap(page => page.pokemon) : [];
    }

    // Apply sorting
    const sortedPokemon = [...pokemonToSort].sort((a, b) => {
      switch (sortBy) {
        case 'id-desc':
          return b.id - a.id; // High to Low
        case 'id-asc':
        default:
          return a.id - b.id; // Low to High (default)
      }
    });

    return sortedPokemon;
  }, [infiniteQuery.data, searchResultsQuery.data, typeQuery.data, searchQuery_trimmed, selectedTypes, sortBy]);

  // Determine loading and error states
  const isLoading = searchQuery_trimmed 
    ? searchResultsQuery.isLoading 
    : selectedTypes.length > 0 
      ? typeQuery.isLoading 
      : infiniteQuery.isLoading;
      
  const error = searchQuery_trimmed 
    ? searchResultsQuery.error 
    : selectedTypes.length > 0 
      ? typeQuery.error 
      : infiniteQuery.error;

  return {
    filteredPokemon,
    isLoading,
    error,
    fetchNextPage: infiniteQuery.fetchNextPage,
    hasNextPage: !searchQuery_trimmed && selectedTypes.length === 0 && infiniteQuery.hasNextPage,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
    isUsingSearch: !!searchQuery_trimmed,
    isUsingTypeFilter: selectedTypes.length > 0
  };
};
