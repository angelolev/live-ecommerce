import React from 'react';
import { categoryService } from '../../services/categoryService';
import type { Category } from '../../types/product';
import styles from './CategoryList.module.css';

interface CategoryListProps {
  categories: Category[];
  loading: boolean;
  error: string | null;
  onEdit: (category: Category) => void;
  onRefresh: () => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  loading,
  error,
  onEdit,
  onRefresh,
}) => {
  const handleDelete = async (category: Category) => {
    const confirmed = window.confirm(
      `¿Estás seguro de que quieres eliminar "${category.name}"? Esta acción no se puede deshacer.`
    );
    
    if (!confirmed) return;

    try {
      await categoryService.deleteCategory(category.id);
      onRefresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar la categoría');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando categorías...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <button onClick={onRefresh} className={styles.retryButton}>
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No se encontraron categorías. Crea tu primera categoría para empezar.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                src={category.imageUrl}
                alt={category.name}
                className={styles.image}
                onError={(e) => {
                  e.currentTarget.src = '/images/placeholder.png';
                }}
              />
            </div>
            
            <div className={styles.content}>
              <h3 className={styles.name}>{category.name}</h3>
              <p className={styles.date}>
                Creado: {category.createdAt.toLocaleDateString()}
              </p>
              
              <div className={styles.actions}>
                <button
                  onClick={() => onEdit(category)}
                  className={styles.editButton}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(category)}
                  className={styles.deleteButton}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};