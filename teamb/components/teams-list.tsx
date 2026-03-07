"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Team } from "@/lib/pokemon-types";

interface TeamsListProps {
  teams: Team[];
  currentTeam: Team | null;
  onCreateTeam: (name: string) => void;
  onSelectTeam: (team: Team) => void;
  onDeleteTeam: (teamId: string) => void;
}

export function TeamsList({
  teams,
  currentTeam,
  onCreateTeam,
  onSelectTeam,
  onDeleteTeam,
}: TeamsListProps) {
  const [newTeamName, setNewTeamName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateTeam = () => {
    if (newTeamName.trim()) {
      onCreateTeam(newTeamName.trim());
      setNewTeamName("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-secondary uppercase tracking-wider" style={{ fontFamily: 'var(--font-press-start)' }}>
          Saved Teams
        </h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
              <Plus className="w-3 h-3" />
              New
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Create New Team</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Enter team name..."
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateTeam()}
                className="bg-muted border-border text-foreground"
              />
              <Button onClick={handleCreateTeam} className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                Create Team
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
        {teams.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            No teams created yet
          </p>
        ) : (
          teams.map((team) => (
            <div
              key={team.id}
              className={`group flex items-center gap-2 p-2 border-2 transition-all cursor-pointer ${
                currentTeam?.id === team.id
                  ? "border-secondary bg-secondary/10"
                  : "border-border bg-card/50 hover:bg-card"
              }`}
              onClick={() => onSelectTeam(team)}
            >
              <div className="flex -space-x-2">
                {team.pokemon.slice(0, 3).map((poke, i) =>
                  poke ? (
                    <div
                      key={i}
                      className="w-6 h-6 bg-muted border-2 border-card overflow-hidden"
                    >
                      <Image
                        src={poke.sprite}
                        alt={poke.name}
                        width={24}
                        height={24}
                        className="object-contain pixelated"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="w-6 h-6 bg-muted/50 border-2 border-card"
                    />
                  )
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground truncate">
                  {team.name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {team.pokemon.filter(Boolean).length}/6 Pokemon
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTeam(team.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/20 transition-all"
                >
                  <Trash2 className="w-3 h-3 text-destructive" />
                </button>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
