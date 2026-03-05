import React from 'react';
import styles from './PokemonDetail.module.css';
import { getTypeTheme, TYPE_NAMES_JP, POKEMON_NAMES_JP } from '../../shared/utils/pokemonTypes.js';

// ===== Decorative SVG Elements =====

function PixelStar({ size = 12, color = '#fff', delay = 0 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      className={styles.star}
      style={{ animationDelay: `${delay}s`, color, position: 'static' }}
      fill="currentColor"
    >
      <path d="M6 0L7 4H11L8 7L9 11L6 9L3 11L4 7L1 4H5L6 0Z" />
    </svg>
  );
}

function PixelDiamond({ size = 8, color = '#fff', delay = 0 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      className={styles.star}
      style={{ animationDelay: `${delay}s`, color, position: 'static' }}
      fill="currentColor"
    >
      <path d="M4 0L8 4L4 8L0 4Z" />
    </svg>
  );
}

function PixelCross({ size = 10, color = '#fff' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      stroke={color}
      strokeWidth={1.5}
    >
      <line x1="2" y1="2" x2="8" y2="8" />
      <line x1="8" y1="2" x2="2" y2="8" />
    </svg>
  );
}

export function Pokeball({ size = 40, color = '#fff', bgColor = '#000' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="18" stroke={color} strokeWidth="2" />
      <line x1="2" y1="20" x2="38" y2="20" stroke={color} strokeWidth="2" />
      <circle cx="20" cy="20" r="6" stroke={color} strokeWidth="2" fill={bgColor} />
      <circle cx="20" cy="20" r="3" fill={color} />
    </svg>
  );
}

function ScatteredStars({ color, count = 8 }) {
  const positions = [
    { top: '8%', left: '5%' },
    { top: '15%', right: '8%' },
    { top: '35%', left: '3%' },
    { top: '55%', right: '5%' },
    { top: '70%', left: '7%' },
    { top: '85%', right: '10%' },
    { top: '25%', left: '92%' },
    { top: '45%', left: '2%' },
    { top: '65%', right: '3%' },
    { top: '90%', left: '12%' },
  ];

  return (
    <>
      {positions.slice(0, count).map((pos, i) => (
        <div key={i} style={{ position: 'absolute', zIndex: 20, ...pos }}>
          {i % 3 === 0 ? (
            <PixelStar size={i % 2 === 0 ? 14 : 10} color={color} delay={i * 0.4} />
          ) : i % 3 === 1 ? (
            <PixelDiamond size={i % 2 === 0 ? 10 : 7} color={color} delay={i * 0.3} />
          ) : (
            <PixelCross size={i % 2 === 0 ? 12 : 8} color={color} />
          )}
        </div>
      ))}
    </>
  );
}

// ===== Stat Bars =====

const STAT_LABELS = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  special_attack: 'SP.A',
  special_defense: 'SP.D',
  speed: 'SPD',
};

const STAT_ORDER = ['hp', 'attack', 'defense', 'special_attack', 'special_defense', 'speed'];

function StatBars({ stats, accentColor, textColor, bgColor }) {
  return (
    <div className={styles.statBars}>
      {STAT_ORDER.map((key) => {
        const value = stats[key] ?? 0;
        return (
          <div key={key} className={styles.statRow}>
            <span className={styles.statLabel} style={{ color: textColor }}>
              {STAT_LABELS[key]}
            </span>
            <div
              className={styles.statBarTrack}
              style={{ backgroundColor: bgColor }}
            >
              <div
                className={styles.statBarFill}
                style={{
                  width: `${Math.min((value / 255) * 100, 100)}%`,
                  backgroundColor: accentColor,
                }}
              />
              <div className={styles.statBarPixels}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.statBarPixelStep}
                    style={{ borderColor: bgColor }}
                  />
                ))}
              </div>
            </div>
            <span className={styles.statValue} style={{ color: textColor }}>
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ===== Helpers =====

/**
 * Convert stats array (from transformPokemonData) to stats object
 * Input: [{ stat: { name: 'hp' }, base_stat: 45 }, ...]
 * Output: { hp: 45, attack: ..., ... }
 */
function statsArrayToObject(statsArray) {
  if (!Array.isArray(statsArray)) return statsArray;
  const map = {
    hp: 'hp',
    attack: 'attack',
    defense: 'defense',
    'special-attack': 'special_attack',
    'special-defense': 'special_defense',
    speed: 'speed',
  };
  const obj = { hp: 0, attack: 0, defense: 0, special_attack: 0, special_defense: 0, speed: 0 };
  statsArray.forEach(({ stat, base_stat }) => {
    const key = map[stat.name];
    if (key) obj[key] = base_stat;
  });
  return obj;
}

// ===== Main PokemonDetail Component =====

export function PokemonDetail({ pokemon, onClose }) {
  const theme = getTypeTheme(pokemon.first_type);
  const pokemonId = String(pokemon.ID || pokemon.id || 0).padStart(3, '0');
  const japaneseName = POKEMON_NAMES_JP[pokemon.name?.toLowerCase()] || pokemon.name;

  // Support both formats: array (from transform) and object (from original API)
  const statsObj = statsArrayToObject(pokemon.stats);

  const totalStats = Object.values(statsObj).reduce((a, b) => a + b, 0);

  // Sunburst background using conic-gradient
  const sunburstBg = buildSunburst(theme.rayColor1, theme.rayColor2);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.poster}
        style={{ backgroundColor: theme.bgDark, color: theme.text }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className={styles.closeButton}
          style={{ color: theme.accent }}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Scanline overlay */}
        <div className={styles.scanlineOverlay}>
          <div className={styles.scanlineInner} />
        </div>

        {/* Scattered stars */}
        <ScatteredStars color={theme.accent} count={10} />

        {/* ===== TOP: NAME HEADER ===== */}
        <div className={styles.topSection} style={{ backgroundColor: theme.bgDark }}>
          <div className={styles.pokemonNumber} style={{ color: theme.accent }}>
            No. {pokemonId}
          </div>
          <h1
            className={styles.pokemonNameEn}
            style={{
              color: theme.accent,
              textShadow: `3px 3px 0px ${theme.accentDark}`,
            }}
          >
            {pokemon.name}
          </h1>
          <p className={styles.pokemonNameJp} style={{ color: theme.accent }}>
            {japaneseName}
          </p>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className={styles.mainContent}>
          {/* Left: Pokemon artwork */}
          <div className={styles.imagePanel}>
            {/* Sunburst */}
            <div
              className={styles.sunburst}
              style={{ background: sunburstBg, opacity: 0.3 }}
            />
            {/* Color overlay */}
            <div
              className={styles.sunburstColorOverlay}
              style={{ backgroundColor: theme.bg, opacity: 0.4 }}
            />
            {/* Halftone texture */}
            <div
              className={styles.halftoneOverlay}
              style={{ color: theme.textDark }}
            />
            {/* Pokemon image */}
            <div className={styles.imageWrapper}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className={styles.pokemonImage}
              />
            </div>
            {/* Pokeball corner deco */}
            <div className={styles.pokeballCorner}>
              <Pokeball size={50} color={theme.accent} bgColor={theme.bgDark} />
            </div>
          </div>

          {/* Right: info panel */}
          <div
            className={styles.infoPanel}
            style={{ backgroundColor: theme.accentDark }}
          >
            {/* Type badge */}
            <div>
              <span
                className={styles.typeBadge}
                style={{ borderColor: theme.accent, color: theme.accent }}
              >
                {TYPE_NAMES_JP[pokemon.first_type] || pokemon.first_type}
                <span className={styles.typeBadgeSecondary}>{pokemon.first_type}</span>
              </span>
            </div>

            {/* Divider */}
            <div className={styles.divider} style={{ backgroundColor: theme.accent }} />

            {/* Height / Weight */}
            <div className={styles.physicalInfo}>
              <div className={styles.physicalItem}>
                <span className={styles.physicalLabel} style={{ color: theme.accent }}>
                  Height
                </span>
                <span className={styles.physicalValue} style={{ color: theme.accent }}>
                  {pokemon.height}
                </span>
              </div>
              <div className={styles.physicalItem}>
                <span className={styles.physicalLabel} style={{ color: theme.accent }}>
                  Weight
                </span>
                <span className={styles.physicalValue} style={{ color: theme.accent }}>
                  {pokemon.weight}
                </span>
              </div>
            </div>

            {/* Ability */}
            {pokemon.ability && (
              <div className={styles.abilitySection}>
                <span className={styles.abilityLabel} style={{ color: theme.accent }}>
                  Ability
                </span>
                <span className={styles.abilityValue} style={{ color: theme.accent }}>
                  {pokemon.ability.replace(/-/g, ' ')}
                </span>
              </div>
            )}

            {/* Deco pokeball */}
            <div className={styles.pokeballDecoMt}>
              <Pokeball size={60} color={theme.accent} bgColor={theme.accentDark} />
            </div>
          </div>
        </div>

        {/* ===== STATS SECTION ===== */}
        <div className={styles.statsSection} style={{ backgroundColor: theme.bgDark }}>
          <div className={styles.statsHeader}>
            <span className={styles.statsTitle} style={{ color: theme.accent }}>
              Base Stats
            </span>
            <div
              className={styles.statsDivider}
              style={{ backgroundColor: theme.accent }}
            />
          </div>

          <StatBars
            stats={statsObj}
            accentColor={theme.accent}
            textColor={theme.accent}
            bgColor={theme.accentDark}
          />

          <div className={styles.statsTotal}>
            <span className={styles.statsTotalLabel} style={{ color: theme.accent }}>
              Total
            </span>
            <span className={styles.statsTotalValue} style={{ color: theme.accent }}>
              {totalStats}
            </span>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className={styles.footer} style={{ backgroundColor: theme.accent }}>
          <span className={styles.footerType} style={{ color: theme.bgDark }}>
            {TYPE_NAMES_JP[pokemon.first_type]} Type
          </span>
          <div className={styles.footerRight}>
            <Pokeball size={16} color={theme.bgDark} bgColor={theme.accent} />
            <span className={styles.footerNumber} style={{ color: theme.bgDark }}>
              #{pokemonId}
            </span>
          </div>
        </div>

        {/* Noise texture */}
        <div className={styles.noiseOverlay} />
      </div>
    </div>
  );
}

// ===== Sunburst helper =====
function buildSunburst(color1, color2) {
  const stops = [];
  for (let i = 0; i < 36; i++) {
    const deg1 = i * 10;
    const deg2 = i * 10 + 10;
    const c = i % 2 === 0 ? color1 : color2;
    stops.push(`${c} ${deg1}deg`);
    stops.push(`${c} ${deg2}deg`);
  }
  return `conic-gradient(from 0deg, ${stops.join(', ')})`;
}

export default PokemonDetail;
