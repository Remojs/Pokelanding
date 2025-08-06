import { useState } from 'react';
import styles from './GameBoyHeader.module.css';
import ThemeSelector from './ThemeSelector';

export const GameBoyHeader = ({ onMenuToggle, isMenuOpen }) => {
  const [isGlowing, setIsGlowing] = useState(false);

  return (
    <header className={`${styles.header} ${styles.scanlines}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Logo and Title */}
          <div className={styles.leftSection}>
            <div 
              className={styles.logoIcon}
              onClick={() => setIsGlowing(!isGlowing)}
            >
              <img 
                src="/pokeball.svg" 
                alt="Pokeball" 
                className={styles.pokeballIcon}
              />
            </div>
            <div className={styles.titleSection}>
              <h1>Pokédex 8-Bit</h1>
              <p>Game Boy Classic Edition</p>
            </div>
          </div>

          {/* Right side controls */}
          <div className={styles.rightSection}>
            {/* Theme Selector con z-index alto */}
            <ThemeSelector />
            
            {/* Status indicator */}
            <div className={styles.statusIndicator}>
              <div className={styles.statusDot}></div>
              <span className={styles.statusText}>Online</span>
            </div>

            {/* Menu Toggle Button - Only show on mobile */}
            <button
              onClick={onMenuToggle}
              className={`${styles.menuButton} ${styles.mobileOnly}`}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameBoyHeader;