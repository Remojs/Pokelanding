/**
 * Pokemon utility functions for custom API
 */

/**
 * Get CSS class for Pokemon type
 * @param {string} type - Pokemon type
 * @returns {string} CSS class name
 */
export const getPokemonTypeClass = (type) => {
  const typeClassMap = {
    normal: 'type-normal',
    fire: 'type-fire',
    water: 'type-water',
    electric: 'type-electric',
    grass: 'type-grass',
    ice: 'type-ice',
    fighting: 'type-fighting',
    poison: 'type-poison',
    ground: 'type-ground',
    flying: 'type-flying',
    psychic: 'type-psychic',
    bug: 'type-bug',
    rock: 'type-rock',
    ghost: 'type-ghost',
    dragon: 'type-dragon',
    dark: 'type-dark',
    steel: 'type-steel',
    fairy: 'type-fairy'
  };
  
  return typeClassMap[type?.toLowerCase()] || 'type-normal';
};

/**
 * Format Pokemon ID with leading zeros
 * @param {number} id - Pokemon ID
 * @returns {string} Formatted ID
 */
export const formatPokemonId = (id) => {
  return `#${id.toString().padStart(3, '0')}`;
};

/**
 * Get Pokemon sprite URL (using the image property from your API)
 * @param {Object} pokemon - Pokemon object
 * @param {string} variant - Sprite variant (not used with your API but kept for compatibility)
 * @returns {string} Sprite URL
 */
export const getPokemonSprite = (pokemon, variant = 'default') => {
  // Try direct image property first (from your API)
  if (pokemon?.image) {
    return pokemon.image;
  }
  
  // Fallback to sprites structure (transformed data)
  if (pokemon?.sprites?.front_default) {
    return pokemon.sprites.front_default;
  }
  
  return '';
};

/**
 * Calculate Pokemon stats total
 * @param {Object} stats - Pokemon stats object from your API
 * @returns {number} Total stats
 */
export const calculateStatsTotal = (stats) => {
  if (!stats) return 0;
  return stats.hp + stats.attack + stats.defense + stats.special_attack + stats.special_defense + stats.speed;
};

/**
 * Transform your API Pokemon data to work with existing components
 * @param {Object} pokemon - Pokemon from your API
 * @returns {Object} Transformed Pokemon object
 */
export const transformPokemonData = (pokemon) => {
  return {
    // Keep all original data
    ...pokemon,
    // Add transformed fields for compatibility
    id: pokemon.ID,
    name: pokemon.name,
    sprites: {
      front_default: pokemon.image,
      other: {
        'official-artwork': {
          front_default: pokemon.image
        }
      }
    },
    types: [
      { type: { name: pokemon.first_type } },
      ...(pokemon.second_type ? [{ type: { name: pokemon.second_type } }] : [])
    ],
    stats: [
      { stat: { name: 'hp' }, base_stat: pokemon.stats.hp },
      { stat: { name: 'attack' }, base_stat: pokemon.stats.attack },
      { stat: { name: 'defense' }, base_stat: pokemon.stats.defense },
      { stat: { name: 'special-attack' }, base_stat: pokemon.stats.special_attack },
      { stat: { name: 'special-defense' }, base_stat: pokemon.stats.special_defense },
      { stat: { name: 'speed' }, base_stat: pokemon.stats.speed }
    ]
    // height, weight, ability, image are preserved from original object
  };
};

/**
 * Get Pokemon types as array
 * @param {Object} pokemon - Pokemon object from your API
 * @returns {Array} Array of type names
 */
export const getPokemonTypes = (pokemon) => {
  const types = [pokemon.first_type];
  if (pokemon.second_type) {
    types.push(pokemon.second_type);
  }
  return types;
};
