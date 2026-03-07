"use client";

import { useState, useEffect, useCallback } from "react";
import type { Team, PokemonBasic } from "@/lib/pokemon-types";

const TEAMS_STORAGE_KEY = "pokemon-teams";

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(TEAMS_STORAGE_KEY);
    if (stored) {
      const parsedTeams = JSON.parse(stored) as Team[];
      setTeams(parsedTeams);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams));
    }
  }, [teams, isLoaded]);

  const createTeam = useCallback((name: string) => {
    const newTeam: Team = {
      id: crypto.randomUUID(),
      name,
      pokemon: [null, null, null, null, null, null],
      createdAt: Date.now(),
    };
    setTeams((prev) => [...prev, newTeam]);
    setCurrentTeam(newTeam);
    return newTeam;
  }, []);

  const deleteTeam = useCallback((teamId: string) => {
    setTeams((prev) => prev.filter((t) => t.id !== teamId));
    if (currentTeam?.id === teamId) {
      setCurrentTeam(null);
    }
  }, [currentTeam]);

  const addPokemonToTeam = useCallback((pokemon: PokemonBasic) => {
    if (!currentTeam) return;

    const emptySlotIndex = currentTeam.pokemon.findIndex((p) => p === null);
    if (emptySlotIndex === -1) return;

    const updatedPokemon = [...currentTeam.pokemon];
    updatedPokemon[emptySlotIndex] = pokemon;

    const updatedTeam = { ...currentTeam, pokemon: updatedPokemon };
    setCurrentTeam(updatedTeam);
    setTeams((prev) =>
      prev.map((t) => (t.id === updatedTeam.id ? updatedTeam : t))
    );
  }, [currentTeam]);

  const removePokemonFromTeam = useCallback((slotIndex: number) => {
    if (!currentTeam) return;

    const updatedPokemon = [...currentTeam.pokemon];
    updatedPokemon[slotIndex] = null;

    const updatedTeam = { ...currentTeam, pokemon: updatedPokemon };
    setCurrentTeam(updatedTeam);
    setTeams((prev) =>
      prev.map((t) => (t.id === updatedTeam.id ? updatedTeam : t))
    );
  }, [currentTeam]);

  const selectTeam = useCallback((team: Team) => {
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
