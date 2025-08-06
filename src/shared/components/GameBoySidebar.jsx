import { PokemonFilters } from '../../features/pokemon/PokemonFilters';
import styles from './GameBoySidebar.module.css';

export const GameBoySidebar = ({
  isOpen,
  onClose,
  searchQuery,
  onSearchChange,
  selectedTypes,
  onTypeToggle,
  onClearFilters
}) => {
  return (
    <>
      {/* Backdrop - Mobile Only */}
      {isOpen && (
        <div 
          className={styles.backdrop}
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        ${styles.sidebar} 
        ${isOpen ? styles.sidebarOpen : ''} 
        ${styles.sidebarDesktop}
        ${styles.scanlines}
      `}>
        {/* Sidebar Header - Mobile Only */}
        <div className={styles.mobileHeader}>
          <h2 className={styles.mobileHeaderTitle}>Filters</h2>
          <button
            onClick={onClose}
            className={styles.closeButton}
          >
            ✕
          </button>
        </div>

        {/* Filter Content */}
        <div className={styles.content}>
          <PokemonFilters
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            selectedTypes={selectedTypes}
            onTypeToggle={onTypeToggle}
            onClearFilters={onClearFilters}
          />
        </div>

        {/* 8-bit decoration at bottom */}
        <div className={styles.bottomDecoration}>
          <div className={styles.decorationGrid}>
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={styles.decorationPixel}
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default GameBoySidebar;