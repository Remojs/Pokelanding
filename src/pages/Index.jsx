import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GameBoyHeader from '../shared/components/GameBoyHeader';
import GameBoySidebar from '../shared/components/GameBoySidebar';
import PokemonGrid from '../features/pokemon/PokemonGrid';
import styles from './Index.module.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('id-asc');

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        {/* Background pattern */}
        <div className={styles.backgroundPattern} />

        {/* Main Layout */}
        <div className={styles.layout}>
          {/* Header */}
          <GameBoyHeader 
            onMenuToggle={handleMenuToggle}
            isMenuOpen={isSidebarOpen}
          />

          {/* Main Content Area */}
          <div className={styles.mainContent}>
            {/* Sidebar */}
            <GameBoySidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedTypes={selectedTypes}
              onTypeToggle={handleTypeToggle}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              onClearFilters={handleClearFilters}
            />

            {/* Main Content */}
            <main className={styles.mainSection}>
              <PokemonGrid
                searchQuery={searchQuery}
                selectedTypes={selectedTypes}
                sortBy={sortBy}
              />
            </main>
          </div>
        </div>

        {/* Global scanlines overlay */}
        <div className={styles.globalScanlines} />
      </div>
    </QueryClientProvider>
  );
};

export default Index;