import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { ProductGrid } from '../ProductGrid/ProductGrid';
import { useSearchProducts } from '../../hooks/queries/useSearchProducts';
import styles from './SearchResultsPage.module.css';

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchTerm = searchParams.get('q') || '';

  const { data: products = [], isLoading, error } = useSearchProducts(searchTerm);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              Resultados de búsqueda
            </h1>
            {searchTerm && (
              <p className={styles.searchInfo}>
                Mostrando resultados para: <strong>"{searchTerm}"</strong>
              </p>
            )}
            {!isLoading && products.length > 0 && (
              <p className={styles.resultCount}>
                {products.length} producto{products.length !== 1 ? 's' : ''} encontrado{products.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          <ProductGrid
            products={products}
            loading={isLoading}
            error={error instanceof Error ? error.message : null}
            onProductClick={handleProductClick}
            emptyStateMessage={
              searchTerm 
                ? `No se encontraron productos para "${searchTerm}"`
                : 'Ingresa un término de búsqueda para encontrar productos'
            }
          />
        </div>
      </main>
    </div>
  );
};