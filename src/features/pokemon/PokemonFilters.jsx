import { useState } from 'react';
import { POKEMON_TYPES } from '../../shared/services/pokemonApi.js';
import styles from './PokemonFilters.module.css';

export const PokemonFilters = ({
  searchQuery,
  onSearchChange,
  selectedTypes,
  onTypeToggle,
  onClearFilters
}) => {
  const [sortBy, setSortBy] = useState('id');

  const getTypeClass = (type) => {
    const typeMap = {
      normal: styles.typeNormal,
      fire: styles.typeFire,
      water: styles.typeWater,
      electric: styles.typeElectric,
      grass: styles.typeGrass,
      ice: styles.typeIce,
      fighting: styles.typeFighting,
      poison: styles.typePoison,
      ground: styles.typeGround,
      flying: styles.typeFlying,
      psychic: styles.typePsychic,
      bug: styles.typeBug,
      rock: styles.typeRock,
      ghost: styles.typeGhost,
      dragon: styles.typeDragon,
      dark: styles.typeDark,
      steel: styles.typeSteel,
      fairy: styles.typeFairy,
    };
    return typeMap[type] || styles.typeNormal;
  };

  return (
    <div className={`${styles.container} ${styles.scanlines}`}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.headerTitle}>Filters</h3>
        </div>
        {(searchQuery || selectedTypes.length > 0) && (
          <button
            onClick={onClearFilters}
            className={styles.clearButton}
          >
            Clear
          </button>
        )}
      </div>

      {/* Search Bar */}
      <div className={styles.section}>
        <label className={styles.sectionLabel}>
          Search Pokémon
        </label>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Enter name or ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.separator}></div>

      {/* Type Filters */}
      <div className={styles.section}>
        <label className={styles.sectionLabel}>
          Filter by Type
        </label>
        <div className={styles.typesGrid}>
          {POKEMON_TYPES.map((type) => {
            const isSelected = selectedTypes.includes(type);
            return (
              <div
                key={type}
                className={`
                  ${styles.typeBadge}
                  ${isSelected 
                    ? `${getTypeClass(type)} ${styles.typeBadgeSelected}` 
                    : styles.typeBadgeUnselected
                  }
                `}
                onClick={() => onTypeToggle(type)}
              >
                {type}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.separator}></div>

      {/* Sort Options */}
      <div className={styles.section}>
        <label className={styles.sectionLabel}>
          Sort by
        </label>
        <div className={styles.sortOptions}>
          {[
            { value: 'id', label: 'Pokédex Number' },
            { value: 'name', label: 'Name (A-Z)' },
            { value: 'type', label: 'Type' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className={`${styles.sortButton} ${sortBy === option.value ? styles.sortButtonActive : ''}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {selectedTypes.length > 0 && (
        <>
          <div className={styles.separator}></div>
          <div className={styles.section}>
            <label className={styles.sectionLabel}>
              Active Filters ({selectedTypes.length})
            </label>
            <div className={styles.activeFiltersContainer}>
              {selectedTypes.map((type) => (
                <div
                  key={type}
                  className={`${styles.activeFilterBadge} ${getTypeClass(type)}`}
                  onClick={() => onTypeToggle(type)}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* 8-bit decoration */}
      <div className={styles.decoration}>
        <div className={styles.decorationBar}></div>
      </div>

      {/* Bottom decoration */}
      <div className={styles.bottomDecoration}>
        <div className={styles.decorationGrid}>
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={styles.decorationPixel}
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};