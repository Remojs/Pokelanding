import React, { useState, useEffect, useRef } from 'react';
import styles from './ThemeSelector.module.css';

const ThemeSelector = () => {
  const [currentTheme, setCurrentTheme] = useState('gameboy');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const themes = [
    { 
      id: 'gameboy', 
      name: 'Game Boy Clásico', 
      primary: '#4a8a6a', 
      accent: '#d4f4d4',
      background: '#2a4a3a',
      dark: '#1a3a2a',
      border: '#6aaa8a'
    },
    { 
      id: 'fire', 
      name: 'Fuego', 
      primary: '#ff4444', 
      accent: '#ffaa44',
      background: '#4a2a2a',
      dark: '#3a1a1a',
      border: '#ff6666'
    },
    { 
      id: 'water', 
      name: 'Agua', 
      primary: '#4488ff', 
      accent: '#88ddff',
      background: '#2a3a4a',
      dark: '#1a2a3a',
      border: '#6699ff'
    },
    { 
      id: 'grass', 
      name: 'Planta', 
      primary: '#44aa44', 
      accent: '#88dd88',
      background: '#2a4a2a',
      dark: '#1a3a1a',
      border: '#66cc66'
    },
    { 
      id: 'electric', 
      name: 'Eléctrico', 
      primary: '#ffdd44', 
      accent: '#ffff88',
      background: '#4a4a2a',
      dark: '#3a3a1a',
      border: '#ffee66'
    },
    { 
      id: 'psychic', 
      name: 'Psíquico', 
      primary: '#ff44aa', 
      accent: '#ff88dd',
      background: '#4a2a4a',
      dark: '#3a1a3a',
      border: '#ff66cc'
    },
    { 
      id: 'dark', 
      name: 'Siniestro', 
      primary: '#666666', 
      accent: '#aaaaaa',
      background: '#2a2a2a',
      dark: '#1a1a1a',
      border: '#888888'
    },
    { 
      id: 'ice', 
      name: 'Hielo', 
      primary: '#88ddff', 
      accent: '#ddffff',
      background: '#2a3a4a',
      dark: '#1a2a3a',
      border: '#aaeeff'
    },
    { 
      id: 'fairy', 
      name: 'Hada', 
      primary: '#ffaadd', 
      accent: '#ffddff',
      background: '#4a2a4a',
      dark: '#3a1a3a',
      border: '#ffccee'
    }
  ];

  useEffect(() => {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('pokedex-theme') || 'gameboy';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const applyTheme = (themeId) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      // Aplicar todas las variables CSS del tema
      document.documentElement.style.setProperty('--primary-color', theme.primary);
      document.documentElement.style.setProperty('--accent-color', theme.accent);
      document.documentElement.style.setProperty('--background-color', theme.background);
      document.documentElement.style.setProperty('--dark-color', theme.dark);
      document.documentElement.style.setProperty('--border-color', theme.border);
      
      // Convertir colores a RGB para rgba()
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      };
      
      const darkRgb = hexToRgb(theme.dark);
      if (darkRgb) {
        document.documentElement.style.setProperty('--dark-color-rgb', `${darkRgb.r}, ${darkRgb.g}, ${darkRgb.b}`);
      }
      
      const borderRgb = hexToRgb(theme.border);
      if (borderRgb) {
        document.documentElement.style.setProperty('--border-color-rgb', `${borderRgb.r}, ${borderRgb.g}, ${borderRgb.b}`);
      }
      
      // También actualizar el body para cambios inmediatos
      document.body.setAttribute('data-theme', themeId);
    }
  };

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    applyTheme(themeId);
    localStorage.setItem('pokedex-theme', themeId);
    setIsOpen(false);
  };

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className={styles.themeSelector} ref={dropdownRef}>
      <button
        className={styles.themeButton}
        onClick={() => setIsOpen(!isOpen)}
        title="Cambiar tema"
      >
        <div 
          className={styles.colorPreview}
          style={{ backgroundColor: currentThemeData?.primary }}
        />
        <span className={styles.themeIcon}>🎨</span>
      </button>
      
      {isOpen && (
        <div className={styles.themeDropdown}>
          <div className={styles.themeHeader}>
            <span className={styles.headerText}>Temas</span>
          </div>
          <div className={styles.themeGrid}>
            {themes.map(theme => (
              <button
                key={theme.id}
                className={`${styles.themeOption} ${currentTheme === theme.id ? styles.active : ''}`}
                onClick={() => handleThemeChange(theme.id)}
                title={theme.name}
              >
                <div 
                  className={styles.colorSwatch}
                  style={{ backgroundColor: theme.primary }}
                />
                <div 
                  className={styles.colorSwatch}
                  style={{ backgroundColor: theme.accent }}
                />
                <span className={styles.themeName}>{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
