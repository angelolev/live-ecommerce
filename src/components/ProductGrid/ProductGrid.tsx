import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import type { Product } from '../../types/product';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onProductClick: (productId: string) => void;
  emptyStateMessage?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  error,
  onProductClick,
  emptyStateMessage = 'No se encontraron productos.'
}) => {
  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.loadingSpinner}></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorState}>
        <p>Error al cargar productos: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className={styles.retryButton}
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📦</div>
        <p>{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};