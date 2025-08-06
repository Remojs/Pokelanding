import styles from './PokemonCard.module.css';
import { formatPokemonId, getPokemonSprite } from '../../shared/utils/pokemonUtils.js';

export const PokemonCard = ({ pokemon, onClick }) => {
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

  const getStatByName = (statName) => {
    const stat = pokemon.stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };

  const stats = [
    { name: 'HP', value: getStatByName('hp') },
    { name: 'ATK', value: getStatByName('attack') },
    { name: 'DEF', value: getStatByName('defense') },
    { name: 'SPA', value: getStatByName('special-attack') },
    { name: 'SPD', value: getStatByName('special-defense') },
    { name: 'SPE', value: getStatByName('speed') },
  ];

  return (
    <div 
      className={`${styles.pokemonCard} ${styles.scanlines}`}
      onClick={onClick}
    >
      {/* Pokemon ID */}
      <div className={styles.pokemonId}>
        {formatPokemonId(pokemon.id)}
      </div>
      
      {/* Pokemon Image */}
      <div className={styles.imageContainer}>
        <img
          src={pokemon.image || getPokemonSprite(pokemon) || '/placeholder.svg'}
          alt={pokemon.name}
          className={styles.pokemonImage}
          loading="lazy"
        />
      </div>
      
      {/* Pokemon Name */}
      <h3 className={styles.pokemonName}>
        {pokemon.name}
      </h3>
      
      {/* Pokemon Types */}
      <div className={styles.typesContainer}>
        {pokemon.types.map((type) => (
          <span
            key={type.type.name}
            className={`${styles.typeBadge} ${getTypeClass(type.type.name)}`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
      
      {/* Pokemon Stats - All 6 stats */}
      <div className={styles.statsContainer}>
        {stats.map((stat) => (
          <div key={stat.name} className={styles.statItem}>
            <span className={styles.statLabel}>{stat.name}</span>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        ))}
      </div>
      
      {/* 8-bit style corner decorations */}
      <div className={`${styles.cornerDecorations} ${styles.topRight}`}></div>
      <div className={`${styles.cornerDecorations} ${styles.bottomLeft}`}></div>
    </div>
  );
};