import React, { useState, useEffect } from 'react';
import { useCreateCountdownTimer, useUpdateCountdownTimer } from '../../hooks/queries';
import type { CountdownTimer, CountdownTimerFormData } from '../../types/product';
import styles from './CountdownTimerForm.module.css';

interface CountdownTimerFormProps {
  timer?: CountdownTimer | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CountdownTimerForm: React.FC<CountdownTimerFormProps> = ({
  timer,
  onSuccess,
  onCancel,
}) => {
  const createTimer = useCreateCountdownTimer();
  const updateTimer = useUpdateCountdownTimer();
  
  const [formData, setFormData] = useState<CountdownTimerFormData>({
    title: '',
    startDate: new Date(),
    endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    isActive: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (timer) {
      setFormData({
        title: timer.title,
        startDate: timer.startDate,
        endDate: timer.endDate,
        isActive: timer.isActive,
      });
    }
  }, [timer]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (formData.endDate <= formData.startDate) {
      newErrors.endDate = 'La fecha de fin debe ser posterior a la fecha de inicio';
    }

    if (formData.startDate < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      newErrors.startDate = 'La fecha de inicio no puede ser más de 24 horas en el pasado';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (timer) {
        await updateTimer.mutateAsync({
          id: timer.id,
          data: formData,
        });
      } else {
        await createTimer.mutateAsync(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving countdown timer:', error);
      alert('Error al guardar el contador');
    }
  };

  const handleInputChange = (field: keyof CountdownTimerFormData, value: string | boolean | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatDateForInput = (date: Date) => {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
      .toISOString()
      .slice(0, 16);
  };

  const parseInputDate = (dateString: string) => {
    return new Date(dateString);
  };

  const isLoading = createTimer.isPending || updateTimer.isPending;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Información General</h3>
          
          <div className={styles.field}>
            <label htmlFor="title" className={styles.label}>
              Título del Contador *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
              placeholder="Ej: Flash Sale Ends In"
              disabled={isLoading}
            />
            {errors.title && <span className={styles.error}>{errors.title}</span>}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Configuración de Fechas</h3>
          
          <div className={styles.fieldGroup}>
            <div className={styles.field}>
              <label htmlFor="startDate" className={styles.label}>
                Fecha de Inicio *
              </label>
              <input
                type="datetime-local"
                id="startDate"
                value={formatDateForInput(formData.startDate)}
                onChange={(e) => handleInputChange('startDate', parseInputDate(e.target.value))}
                className={`${styles.input} ${errors.startDate ? styles.inputError : ''}`}
                disabled={isLoading}
              />
              {errors.startDate && <span className={styles.error}>{errors.startDate}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="endDate" className={styles.label}>
                Fecha de Fin *
              </label>
              <input
                type="datetime-local"
                id="endDate"
                value={formatDateForInput(formData.endDate)}
                onChange={(e) => handleInputChange('endDate', parseInputDate(e.target.value))}
                className={`${styles.input} ${errors.endDate ? styles.inputError : ''}`}
                disabled={isLoading}
              />
              {errors.endDate && <span className={styles.error}>{errors.endDate}</span>}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Estado</h3>
          
          <div className={styles.field}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => handleInputChange('isActive', e.target.checked)}
                className={styles.checkbox}
                disabled={isLoading}
              />
              <span className={styles.checkboxText}>
                Activar contador (solo un contador puede estar activo a la vez)
              </span>
            </label>
            <p className={styles.helper}>
              Si activas este contador, se desactivarán automáticamente todos los otros contadores.
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : timer ? 'Actualizar Contador' : 'Crear Contador'}
          </button>
        </div>
      </form>
    </div>
  );
};