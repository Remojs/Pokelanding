import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTeams } from './useTeams';
import { pokemonApi } from '../../shared/services/pokemonApi';
import { transformPokemonData } from '../../shared/utils/pokemonUtils';
import styles from './TeamBuilder.module.css';

// ─── Type colour palette ───────────────────────────────────────────────────
const TYPE_COLORS = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', fairy: '#EE99AC',
};

const STAT_COLORS = {
  hp: '#FF5959', attack: '#F5AC78', defense: '#FAE078',
  'special-attack': '#9DB7F5', 'special-defense': '#A7DB8D', speed: '#FA92B2',
};

const STAT_LABELS = {
  hp: 'HP', attack: 'ATK', defense: 'DEF',
  'special-attack': 'SP.A', 'special-defense': 'SP.D', speed: 'SPD',
};

// ─── Helper: turn custom-API pokemon → PokemonBasic ───────────────────────
function toPokemonBasic(raw) {
  const t = transformPokemonData(raw);
  return {
    id: t.id,
    name: t.name,
    sprite: t.sprites.other['official-artwork'].front_default,
    types: t.types.map((x) => x.type.name),
  };
}

// ─── TeamsList ─────────────────────────────────────────────────────────────
function TeamsList({ teams, currentTeam, onCreateTeam, onSelectTeam, onDeleteTeam }) {
  const [newName, setNewName] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  function handleCreate() {
    if (newName.trim()) {
      onCreateTeam(newName.trim());
      setNewName('');
      setShowCreate(false);
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>SAVED TEAMS</span>
        <button className={styles.newBtn} onClick={() => setShowCreate((v) => !v)}>
          {showCreate ? '✕' : '+ NEW'}
        </button>
      </div>

      {showCreate && (
        <div className={styles.createForm}>
          <input
            className={styles.nameInput}
            placeholder="Team name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            autoFocus
          />
          <button className={styles.createBtn} onClick={handleCreate}>CREATE</button>
        </div>
      )}

      <div className={styles.teamsList}>
        {teams.length === 0 ? (
          <p className={styles.emptyMsg}>No teams yet</p>
        ) : (
          teams.map((team) => (
            <div
              key={team.id}
              className={`${styles.teamItem} ${currentTeam?.id === team.id ? styles.teamItemActive : ''}`}
              onClick={() => onSelectTeam(team)}
            >
              <div className={styles.teamMiniSprites}>
                {team.pokemon.slice(0, 3).map((poke, i) =>
                  poke ? (
                    <img key={i} src={poke.sprite} alt={poke.name} className={styles.miniSprite} />
                  ) : (
                    <div key={i} className={styles.miniSpriteEmpty} />
                  )
                )}
              </div>
              <div className={styles.teamItemInfo}>
                <span className={styles.teamItemName}>{team.name}</span>
                <span className={styles.teamItemCount}>
                  {team.pokemon.filter(Boolean).length}/6
                </span>
              </div>
              <button
                className={styles.deleteBtn}
                onClick={(e) => { e.stopPropagation(); onDeleteTeam(team.id); }}
                title="Delete team"
              >
                🗑
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── TeamSlots ─────────────────────────────────────────────────────────────
function TeamSlots({ pokemon, selectedIndex, onSelect, onRemove }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>MY TEAM</span>
      </div>
      <div className={styles.slotsList}>
        {pokemon.map((poke, index) => {
          const mainType = poke?.types?.[0] || 'normal';
          const bg = TYPE_COLORS[mainType] || TYPE_COLORS.normal;
          const isSelected = selectedIndex === index;
          return (
            <button
              key={index}
              className={`${styles.slot} ${isSelected ? styles.slotSelected : ''} ${poke ? styles.slotFilled : styles.slotEmpty}`}
              onClick={() => onSelect(index)}
              style={poke ? { background: `linear-gradient(135deg, ${bg}25 0%, transparent 100%)` } : {}}
            >
              {poke ? (
                <>
                  <div className={styles.slotSpriteWrap} style={{ borderColor: bg }}>
                    <img src={poke.sprite} alt={poke.name} className={styles.slotSprite} />
                  </div>
                  <div className={styles.slotInfo}>
                    <span className={styles.slotName}>{poke.name}</span>
                    <div className={styles.slotTypes}>
                      {poke.types.map((t) => (
                        <span key={t} className={styles.typeBadge} style={{ background: TYPE_COLORS[t] || '#777' }}>
                          {t.slice(0, 3).toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={(e) => { e.stopPropagation(); onRemove(index); }}
                    title="Remove"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <span className={styles.slotEmptyLabel}>SLOT {index + 1}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── TeamPokemonCard ───────────────────────────────────────────────────────
function TeamPokemonCard({ pokemon, isLoading, onAddToTeam, canAdd }) {
  if (isLoading) {
    return (
      <div className={`${styles.cardPanel} ${styles.cardCentered}`}>
        <div className={styles.loadingPokeball}>◎</div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className={`${styles.cardPanel} ${styles.cardCentered}`}>
        <div className={styles.emptyCard}>
          <div className={styles.questionMark}>?</div>
          <p className={styles.selectHint}>Select a Pokémon<br />from the grid below</p>
        </div>
      </div>
    );
  }

  const t = transformPokemonData(pokemon);
  const mainType = t.types[0]?.type.name || 'normal';
  const bg = TYPE_COLORS[mainType] || TYPE_COLORS.normal;
  const sprite = t.sprites.other['official-artwork'].front_default;

  return (
    <div className={styles.cardPanel} style={{ '--card-type-color': bg }}>
      <div className={styles.cardBg} style={{ background: `linear-gradient(135deg, ${bg}30 0%, transparent 60%)` }} />

      <div className={styles.cardContent}>
        {/* Header */}
        <div className={styles.cardHeader}>
          <div>
            <span className={styles.cardNumber}>N°{t.id.toString().padStart(4, '0')}</span>
            <h2 className={styles.cardName}>{t.name.toUpperCase()}</h2>
          </div>
          <div className={styles.cardTypes}>
            {t.types.map((tp) => (
              <span key={tp.type.name} className={styles.typeTag} style={{ background: TYPE_COLORS[tp.type.name] || '#777' }}>
                {tp.type.name.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Sprite */}
        <div className={styles.cardSpriteWrap}>
          <div className={styles.cardSpriteGlow} style={{ background: bg }} />
          <img src={sprite} alt={t.name} className={styles.cardSprite} />
        </div>

        {/* Stats */}
        <div className={styles.cardStats}>
          <p className={styles.statsTitle}>BASE STATS</p>
          {t.stats.map((s) => (
            <div key={s.stat.name} className={styles.statRow}>
              <span className={styles.statLabel}>{STAT_LABELS[s.stat.name] || s.stat.name}</span>
              <div className={styles.statBarTrack}>
                <div
                  className={styles.statBar}
                  style={{
                    width: `${Math.min((s.base_stat / 255) * 100, 100)}%`,
                    background: STAT_COLORS[s.stat.name] || '#9b6dff',
                  }}
                />
              </div>
              <span className={styles.statValue}>{s.base_stat}</span>
            </div>
          ))}
        </div>

        {/* Extra info */}
        <div className={styles.cardExtra}>
          {pokemon.height != null && (
            <div className={styles.extraItem}>
              <span className={styles.extraLabel}>HEIGHT</span>
              <span className={styles.extraValue}>{(pokemon.height / 10).toFixed(1)}m</span>
            </div>
          )}
          {pokemon.weight != null && (
            <div className={styles.extraItem}>
              <span className={styles.extraLabel}>WEIGHT</span>
              <span className={styles.extraValue}>{(pokemon.weight / 10).toFixed(1)}kg</span>
            </div>
          )}
          {pokemon.ability && (
            <div className={styles.extraItem}>
              <span className={styles.extraLabel}>ABILITY</span>
              <span className={styles.extraValue}>{pokemon.ability.replace('-', ' ')}</span>
            </div>
          )}
        </div>

        {/* Add to Team button */}
        {canAdd && (
          <button className={styles.addToTeamBtn} onClick={onAddToTeam}>
            + ADD TO TEAM
          </button>
        )}
      </div>
    </div>
  );
}

// ─── TeamGrid (pokemon selector) ──────────────────────────────────────────
const GRID_PAGE_SIZE = 100;
const TOTAL_POKEMON = 1010;

function TeamGrid({ onSelect }) {
  const [allPokemon, setAllPokemon] = useState([]);
  const [search, setSearch] = useState('');
  const [loadingGrid, setLoadingGrid] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoadingGrid(true);
      try {
        const data = await pokemonApi.getPokemonList(0, GRID_PAGE_SIZE);
        if (!cancelled) {
          setAllPokemon(data.results);
          setOffset(GRID_PAGE_SIZE);
          setHasMore(GRID_PAGE_SIZE < TOTAL_POKEMON);
        }
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setLoadingGrid(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  async function loadMore() {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const data = await pokemonApi.getPokemonList(offset, GRID_PAGE_SIZE);
      setAllPokemon((prev) => [...prev, ...data.results]);
      const newOffset = offset + GRID_PAGE_SIZE;
      setOffset(newOffset);
      setHasMore(newOffset < TOTAL_POKEMON);
    } catch {
      // silently fail
    } finally {
      setLoadingMore(false);
    }
  }

  const filtered = allPokemon.filter((poke) => {
    const s = search.toLowerCase();
    const id = String(poke.ID || poke.id || '');
    return poke.name?.toLowerCase().includes(s) || id.includes(s);
  });

  if (loadingGrid) {
    return (
      <div className={styles.gridLoading}>
        <div className={styles.loadingPokeball}>◎</div>
        <p className={styles.loadingText}>Loading Pokédex...</p>
      </div>
    );
  }

  return (
    <div className={styles.gridPanel}>
      <div className={styles.gridSearchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.gridSearch}
          placeholder="Search by name or #..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className={styles.gridCount}>{filtered.length} shown</span>
      </div>
      <div className={styles.pokemonGrid}>
        {filtered.map((poke) => {
          const id = poke.ID || poke.id;
          const type1 = poke.first_type || 'normal';
          const type2 = poke.second_type;
          const bg = TYPE_COLORS[type1] || TYPE_COLORS.normal;
          const sprite = poke.image;
          return (
            <button
              key={id}
              className={styles.gridItem}
              style={{ background: `linear-gradient(135deg, ${bg}20 0%, transparent 100%)` }}
              onClick={() => onSelect(id)}
              title={poke.name}
            >
              <img
                src={sprite}
                alt={poke.name}
                className={styles.gridSprite}
                loading="lazy"
              />
              <span className={styles.gridName}>{poke.name}</span>
              <div className={styles.gridTypes}>
                <span className={styles.gridTypeBadge} style={{ background: TYPE_COLORS[type1] || '#777' }}>
                  {type1.slice(0, 3).toUpperCase()}
                </span>
                {type2 && (
                  <span className={styles.gridTypeBadge} style={{ background: TYPE_COLORS[type2] || '#777' }}>
                    {type2.slice(0, 3).toUpperCase()}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {!search && hasMore && (
        <div className={styles.loadMoreWrap}>
          <button
            className={styles.loadMoreBtn}
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? '◎ LOADING...' : `+ LOAD MORE (${offset}/${TOTAL_POKEMON})`}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── TeamBuilder (main orchestrator) ──────────────────────────────────────
export function TeamBuilder() {
  const {
    teams, currentTeam, isLoaded,
    createTeam, deleteTeam,
    addPokemonToTeam, removePokemonFromTeam, selectTeam,
  } = useTeams();

  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  // Fetch detailed pokemon data when a grid item is clicked
  const { data: fetchedPokemon, isLoading: pokemonLoading } = useQuery({
    queryKey: ['tb-pokemon', selectedPokemonId],
    queryFn: () => pokemonApi.getPokemon(selectedPokemonId),
    enabled: !!selectedPokemonId,
    staleTime: 10 * 60 * 1000,
  });

  const handlePokemonSelect = useCallback((id) => {
    if (!currentTeam) return;
    setSelectedPokemonId(id);
    setSelectedSlotIndex(null);
  }, [currentTeam]);

  const handleSlotSelect = useCallback((index) => {
    const poke = currentTeam?.pokemon[index];
    setSelectedSlotIndex(index);
    if (poke) {
      setSelectedPokemonId(poke.id);
    }
  }, [currentTeam]);

  const handleAddToTeam = useCallback(() => {
    if (!fetchedPokemon) return;
    const basic = toPokemonBasic(fetchedPokemon);
    addPokemonToTeam(basic);
  }, [fetchedPokemon, addPokemonToTeam]);

  // Can add if fetched pokemon is not already in the team and there's space
  const canAdd = !!fetchedPokemon && !!currentTeam && (
    currentTeam.pokemon.some((p) => p === null) &&
    !currentTeam.pokemon.some((p) => p?.id === (fetchedPokemon.ID || fetchedPokemon.id))
  );

  if (!isLoaded) {
    return (
      <div className={styles.fullLoading}>
        <div className={styles.loadingPokeball}>◎</div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.builder}>
      {/* Top row: Teams | Card | Slots */}
      <div className={styles.topRow}>
        {/* Left – Teams List */}
        <div className={styles.leftCol}>
          <TeamsList
            teams={teams}
            currentTeam={currentTeam}
            onCreateTeam={createTeam}
            onSelectTeam={selectTeam}
            onDeleteTeam={deleteTeam}
          />
        </div>

        {/* Center – Pokemon Card */}
        <div className={styles.centerCol}>
          {!currentTeam ? (
            <div className={`${styles.cardPanel} ${styles.cardCentered}`}>
              <div className={styles.emptyCard}>
                <div className={styles.pokeballBig}>◉</div>
                <h2 className={styles.welcomeTitle}>TEAM BUILDER</h2>
                <p className={styles.welcomeText}>
                  Create or select a team to start<br />building your roster
                </p>
              </div>
            </div>
          ) : (
            <TeamPokemonCard
              pokemon={fetchedPokemon}
              isLoading={pokemonLoading && !!selectedPokemonId}
              onAddToTeam={handleAddToTeam}
              canAdd={canAdd}
            />
          )}
        </div>

        {/* Right – Team Slots */}
        <div className={styles.rightCol}>
          {currentTeam ? (
            <TeamSlots
              pokemon={currentTeam.pokemon}
              selectedIndex={selectedSlotIndex}
              onSelect={handleSlotSelect}
              onRemove={removePokemonFromTeam}
            />
          ) : (
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>MY TEAM</span>
              </div>
              <p className={styles.emptyMsg}>Select a team first</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom row: Pokemon grid */}
      {currentTeam && (
        <div className={styles.bottomRow}>
          <div className={styles.gridHeader}>
            <span className={styles.panelTitle}>POKÉDEX — SELECT A POKÉMON</span>
          </div>
          <TeamGrid onSelect={handlePokemonSelect} />
        </div>
      )}
    </div>
  );
}

export default TeamBuilder;
