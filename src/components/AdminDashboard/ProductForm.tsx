import React, { useState, useEffect } from 'react';
import { useCategories, useCreateProduct, useUpdateProduct } from '../../hooks/queries';
import type { Product, ProductFormData } from '../../types/product';
import styles from './ProductForm.module.css';

interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
}


export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSuccess,
  onCancel
}) => {
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    images: [''],
    category: ''
  });
  const [error, setError] = useState<string | null>(null);
  
  const isLoading = createProductMutation.isPending || updateProductMutation.isPending;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images.length > 0 ? product.images : [''],
        category: product.category
      });
    } else if (categories.length > 0 && !formData.category) {
      // Set default category when categories are loaded and no category is selected
      setFormData(prev => ({
        ...prev,
        category: categories[0].name
      }));
    }
  }, [product, categories, formData.category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validImages = formData.images.filter(img => img.trim() !== '');
    
    if (!formData.name.trim() || !formData.description.trim() || validImages.length === 0) {
      setError('Por favor, rellene todos los campos obligatorios y al menos una imagen');
      return;
    }

    if (formData.price <= 0) {
      setError('El precio debe ser mayor que 0');
      return;
    }

    setError(null);

    const productData = {
      ...formData,
      images: validImages
    };
    
    try {
      if (product) {
        await updateProductMutation.mutateAsync({ id: product.id, productData });
      } else {
        await createProductMutation.mutateAsync(productData);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el producto');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const addImageField = () => {
    if (formData.images.length < 3) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, '']
      }));
    }
  };

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      setFormData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            Nombre del Producto *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="description" className={styles.label}>
            Descripción *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            rows={4}
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="price" className={styles.label}>
              Precio ($) *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.input}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="category" className={styles.label}>
              Categoría
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.select}
              disabled={categoriesLoading || categories.length === 0}
            >
              {categoriesLoading && (
                <option value="">Cargando categorías...</option>
              )}
              {!categoriesLoading && categories.length === 0 && (
                <option value="">No hay categorías disponibles</option>
              )}
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.imagesHeader}>
            <label className={styles.label}>
              Imágenes del Producto * (1-3 imágenes)
            </label>
            {formData.images.length < 3 && (
              <button
                type="button"
                onClick={addImageField}
                className={styles.addImageButton}
              >
                + Añadir Imagen
              </button>
            )}
          </div>
          
          {formData.images.map((image, index) => (
            <div key={index} className={styles.imageInput}>
              <div className={styles.imageInputRow}>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className={styles.input}
                  placeholder={`URL de la Imagen ${index + 1} - https://example.com/image.jpg`}
                />
                {formData.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className={styles.removeImageButton}
                  >
                    Eliminar
                  </button>
                )}
              </div>
              {image && (
                <div className={styles.imagePreview}>
                  <img src={image} alt={`Vista previa ${index + 1}`} className={styles.previewImage} />
                </div>
              )}
            </div>
          ))}
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
            {isLoading ? 'Guardando...' : (product ? 'Actualizar Producto' : 'Crear Producto')}
          </button>
        </div>
      </form>
    </div>
  );
};