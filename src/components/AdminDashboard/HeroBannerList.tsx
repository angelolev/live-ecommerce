import React from 'react';
import { useDeleteHeroBanner } from '../../hooks/queries';
import type { HeroBanner } from '../../types/product';
import styles from './HeroBannerList.module.css';

interface HeroBannerListProps {
  heroBanners: HeroBanner[];
  loading: boolean;
  error: string | null;
  onEdit: (heroBanner: HeroBanner) => void;
  onRefresh: () => void;
}

export const HeroBannerList: React.FC<HeroBannerListProps> = ({
  heroBanners,
  loading,
  error,
  onEdit,
  onRefresh,
}) => {
  const deleteMutation = useDeleteHeroBanner();

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este hero banner?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          onRefresh();
        },
      });
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando hero banners...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>Error: {error}</div>
        <button onClick={onRefresh} className={styles.retryButton}>
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (heroBanners.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No hay hero banners creados aún.</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.grid}>
        {heroBanners.map((heroBanner) => (
          <div key={heroBanner.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>{heroBanner.title}</h3>
              <span className={`${styles.badge} ${heroBanner.isActive ? styles.activeBadge : styles.inactiveBadge}`}>
                {heroBanner.isActive ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            
            <div className={styles.cardContent}>
              <p className={styles.cardSubtitle}>{heroBanner.subtitle}</p>
              <div className={styles.cardDetails}>
                <div className={styles.detail}>
                  <strong>Botón:</strong> {heroBanner.buttonText}
                </div>
                <div className={styles.detail}>
                  <strong>Enlace:</strong> {heroBanner.buttonLink}
                </div>
                {heroBanner.backgroundImageUrl && (
                  <div className={styles.imagePreview}>
                    <img 
                      src={heroBanner.backgroundImageUrl} 
                      alt={heroBanner.title}
                      className={styles.previewImage}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className={styles.cardMeta}>
                <small>
                  Creado: {new Date(heroBanner.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
            
            <div className={styles.cardActions}>
              <button
                onClick={() => onEdit(heroBanner)}
                className={styles.editButton}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(heroBanner.id)}
                className={styles.deleteButton}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};