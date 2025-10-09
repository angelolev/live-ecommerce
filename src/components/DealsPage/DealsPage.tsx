import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import { FilterSidebar } from '../FilterSidebar/FilterSidebar';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import { useDealsProducts } from '../../hooks/queries/useProducts';
import type { ProductFilters, Product } from '../../types/product';
import styles from './DealsPage.module.css';

export const DealsPage: React.FC = () => {
  const navigate = useNavigate();

  // Local filter state
  const [filters, setFilters] = useState<Omit<ProductFilters, 'category'>>({
    sortBy: 'newest'
  });

  // Fetch products on offer
  const {
    data: allDealsProducts = [],
    isLoading: productsLoading,
    error: productsError,
    refetch
  } = useDealsProducts();

  // Apply client-side filters
  const products = React.useMemo(() => {
    let filtered = [...allDealsProducts];

    // Apply price filters
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(product => {
        const price = product.offerPrice || product.price;
        return price >= filters.minPrice!;
      });
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => {
        const price = product.offerPrice || product.price;
        return price <= filters.maxPrice!;
      });
    }

    // Apply search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => (a.offerPrice || a.price) - (b.offerPrice || b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => (b.offerPrice || b.price) - (a.offerPrice || a.price));
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'oldest':
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    return filtered;
  }, [allDealsProducts, filters]);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const updateFilters = (newFilters: Partial<Omit<ProductFilters, 'category'>>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({ sortBy: 'newest' });
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumbs} aria-label="Navegación de migas de pan">
            <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
            <span className={styles.breadcrumbSeparator}>›</span>
            <span className={styles.breadcrumbCurrent}>Ofertas</span>
          </nav>

          {/* Page Header */}
          <div className={styles.pageHeader}>
            <div className={styles.headerContent}>
              <h1 className={styles.pageTitle}>Ofertas Especiales</h1>
              <p className={styles.pageDescription}>
                Descubre nuestras mejores ofertas y aprovecha los descuentos especiales
              </p>
            </div>
            <div className={styles.offerBadge}>
              <span className={styles.badgeIcon}>🔥</span>
              <span className={styles.badgeText}>{allDealsProducts.length} Ofertas Activas</span>
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.content}>
            {/* Sidebar with Filters */}
            <FilterSidebar
              filters={filters}
              onFiltersChange={updateFilters}
              onResetFilters={resetFilters}
              productCount={products.length}
            />

            {/* Products Grid */}
            <div className={styles.productsSection}>
              <ProductGrid
                products={products}
                loading={productsLoading}
                error={productsError?.message || null}
                onProductClick={handleProductClick}
                emptyStateMessage="No hay ofertas disponibles en este momento."
              />

              {/* Refresh Button */}
              {products.length > 0 && (
                <div className={styles.refreshSection}>
                  <button
                    className={styles.refreshButton}
                    onClick={() => refetch()}
                    disabled={productsLoading}
                  >
                    {productsLoading ? 'Cargando...' : 'Actualizar ofertas'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
