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
      count: 1010, // Total Pokemon count (approximate)
      next: max < 1010 ? `${BASE_URL}/pokedex/between?min=${max + 1}&max=${max + limit}` : null,
      previous: min > 1 ? `${BASE_URL}/pokedex/between?min=${Math.max(1, min - limit)}&max=${min - 1}` : null
    };
  },

  /**
   * Get single Pokemon by ID
   * @param {string|number} id - Pokemon ID
   * @returns {Promise<Object>} Pokemon data
   */
  async getPokemon(id) {
    const response = await fetch(`${BASE_URL}/pokedex/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon: ${id}`);
    }
    return response.json();
  },

  /**
   * Search Pokemon by name
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching Pokemon
   */
  async searchPokemon(query) {
    try {
      // Try to get by ID first
      if (!isNaN(query)) {
        const pokemon = await this.getPokemon(query);
        return [pokemon];
      }
      
      // For name search, we'll get a range and filter
      // This is a limitation of your API - you might want to add a search endpoint
      const response = await fetch(`${BASE_URL}/pokedex/between?min=1&max=200`);
      if (!response.ok) {
        throw new Error('Failed to search Pokemon');
      }
      const data = await response.json();
      
      return data.filter(pokemon => 
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
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
    try {
      // Get all Pokemon (this might be expensive, consider adding type endpoint to your API)
      const response = await fetch(`${BASE_URL}/pokedex/between?min=1&max=1010`);
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon by type: ${type}`);
      }
      const data = await response.json();
      
      return data.filter(pokemon => 
        pokemon.first_type === type || pokemon.second_type === type
      );
    } catch (error) {
      throw new Error(`Failed to fetch Pokemon by type: ${type}`);
    }
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
