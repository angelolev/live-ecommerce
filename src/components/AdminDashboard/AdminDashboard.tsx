import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';
import { CategoryList } from './CategoryList';
import { CategoryForm } from './CategoryForm';
import { useProducts, useCategories } from '../../hooks/queries';
import type { Product, Category } from '../../types/product';
import styles from './AdminDashboard.module.css';

type View = 'products-list' | 'products-add' | 'products-edit' | 'categories-list' | 'categories-add' | 'categories-edit';
type Section = 'products' | 'categories';

export const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('products-list');
  const [currentSection, setCurrentSection] = useState<Section>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { data: products = [], isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories();

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section);
    if (section === 'products') {
      setCurrentView('products-list');
    } else {
      setCurrentView('categories-list');
    }
    setEditingProduct(null);
    setEditingCategory(null);
  };

  const handleAddProduct = () => {
    setCurrentView('products-add');
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentView('products-edit');
    setEditingProduct(product);
  };

  const handleAddCategory = () => {
    setCurrentView('categories-add');
    setEditingCategory(null);
  };

  const handleEditCategory = (category: Category) => {
    setCurrentView('categories-edit');
    setEditingCategory(category);
  };

  const handleBackToProductsList = () => {
    setCurrentView('products-list');
    setEditingProduct(null);
    refetchProducts();
  };

  const handleBackToCategoriesList = () => {
    setCurrentView('categories-list');
    setEditingCategory(null);
    refetchCategories();
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Panel de Administración</h1>
          <Link to="/" className={styles.backLink}>← Volver a la Tienda</Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <nav className={styles.sidebar}>
              <ul className={styles.nav}>
                <li>
                  <button
                    className={`${styles.navButton} ${currentSection === 'products' ? styles.active : ''}`}
                    onClick={() => handleSectionChange('products')}
                  >
                    Productos
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.navButton} ${currentSection === 'categories' ? styles.active : ''}`}
                    onClick={() => handleSectionChange('categories')}
                  >
                    Categorías
                  </button>
                </li>
              </ul>
            </nav>

            <div className={styles.content}>
              {/* Products Section */}
              {currentView === 'products-list' && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>Gestión de Productos</h2>
                    <button 
                      className={styles.addButton}
                      onClick={handleAddProduct}
                    >
                      Añadir Nuevo Producto
                    </button>
                  </div>
                  
                  <ProductList
                    products={products}
                    loading={productsLoading}
                    error={productsError?.message || null}
                    onEdit={handleEditProduct}
                    onRefresh={refetchProducts}
                  />
                </div>
              )}

              {(currentView === 'products-add' || currentView === 'products-edit') && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>{currentView === 'products-add' ? 'Añadir Nuevo Producto' : 'Editar Producto'}</h2>
                    <button 
                      className={styles.backButton}
                      onClick={handleBackToProductsList}
                    >
                      ← Volver a la Lista
                    </button>
                  </div>
                  
                  <ProductForm
                    product={editingProduct}
                    onSuccess={handleBackToProductsList}
                    onCancel={handleBackToProductsList}
                  />
                </div>
              )}

              {/* Categories Section */}
              {currentView === 'categories-list' && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>Gestión de Categorías</h2>
                    <button 
                      className={styles.addButton}
                      onClick={handleAddCategory}
                    >
                      Añadir Nueva Categoría
                    </button>
                  </div>
                  
                  <CategoryList
                    categories={categories}
                    loading={categoriesLoading}
                    error={categoriesError?.message || null}
                    onEdit={handleEditCategory}
                    onRefresh={refetchCategories}
                  />
                </div>
              )}

              {(currentView === 'categories-add' || currentView === 'categories-edit') && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>{currentView === 'categories-add' ? 'Añadir Nueva Categoría' : 'Editar Categoría'}</h2>
                    <button 
                      className={styles.backButton}
                      onClick={handleBackToCategoriesList}
                    >
                      ← Volver a la Lista
                    </button>
                  </div>
                  
                  <CategoryForm
                    category={editingCategory}
                    onSuccess={handleBackToCategoriesList}
                    onCancel={handleBackToCategoriesList}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};