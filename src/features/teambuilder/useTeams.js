import { useState, useEffect, useCallback } from 'react';

const TEAMS_STORAGE_KEY = 'pokemon-teams';

export function useTeams() {
  const [teams, setTeams] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(TEAMS_STORAGE_KEY);
    if (stored) {
      try {
        const parsedTeams = JSON.parse(stored);
        setTeams(parsedTeams);
      } catch {
        // ignore parse errors
      }
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage whenever teams change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams));
    }
  }, [teams, isLoaded]);

  const createTeam = useCallback((name) => {
    const newTeam = {
      id: crypto.randomUUID(),
      name,
      pokemon: [null, null, null, null, null, null],
      createdAt: Date.now(),
    };
    setTeams((prev) => [...prev, newTeam]);
    setCurrentTeam(newTeam);
    return newTeam;
  }, []);

  const deleteTeam = useCallback((teamId) => {
    setTeams((prev) => prev.filter((t) => t.id !== teamId));
    setCurrentTeam((prev) => (prev?.id === teamId ? null : prev));
  }, []);

  const addPokemonToTeam = useCallback(
    (pokemon) => {
      if (!currentTeam) return;
      const emptySlotIndex = currentTeam.pokemon.findIndex((p) => p === null);
      if (emptySlotIndex === -1) return;
      const updatedPokemon = [...currentTeam.pokemon];
      updatedPokemon[emptySlotIndex] = pokemon;
      const updatedTeam = { ...currentTeam, pokemon: updatedPokemon };
      setCurrentTeam(updatedTeam);
      setTeams((prev) => prev.map((t) => (t.id === updatedTeam.id ? updatedTeam : t)));
    },
    [currentTeam]
  );

  const removePokemonFromTeam = useCallback(
    (slotIndex) => {
      if (!currentTeam) return;
      const updatedPokemon = [...currentTeam.pokemon];
      updatedPokemon[slotIndex] = null;
      const updatedTeam = { ...currentTeam, pokemon: updatedPokemon };
      setCurrentTeam(updatedTeam);
      setTeams((prev) => prev.map((t) => (t.id === updatedTeam.id ? updatedTeam : t)));
    },
    [currentTeam]
  );

  const selectTeam = useCallback((team) => {
    // Re-sync with latest version from teams array in case it was updated
    setCurrentTeam(team);
  }, []);

  return {
    teams,
    currentTeam,
    isLoaded,
    createTeam,
    deleteTeam,
    addPokemonToTeam,
    removePokemonFromTeam,
    selectTeam,
  };
}
