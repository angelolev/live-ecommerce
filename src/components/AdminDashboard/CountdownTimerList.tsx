import React from 'react';
import { useDeleteCountdownTimer } from '../../hooks/queries';
import type { CountdownTimer } from '../../types/product';
import styles from './CountdownTimerList.module.css';

interface CountdownTimerListProps {
  countdownTimers: CountdownTimer[];
  loading: boolean;
  error: string | null;
  onEdit: (timer: CountdownTimer) => void;
  onRefresh: () => void;
}

export const CountdownTimerList: React.FC<CountdownTimerListProps> = ({
  countdownTimers,
  loading,
  error,
  onEdit,
  onRefresh,
}) => {
  const deleteCountdownTimer = useDeleteCountdownTimer();

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este contador?')) {
      try {
        await deleteCountdownTimer.mutateAsync(id);
        onRefresh();
      } catch (error) {
        console.error('Error deleting countdown timer:', error);
        alert('Error al eliminar el contador');
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isTimerActive = (timer: CountdownTimer) => {
    const now = new Date();
    return timer.isActive && now >= timer.startDate && now <= timer.endDate;
  };

  if (loading) {
    return <div className={styles.loading}>Cargando contadores...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error: {error}</p>
        <button onClick={onRefresh} className={styles.retryButton}>
          Reintentar
        </button>
      </div>
    );
  }

  if (countdownTimers.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay contadores de tiempo configurados.</p>
        <p>Crea uno nuevo para empezar.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {countdownTimers.map((timer) => (
          <div key={timer.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.title}>{timer.title}</h3>
              <div className={styles.status}>
                {isTimerActive(timer) ? (
                  <span className={styles.activeStatus}>Activo</span>
                ) : timer.isActive ? (
                  <span className={styles.inactiveStatus}>Programado</span>
                ) : (
                  <span className={styles.disabledStatus}>Desactivado</span>
                )}
              </div>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.dateInfo}>
                <div className={styles.dateItem}>
                  <span className={styles.dateLabel}>Inicio:</span>
                  <span className={styles.dateValue}>{formatDate(timer.startDate)}</span>
                </div>
                <div className={styles.dateItem}>
                  <span className={styles.dateLabel}>Fin:</span>
                  <span className={styles.dateValue}>{formatDate(timer.endDate)}</span>
                </div>
              </div>

              <div className={styles.metadata}>
                <p className={styles.createdAt}>
                  Creado: {formatDate(timer.createdAt)}
                </p>
              </div>
            </div>

            <div className={styles.cardActions}>
              <button
                onClick={() => onEdit(timer)}
                className={styles.editButton}
                disabled={deleteCountdownTimer.isPending}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(timer.id)}
                className={styles.deleteButton}
                disabled={deleteCountdownTimer.isPending}
              >
                {deleteCountdownTimer.isPending ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};