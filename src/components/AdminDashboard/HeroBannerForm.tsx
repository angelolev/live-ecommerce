import React, { useState, useEffect } from 'react';
import { useCreateHeroBanner, useUpdateHeroBanner } from '../../hooks/queries';
import type { HeroBanner, HeroBannerFormData } from '../../types/product';
import styles from './HeroBannerForm.module.css';

interface HeroBannerFormProps {
  heroBanner?: HeroBanner | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const HeroBannerForm: React.FC<HeroBannerFormProps> = ({
  heroBanner,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<HeroBannerFormData>({
    title: '',
    subtitle: '',
    backgroundImageUrl: '',
    buttonText: '',
    buttonLink: '',
    isActive: false,
  });

  const createMutation = useCreateHeroBanner();
  const updateMutation = useUpdateHeroBanner();

  useEffect(() => {
    if (heroBanner) {
      setFormData({
        title: heroBanner.title,
        subtitle: heroBanner.subtitle,
        backgroundImageUrl: heroBanner.backgroundImageUrl,
        buttonText: heroBanner.buttonText,
        buttonLink: heroBanner.buttonLink,
        isActive: heroBanner.isActive,
      });
    }
  }, [heroBanner]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (heroBanner) {
      updateMutation.mutate(
        { id: heroBanner.id, data: formData },
        {
          onSuccess: () => {
            onSuccess();
          },
        }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => {
          onSuccess();
        },
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Título
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subtitle" className={styles.label}>
            Subtítulo
          </label>
          <textarea
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className={styles.textarea}
            rows={3}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="backgroundImageUrl" className={styles.label}>
            URL de la Imagen de Fondo
          </label>
          <input
            id="backgroundImageUrl"
            name="backgroundImageUrl"
            type="url"
            value={formData.backgroundImageUrl}
            onChange={handleChange}
            className={styles.input}
            placeholder="https://ejemplo.com/imagen.jpg"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="buttonText" className={styles.label}>
            Texto del Botón
          </label>
          <input
            id="buttonText"
            name="buttonText"
            type="text"
            value={formData.buttonText}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="buttonLink" className={styles.label}>
            Enlace del Botón
          </label>
          <input
            id="buttonLink"
            name="buttonLink"
            type="url"
            value={formData.buttonLink}
            onChange={handleChange}
            className={styles.input}
            placeholder="/categoria/ofertas"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxLabel}>
            <input
              name="isActive"
              type="checkbox"
              checked={formData.isActive}
              onChange={handleChange}
              className={styles.checkbox}
            />
            Activo
          </label>
        </div>

        {error && (
          <div className={styles.error}>
            Error: {error.message}
          </div>
        )}

        <div className={styles.formActions}>
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
            {isLoading
              ? 'Guardando...'
              : heroBanner
              ? 'Actualizar Hero Banner'
              : 'Crear Hero Banner'}
          </button>
        </div>
      </form>
    </div>
  );
};