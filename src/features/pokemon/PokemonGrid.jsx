import { useState, useRef, useCallback } from 'react';
import { usePokemonData } from '../../shared/hooks/usePokemonData.js';
import { PokemonCard } from './PokemonCard';
import { PokemonDetail } from './PokemonDetail';
import styles from './PokemonGrid.module.css';

export const PokemonGrid = ({ searchQuery, selectedTypes, sortBy }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const observerRef = useRef(null);

  const {
    filteredPokemon,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isUsingSearch,
    isUsingTypeFilter
  } = usePokemonData(searchQuery, selectedTypes, sortBy);

  // Infinite scroll observer - only for general Pokemon list
  const lastPokemonRef = useCallback((node) => {
    if (isFetchingNextPage) return;
    if (isUsingSearch || isUsingTypeFilter) return; // Don't use infinite scroll with search or type filters
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !searchQuery.trim()) {
        fetchNextPage();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isFetchingNextPage, hasNextPage, isUsingSearch, isUsingTypeFilter, searchQuery, fetchNextPage]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingIcon}>
            <img 
              src="/pokeball-hd.svg" 
              alt="Loading..." 
              className={styles.loadingPokeball}
            />
          </div>
          <div className={styles.loadingTitle}>
            Loading Pokédex...
          </div>
          <div className={styles.loadingSubtitle}>
            {isUsingSearch 
              ? `Searching for "${searchQuery}"...`
              : isUsingTypeFilter 
                ? `Searching for ${selectedTypes.join(', ')} type Pokémon...`
                : "Catching 'em all from the digital world!"
            }
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <div className={styles.errorTitle}>ERROR</div>
          <div className={styles.errorMessage}>
            Failed to load Pokémon data. Check your connection!
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header with results count */}
      <div className={`${styles.header} ${styles.scanlines}`}>
        <div className={styles.headerContent}>
          <div>
            <h2 className={styles.headerTitle}>
              Pokédex Database
            </h2>
            <p className={styles.headerSubtitle}>
              {filteredPokemon.length} Pokémon found
              {searchQuery && ` for "${searchQuery}"`}
              {selectedTypes.length > 0 && ` with types: ${selectedTypes.join(', ')}`}
            </p>
          </div>
          <div className={styles.headerIcon}>
            <img 
              src="/pokeball-hd.svg" 
              alt="Pokeball" 
              className={styles.pokeballIcon}
            />
          </div>
        </div>
      </div>

      {/* Pokemon Grid */}
      {filteredPokemon.length > 0 ? (
        <div className={styles.grid}>
          {filteredPokemon.map((pokemon, index) => (
            <div
              key={pokemon.id}
              ref={index === filteredPokemon.length - 1 ? lastPokemonRef : null}
            >
              <PokemonCard
                pokemon={pokemon}
                onClick={() => setSelectedPokemon(pokemon)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>
          <div className={styles.noResultsIcon}>
            ?
          </div>
          <h3 className={styles.noResultsTitle}>No Pokémon Found</h3>
          <p className={styles.noResultsMessage}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Loading more indicator - only for infinite scroll */}
      {isFetchingNextPage && !isUsingSearch && !isUsingTypeFilter && (
        <div className={styles.loadMoreContainer}>
          <div className={styles.loadMoreContent}>
            ⟳
            <span className={styles.loadMoreText}>Loading more Pokémon...</span>
          </div>
        </div>
      )}

      {/* Pokemon Detail Modal */}
      {selectedPokemon && (
        <PokemonDetail
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};

export default PokemonGrid;