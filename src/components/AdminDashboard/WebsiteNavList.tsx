import React from 'react';
import type { WebsiteNavItem } from '../../types/product';
import { useWebsiteNavMutations } from '../../hooks/queries/useWebsiteNavMutations';
import styles from './WebsiteNavList.module.css';

interface WebsiteNavListProps {
  navItems: WebsiteNavItem[];
  loading?: boolean;
  error?: string | null;
  onEdit?: (item: WebsiteNavItem) => void;
  onRefresh?: () => void;
}

export const WebsiteNavList: React.FC<WebsiteNavListProps> = ({
  navItems,
  loading = false,
  error = null,
  onEdit,
  onRefresh,
}) => {
  const { deleteWebsiteNavItem, updateWebsiteNavItem } = useWebsiteNavMutations();

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este elemento de navegación?')) {
      try {
        await deleteWebsiteNavItem.mutateAsync(id);
        onRefresh?.();
      } catch (error) {
        console.error('Error deleting website navigation item:', error);
      }
    }
  };

  const handleToggleEnabled = async (item: WebsiteNavItem) => {
    try {
      await updateWebsiteNavItem.mutateAsync({
        id: item.id,
        data: {
          title: item.title,
          url: item.url,
          type: item.type,
          enabled: !item.enabled,
          order: item.order,
          openInNewTab: item.openInNewTab,
        },
      });
      onRefresh?.();
    } catch (error) {
      console.error('Error toggling website navigation item:', error);
    }
  };

  const handleMoveUp = async (item: WebsiteNavItem) => {
    const currentIndex = navItems.findIndex(nav => nav.id === item.id);
    if (currentIndex <= 0) return;

    const previousItem = navItems[currentIndex - 1];
    
    try {
      await Promise.all([
        updateWebsiteNavItem.mutateAsync({
          id: item.id,
          data: {
            title: item.title,
            url: item.url,
            type: item.type,
            enabled: item.enabled,
            order: previousItem.order,
            openInNewTab: item.openInNewTab,
          },
        }),
        updateWebsiteNavItem.mutateAsync({
          id: previousItem.id,
          data: {
            title: previousItem.title,
            url: previousItem.url,
            type: previousItem.type,
            enabled: previousItem.enabled,
            order: item.order,
            openInNewTab: previousItem.openInNewTab,
          },
        }),
      ]);
      onRefresh?.();
    } catch (error) {
      console.error('Error moving website navigation item up:', error);
    }
  };

  const handleMoveDown = async (item: WebsiteNavItem) => {
    const currentIndex = navItems.findIndex(nav => nav.id === item.id);
    if (currentIndex >= navItems.length - 1) return;

    const nextItem = navItems[currentIndex + 1];
    
    try {
      await Promise.all([
        updateWebsiteNavItem.mutateAsync({
          id: item.id,
          data: {
            title: item.title,
            url: item.url,
            type: item.type,
            enabled: item.enabled,
            order: nextItem.order,
            openInNewTab: item.openInNewTab,
          },
        }),
        updateWebsiteNavItem.mutateAsync({
          id: nextItem.id,
          data: {
            title: nextItem.title,
            url: nextItem.url,
            type: nextItem.type,
            enabled: nextItem.enabled,
            order: item.order,
            openInNewTab: nextItem.openInNewTab,
          },
        }),
      ]);
      onRefresh?.();
    } catch (error) {
      console.error('Error moving website navigation item down:', error);
    }
  };

  const getTypeLabel = (type: 'internal' | 'external' | 'category') => {
    switch (type) {
      case 'internal':
        return 'Página Interna';
      case 'external':
        return 'Enlace Externo';
      case 'category':
        return 'Categoría';
      default:
        return type;
    }
  };

  const getTypeIcon = (type: 'internal' | 'external' | 'category') => {
    switch (type) {
      case 'internal':
        return '🏠';
      case 'external':
        return '🔗';
      case 'category':
        return '📂';
      default:
        return '❓';
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando navegación del sitio web...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (navItems.length === 0) {
    return <div className={styles.empty}>No hay elementos de navegación configurados.</div>;
  }

  const sortedItems = [...navItems].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.listContainer}>
      <div className={styles.previewSection}>
        <h3>Vista Previa de la Navegación</h3>
        <div className={styles.preview}>
          <div className={styles.previewNav}>
            {sortedItems
              .filter(item => item.enabled)
              .map(item => (
                <span key={item.id} className={styles.previewItem}>
                  {getTypeIcon(item.type)} {item.title}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {sortedItems.map((item, index) => (
          <div key={item.id} className={styles.listItem}>
            <div className={styles.itemInfo}>
              <div className={styles.itemHeader}>
                <h3 className={styles.itemTitle}>
                  {getTypeIcon(item.type)} {item.title}
                </h3>
                <div className={styles.badges}>
                  <span className={styles.typeBadge}>{getTypeLabel(item.type)}</span>
                  <span className={`${styles.status} ${item.enabled ? styles.enabled : styles.disabled}`}>
                    {item.enabled ? 'Habilitado' : 'Deshabilitado'}
                  </span>
                  {item.type === 'external' && item.openInNewTab && (
                    <span className={styles.newTabBadge}>Nueva Pestaña</span>
                  )}
                </div>
              </div>
              <div className={styles.itemDetails}>
                <span className={styles.url}>URL: {item.url}</span>
                <span className={styles.order}>Orden: {item.order}</span>
              </div>
            </div>
            
            <div className={styles.actions}>
              <div className={styles.orderActions}>
                <button
                  onClick={() => handleMoveUp(item)}
                  disabled={index === 0 || updateWebsiteNavItem.isPending}
                  className={styles.orderButton}
                  title="Mover arriba"
                >
                  ↑
                </button>
                <button
                  onClick={() => handleMoveDown(item)}
                  disabled={index === sortedItems.length - 1 || updateWebsiteNavItem.isPending}
                  className={styles.orderButton}
                  title="Mover abajo"
                >
                  ↓
                </button>
              </div>
              
              <button
                onClick={() => handleToggleEnabled(item)}
                disabled={updateWebsiteNavItem.isPending}
                className={`${styles.toggleButton} ${item.enabled ? styles.toggleDisable : styles.toggleEnable}`}
              >
                {item.enabled ? 'Deshabilitar' : 'Habilitar'}
              </button>
              
              <button
                onClick={() => onEdit?.(item)}
                className={styles.editButton}
              >
                Editar
              </button>
              
              <button
                onClick={() => handleDelete(item.id)}
                disabled={deleteWebsiteNavItem.isPending}
                className={styles.deleteButton}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};