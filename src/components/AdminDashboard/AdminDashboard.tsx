import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';
import { useProducts } from '../../hooks/useProducts';
import type { Product } from '../../types/product';
import styles from './AdminDashboard.module.css';

type View = 'list' | 'add' | 'edit';

export const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('list');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { products, loading, error, refetch } = useProducts();

  const handleAddProduct = () => {
    setCurrentView('add');
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentView('edit');
    setEditingProduct(product);
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setEditingProduct(null);
    refetch();
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <Link to="/" className={styles.backLink}>← Back to Store</Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {currentView === 'list' && (
            <div>
              <div className={styles.toolbar}>
                <h2>Product Management</h2>
                <button 
                  className={styles.addButton}
                  onClick={handleAddProduct}
                >
                  Add New Product
                </button>
              </div>
              
              <ProductList
                products={products}
                loading={loading}
                error={error}
                onEdit={handleEditProduct}
                onRefresh={refetch}
              />
            </div>
          )}

          {(currentView === 'add' || currentView === 'edit') && (
            <div>
              <div className={styles.toolbar}>
                <h2>{currentView === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
                <button 
                  className={styles.backButton}
                  onClick={handleBackToList}
                >
                  ← Back to List
                </button>
              </div>
              
              <ProductForm
                product={editingProduct}
                onSuccess={handleBackToList}
                onCancel={handleBackToList}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};