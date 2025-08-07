import React, { useState, useEffect } from 'react';
import { categoryService } from '../../services/categoryService';
import type { Category, CategoryFormData } from '../../types/product';
import styles from './CategoryForm.module.css';

interface CategoryFormProps {
  category?: Category | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        imageUrl: category.imageUrl,
      });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.imageUrl.trim()) {
      setError('Por favor, rellene todos los campos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (category) {
        await categoryService.updateCategory(category.id, formData);
      } else {
        await categoryService.createCategory(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Nombre de la Categoría
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            placeholder="Introduce el nombre de la categoría"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="imageUrl" className={styles.label}>
            URL de la Imagen
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={styles.input}
            placeholder="Introduce la URL de la imagen"
            required
          />
        </div>

        {formData.imageUrl && (
          <div className={styles.preview}>
            <label className={styles.label}>Vista previa:</label>
            <img 
              src={formData.imageUrl} 
              alt="Vista previa de la categoría" 
              className={styles.previewImage}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? 'Guardando...' : (category ? 'Actualizar Categoría' : 'Crear Categoría')}
          </button>
        </div>
      </form>
    </div>
  );
};