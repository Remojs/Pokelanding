/**
 * Pokemon API Service
 * Handles all interactions with your custom Pokemon API
 */

const BASE_URL = 'https://gottafetchthemall.onrender.com';

export const pokemonApi = {
  /**
   * Get paginated list of Pokemon
   * @param {number} offset - Starting position
   * @param {number} limit - Number of Pokemon to fetch
   * @returns {Promise<Array>} Pokemon array
   */
  async getPokemonList(offset = 0, limit = 20) {
    const min = offset + 1;
    const max = offset + limit;
    const response = await fetch(`${BASE_URL}/pokedex/between?min=${min}&max=${max}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokemon list');
    }
    const data = await response.json();
    
    // Transform to match expected structure
    return {
      results: data,
      count: 1025, // Total Pokemon count
      next: max < 1025 ? `${BASE_URL}/pokedex/between?min=${max + 1}&max=${max + limit}` : null,
      previous: min > 1 ? `${BASE_URL}/pokedex/between?min=${Math.max(1, min - limit)}&max=${min - 1}` : null
    };
  },

  /**
   * Get single Pokemon by ID
   * @param {string|number} id - Pokemon ID
   * @returns {Promise<Object>} Pokemon data
   */
  async getPokemon(id) {
    const response = await fetch(`${BASE_URL}/pokedex/number/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon: ${id}`);
    }
    const data = await response.json();
    return data[0]; // API returns an array with one pokemon
  },

  /**
   * Search Pokemon by name or ID
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching Pokemon
   */
  async searchPokemon(query) {
    try {
      if (!isNaN(query) && query !== '') {
        const response = await fetch(`${BASE_URL}/pokedex/number/${query}`);
        if (response.ok) return response.json(); // already an array
        return [];
      }

      const response = await fetch(`${BASE_URL}/pokedex/name/${encodeURIComponent(query)}`);
      if (!response.ok) return [];
      return response.json();
    } catch {
      return [];
    }
  },

  /**
   * Get Pokemon by type
   * Note: Your API doesn't seem to have a direct type filter,
   * so we'll get all Pokemon and filter by type
   * @param {string} type - Pokemon type
   * @returns {Promise<Array>} Array of Pokemon of that type
   */
  async getPokemonByType(type) {
    const response = await fetch(`${BASE_URL}/pokedex/type/${type}`);
    if (!response.ok) throw new Error(`Failed to fetch Pokemon by type: ${type}`);
    return response.json();
  }
};

// Pokemon type constants for easy reference
export const POKEMON_TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

// Helper function to format Pokemon ID
export const formatPokemonId = (id) => `#${id.toString().padStart(3, '0')}`;
