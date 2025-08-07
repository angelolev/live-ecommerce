import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import { FilterSidebar } from '../FilterSidebar/FilterSidebar';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import { useCategories, useProductsByCategory } from '../../hooks/queries';
import type { ProductFilters } from '../../types/product';
import styles from './CategoryPage.module.css';

export const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  
  // Local filter state (excluding category which comes from URL)
  const [filters, setFilters] = useState<Omit<ProductFilters, 'category'>>({
    sortBy: 'newest'
  });
  
  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  
  // Find the current category
  const currentCategory = useMemo(() => {
    if (!categoryName || !categories.length) return null;
    return categories.find(cat => 
      cat.name.toLowerCase().replace(/\s+/g, '-') === categoryName.toLowerCase()
    );
  }, [categories, categoryName]);
  
  // Fetch products for this category - this is the key fix!
  // The query won't run until we have a valid category name
  const {
    data: products = [], 
    isLoading: productsLoading, 
    error: productsError,
    refetch
  } = useProductsByCategory(
    currentCategory?.name || '',
    filters
  );

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  
  const updateFilters = (newFilters: Partial<Omit<ProductFilters, 'category'>>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const resetFilters = () => {
    setFilters({ sortBy: 'newest' });
  };
  
  // Show loading while categories are loading
  if (categoriesLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.loadingState}>
              <p>Cargando...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // If category doesn't exist, show 404
  if (categoryName && !currentCategory && categories.length > 0) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.notFound}>
              <h1>Categoría no encontrada</h1>
              <p>La categoría "{categoryName}" no existe.</p>
              <Link to="/" className={styles.backLink}>
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Breadcrumbs */}
          <nav className={styles.breadcrumbs} aria-label="Navegación de migas de pan">
            <Link to="/" className={styles.breadcrumbLink}>Inicio</Link>
            <span className={styles.breadcrumbSeparator}>›</span>
            <span className={styles.breadcrumbCurrent}>
              {currentCategory?.name || 'Cargando...'}
            </span>
          </nav>

          {/* Category Header */}
          {currentCategory && (
            <div className={styles.categoryHeader}>
              <div className={styles.categoryInfo}>
                <h1 className={styles.categoryTitle}>{currentCategory.name}</h1>
                <p className={styles.categoryDescription}>
                  Explora nuestra colección de {currentCategory.name.toLowerCase()}
                </p>
              </div>
              <div className={styles.categoryImage}>
                <img 
                  src={currentCategory.imageUrl} 
                  alt={currentCategory.name}
                  className={styles.categoryImg}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className={styles.content}>
            {/* Sidebar with Filters */}
            <FilterSidebar
              filters={{ ...filters, category: currentCategory?.name }}
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
                emptyStateMessage={
                  currentCategory 
                    ? `No se encontraron productos en la categoría "${currentCategory.name}".`
                    : 'No se encontraron productos.'
                }
              />

              {/* Load More Button (for future pagination) */}
              {products.length > 0 && (
                <div className={styles.loadMore}>
                  <button 
                    className={styles.loadMoreButton}
                    onClick={() => refetch()}
                    disabled={productsLoading}
                  >
                    {productsLoading ? 'Cargando...' : 'Actualizar resultados'}
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