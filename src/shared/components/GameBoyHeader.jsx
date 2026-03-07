import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './GameBoyHeader.module.css';
import ThemeSelector from './ThemeSelector';

export const GameBoyHeader = ({ onMenuToggle, isMenuOpen }) => {
  const [isGlowing, setIsGlowing] = useState(false);
  const location = useLocation();

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
            {/* Navigation */}
            <nav className={styles.nav}>
              <Link to="/" className={`${styles.navLink} ${location.pathname === '/' ? styles.navLinkActive : ''}`}>
                POKÉDEX
              </Link>
              <Link to="/team-builder" className={`${styles.navLink} ${location.pathname === '/team-builder' ? styles.navLinkActive : ''}`}>
                TEAM BUILDER
              </Link>
            </nav>

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