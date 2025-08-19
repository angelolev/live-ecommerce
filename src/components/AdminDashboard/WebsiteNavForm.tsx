import React, { useState, useEffect } from 'react';
import type { WebsiteNavItem, WebsiteNavItemFormData } from '../../types/product';
import { useWebsiteNavMutations } from '../../hooks/queries/useWebsiteNavMutations';
import { websiteNavService } from '../../services/websiteNavService';
import styles from './WebsiteNavForm.module.css';

interface WebsiteNavFormProps {
  navItem?: WebsiteNavItem | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const WebsiteNavForm: React.FC<WebsiteNavFormProps> = ({
  navItem,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<WebsiteNavItemFormData>({
    title: '',
    url: '',
    type: 'internal',
    enabled: true,
    order: 1,
    openInNewTab: false,
  });

  const [errors, setErrors] = useState<Partial<WebsiteNavItemFormData>>({});
  const { createWebsiteNavItem, updateWebsiteNavItem } = useWebsiteNavMutations();

  useEffect(() => {
    if (navItem) {
      setFormData({
        title: navItem.title,
        url: navItem.url,
        type: navItem.type,
        enabled: navItem.enabled,
        order: navItem.order,
        openInNewTab: navItem.openInNewTab,
      });
    }
  }, [navItem]);

  const validateForm = (): boolean => {
    const newErrors: Partial<WebsiteNavItemFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    }

    if (!formData.url.trim()) {
      newErrors.url = 'La URL es requerida';
    } else if (!websiteNavService.validateUrl(formData.url, formData.type)) {
      if (formData.type === 'external') {
        newErrors.url = 'URL externa inválida (debe incluir http:// o https://)';
      } else {
        newErrors.url = 'URL interna inválida (debe comenzar con /)';
      }
    }

    if (formData.order < 1) {
      newErrors.order = 'El orden debe ser mayor a 0';
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
      if (navItem) {
        await updateWebsiteNavItem.mutateAsync({
          id: navItem.id,
          data: formData,
        });
      } else {
        await createWebsiteNavItem.mutateAsync(formData);
      }
      onSuccess?.();
    } catch (error) {
      console.error('Error saving website navigation item:', error);
    }
  };

  const handleInputChange = (field: keyof WebsiteNavItemFormData, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleTypeChange = (newType: 'internal' | 'external' | 'category') => {
    setFormData(prev => ({
      ...prev,
      type: newType,
      url: '',
      openInNewTab: newType === 'external',
    }));
    setErrors(prev => ({
      ...prev,
      url: undefined,
    }));
  };

  const getUrlPlaceholder = () => {
    switch (formData.type) {
      case 'external':
        return 'https://example.com';
      case 'category':
        return '/category/nombre-categoria';
      case 'internal':
        return '/pagina-interna';
      default:
        return '';
    }
  };

  const getUrlHelperText = () => {
    switch (formData.type) {
      case 'external':
        return 'URL completa incluyendo http:// o https://';
      case 'category':
        return 'Ruta a una categoría, ej: /category/hombre';
      case 'internal':
        return 'Ruta interna del sitio, ej: /favoritos, /carrito';
      default:
        return '';
    }
  };

  const isLoading = createWebsiteNavItem.isPending || updateWebsiteNavItem.isPending;

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Título *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            placeholder="ej: Inicio, Productos, Contacto"
          />
          {errors.title && <span className={styles.error}>{errors.title}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="type" className={styles.label}>
            Tipo de Enlace *
          </label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => handleTypeChange(e.target.value as 'internal' | 'external' | 'category')}
            className={styles.select}
          >
            <option value="internal">Página Interna</option>
            <option value="category">Categoría</option>
            <option value="external">Enlace Externo</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="url" className={styles.label}>
            URL *
          </label>
          <input
            type="text"
            id="url"
            value={formData.url}
            onChange={(e) => handleInputChange('url', e.target.value)}
            className={`${styles.input} ${errors.url ? styles.inputError : ''}`}
            placeholder={getUrlPlaceholder()}
          />
          <small className={styles.helperText}>{getUrlHelperText()}</small>
          {errors.url && <span className={styles.error}>{errors.url}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="order" className={styles.label}>
            Orden
          </label>
          <input
            type="number"
            id="order"
            value={formData.order}
            onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 1)}
            className={`${styles.input} ${errors.order ? styles.inputError : ''}`}
            min="1"
          />
          {errors.order && <span className={styles.error}>{errors.order}</span>}
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.enabled}
              onChange={(e) => handleInputChange('enabled', e.target.checked)}
              className={styles.checkbox}
            />
            Habilitado
          </label>

          {formData.type === 'external' && (
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.openInNewTab}
                onChange={(e) => handleInputChange('openInNewTab', e.target.checked)}
                className={styles.checkbox}
              />
              Abrir en nueva pestaña
            </label>
          )}
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
            {isLoading ? 'Guardando...' : navItem ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};