import React, { useState } from 'react';
import type { ProductFilters, SortOption } from '../../types/product';
import styles from './FilterSidebar.module.css';

interface FilterSidebarProps {
  filters: ProductFilters;
  onFiltersChange: (filters: Partial<ProductFilters>) => void;
  onResetFilters: () => void;
  productCount: number;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'oldest', label: 'Más antiguos' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name-asc', label: 'Nombre: A-Z' },
  { value: 'name-desc', label: 'Nombre: Z-A' }
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange,
  onResetFilters,
  productCount
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice?.toString() || '',
    max: filters.maxPrice?.toString() || ''
  });

  const handleSortChange = (sortBy: SortOption) => {
    onFiltersChange({ sortBy });
  };

  const handlePriceChange = (field: 'min' | 'max', value: string) => {
    setPriceRange(prev => ({ ...prev, [field]: value }));
    
    // Apply filter when user stops typing (debounce would be better)
    const numValue = parseFloat(value) || undefined;
    if (field === 'min') {
      onFiltersChange({ minPrice: numValue });
    } else {
      onFiltersChange({ maxPrice: numValue });
    }
  };

  const handleSearchChange = (searchTerm: string) => {
    onFiltersChange({ searchTerm });
  };

  const hasActiveFilters = filters.minPrice || filters.maxPrice || filters.searchTerm || 
    (filters.sortBy && filters.sortBy !== 'newest');

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Filtros</h3>
        <button 
          className={styles.toggleButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expandir filtros' : 'Contraer filtros'}
        >
          {isCollapsed ? '⮟' : '⮝'}
        </button>
      </div>

      {!isCollapsed && (
        <div className={styles.content}>
          <div className={styles.results}>
            <span className={styles.resultCount}>
              {productCount} producto{productCount !== 1 ? 's' : ''} encontrado{productCount !== 1 ? 's' : ''}
            </span>
            {hasActiveFilters && (
              <button 
                className={styles.resetButton}
                onClick={onResetFilters}
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Search Filter */}
          <div className={styles.filterGroup}>
            <label htmlFor="search" className={styles.label}>
              Buscar productos
            </label>
            <input
              id="search"
              type="text"
              value={filters.searchTerm || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Buscar por nombre o descripción..."
              className={styles.searchInput}
            />
          </div>

          {/* Sort Filter */}
          <div className={styles.filterGroup}>
            <label htmlFor="sort" className={styles.label}>
              Ordenar por
            </label>
            <select
              id="sort"
              value={filters.sortBy || 'newest'}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className={styles.select}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className={styles.filterGroup}>
            <label className={styles.label}>Rango de precio</label>
            <div className={styles.priceRange}>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                placeholder="Mín"
                className={styles.priceInput}
                min="0"
                step="0.01"
              />
              <span className={styles.priceSeparator}>-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                placeholder="Máx"
                className={styles.priceInput}
                min="0"
                step="0.01"
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className={styles.activeFilters}>
              <h4 className={styles.activeFiltersTitle}>Filtros activos:</h4>
              <div className={styles.filterChips}>
                {filters.searchTerm && (
                  <div className={styles.filterChip}>
                    <span>Búsqueda: "{filters.searchTerm}"</span>
                    <button 
                      onClick={() => handleSearchChange('')}
                      className={styles.removeChip}
                      aria-label="Remover filtro de búsqueda"
                    >
                      ×
                    </button>
                  </div>
                )}
                {filters.minPrice && (
                  <div className={styles.filterChip}>
                    <span>Precio mín: ${filters.minPrice}</span>
                    <button 
                      onClick={() => {
                        setPriceRange(prev => ({ ...prev, min: '' }));
                        onFiltersChange({ minPrice: undefined });
                      }}
                      className={styles.removeChip}
                      aria-label="Remover filtro de precio mínimo"
                    >
                      ×
                    </button>
                  </div>
                )}
                {filters.maxPrice && (
                  <div className={styles.filterChip}>
                    <span>Precio máx: ${filters.maxPrice}</span>
                    <button 
                      onClick={() => {
                        setPriceRange(prev => ({ ...prev, max: '' }));
                        onFiltersChange({ maxPrice: undefined });
                      }}
                      className={styles.removeChip}
                      aria-label="Remover filtro de precio máximo"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};