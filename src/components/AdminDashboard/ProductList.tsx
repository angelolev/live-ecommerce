import React, { useState } from 'react';
import { productService } from '../../services/productService';
import type { Product } from '../../types/product';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onEdit: (product: Product) => void;
  onRefresh: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  error,
  onEdit,
  onRefresh
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeletingId(id);
      await productService.deleteProduct(id);
      onRefresh();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No products found.</p>
        <p>Add your first product to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.productList}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.cell}>Image</div>
          <div className={styles.cell}>Name</div>
          <div className={styles.cell}>Category</div>
          <div className={styles.cell}>Price</div>
          <div className={styles.cell}>Actions</div>
        </div>

        {products.map((product) => (
          <div key={product.id} className={styles.row}>
            <div className={styles.cell}>
              <img 
                src={product.images[0]} 
                alt={product.name}
                className={styles.productImage}
              />
            </div>
            <div className={styles.cell}>
              <div className={styles.productName}>{product.name}</div>
              <div className={styles.productDescription}>
                {product.description.substring(0, 100)}...
              </div>
            </div>
            <div className={styles.cell}>{product.category}</div>
            <div className={styles.cell}>${product.price.toFixed(2)}</div>
            <div className={styles.cell}>
              <div className={styles.actions}>
                <button
                  className={styles.editButton}
                  onClick={() => onEdit(product)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                >
                  {deletingId === product.id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};