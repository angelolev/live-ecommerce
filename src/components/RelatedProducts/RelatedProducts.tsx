import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductsByCategory } from '../../hooks/queries/useProducts';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './RelatedProducts.module.css';

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProductId,
  category
}) => {
  const navigate = useNavigate();
  const { data: products = [], isLoading, error } = useProductsByCategory(category);

  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 2);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (isLoading) {
    return (
      <div className={styles.relatedProducts}>
        <h2 className={styles.title}>Productos Relacionados</h2>
        <div className={styles.loading}>
          <p>Cargando productos relacionados...</p>
        </div>
      </div>
    );
  }

  if (error || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.relatedProducts}>
      <h2 className={styles.title}>Productos Relacionados</h2>
      <div className={styles.productsGrid}>
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={handleProductClick}
          />
        ))}
      </div>
    </div>
  );
};