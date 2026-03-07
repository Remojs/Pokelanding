"use client";

import { useState, useCallback } from "react";
import { PokemonGrid } from "@/components/pokemon-grid";
import { PokemonCard } from "@/components/pokemon-card";
import { TeamSlots } from "@/components/team-slots";
import { TeamsList } from "@/components/teams-list";
import { useTeams } from "@/hooks/use-teams";
import { usePokemonDetails, getPokemonBasic } from "@/hooks/use-pokemon";
import { Sparkles, Zap } from "lucide-react";

export function TeamBuilder() {
  const {
    teams,
    currentTeam,
    isLoaded,
    createTeam,
    deleteTeam,
    addPokemonToTeam,
    removePokemonFromTeam,
    selectTeam,
  } = useTeams();

  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);

  const { pokemon: fetchedPokemon } = usePokemonDetails(selectedPokemonId);

  const handlePokemonSelect = useCallback((id: number) => {
    if (!currentTeam) return;
    
    setSelectedPokemonId(id);
  }, [currentTeam]);

  const handleSlotSelect = useCallback((index: number) => {
    const pokemon = currentTeam?.pokemon[index];
    setSelectedSlotIndex(index);
    if (pokemon) {
      setSelectedPokemonId(pokemon.id);
    }
  }, [currentTeam]);

  // Add pokemon to team when fetched
  const handleAddToTeam = useCallback(() => {
    if (fetchedPokemon && currentTeam) {
      const basic = getPokemonBasic(fetchedPokemon);
      addPokemonToTeam(basic);
    }
  }, [fetchedPokemon, currentTeam, addPokemonToTeam]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent flex items-center justify-center border-2 border-primary">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-press-start)' }}>
                  Team Builder
                </h1>
                <p className="text-xs text-muted-foreground">Build your perfect team</p>
              </div>
            </div>
            {currentTeam && (
              <div className="px-4 py-2 bg-primary/10 border-2 border-primary/30">
                <p className="text-sm font-bold text-primary">{currentTeam.name}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Top Row - Teams List, Pokemon Details, Team Slots */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel - Teams List */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3">
            <div className="bg-card border-2 border-border p-4">
              <TeamsList
                teams={teams}
                currentTeam={currentTeam}
                onCreateTeam={createTeam}
                onSelectTeam={selectTeam}
                onDeleteTeam={deleteTeam}
              />
            </div>
          </div>

          {/* Center Panel - Pokemon Details */}
          <div className="col-span-12 md:col-span-5 lg:col-span-6">
            {!currentTeam ? (
              <div className="h-[400px] md:h-[500px] flex flex-col items-center justify-center bg-card border-2 border-border p-8">
                <div className="text-center max-w-sm">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border-2 border-primary/30">
                    <Sparkles className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-press-start)' }}>
                    Welcome!
                  </h2>
                  <p className="text-muted-foreground text-sm mb-6">
                    Create a new team or select an existing one to start building your perfect Pokemon team.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[400px] md:h-[500px]">
                <PokemonCard pokemonId={selectedPokemonId} />
              </div>
            )}
          </div>

          {/* Right Panel - Team Slots */}
          <div className="col-span-12 md:col-span-3 lg:col-span-3">
            {currentTeam && (
              <div className="bg-card border-2 border-border p-4">
                <TeamSlots
                  pokemon={currentTeam.pokemon}
                  selectedIndex={selectedSlotIndex}
                  onSelect={handleSlotSelect}
                  onRemove={removePokemonFromTeam}
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row - Pokemon Grid (full width, 12 columns) */}
        {currentTeam && (
          <div className="bg-card border-2 border-border p-4">
            <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-press-start)' }}>
              Pokedex
            </h3>
            <PokemonGrid onSelect={(id) => {
              handlePokemonSelect(id);
              // Fetch and add to team
              fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(res => res.json())
                .then(data => {
                  const basic = getPokemonBasic(data);
                  addPokemonToTeam(basic);
                });
            }} />
          </div>
        )}
      </main>
    </div>
  );
}
