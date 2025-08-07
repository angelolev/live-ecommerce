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
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }

    try {
      setDeletingId(id);
      await productService.deleteProduct(id);
      onRefresh();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Error al eliminar el producto');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando productos...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No se encontraron productos.</p>
        <p>¡Añade tu primer producto para empezar!</p>
      </div>
    );
  }

  return (
    <div className={styles.productList}>
      <div className={styles.table}>
        <div className={styles.header}>
          <div className={styles.cell}>Imagen</div>
          <div className={styles.cell}>Nombre</div>
          <div className={styles.cell}>Categoría</div>
          <div className={styles.cell}>Precio</div>
          <div className={styles.cell}>Acciones</div>
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
                  Editar
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(product.id)}
                  disabled={deletingId === product.id}
                >
                  {deletingId === product.id ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};