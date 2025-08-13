import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Button } from '../Button/Button';
import { useFavorites } from '../../hooks/useFavorites';
import { formatPrice } from '../../productDetailMockData';
import styles from './FavoritesPage.module.css';

export const FavoritesPage: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.itemCount === 0) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.container}>
          <h1 className={styles.title}>Mis Favoritos</h1>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>♡</div>
            <h2 className={styles.emptyTitle}>No tienes productos favoritos</h2>
            <p className={styles.emptyDescription}>
              Explora nuestros productos y añade tus favoritos para verlos aquí
            </p>
            <Link to="/">
              <Button variant="primary" size="medium">
                Explorar Productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mis Favoritos</h1>
          <p className={styles.subtitle}>
            {favorites.itemCount} {favorites.itemCount === 1 ? 'producto' : 'productos'}
          </p>
        </div>
        
        <div className={styles.productsGrid}>
          {favorites.items.map((favoriteItem) => (
            <div key={favoriteItem.id} className={styles.productCard}>
              <div className={styles.imageContainer}>
                <img
                  src={favoriteItem.product.images[0] || '/placeholder-image.jpg'}
                  alt={favoriteItem.product.name}
                  className={styles.productImage}
                />
                <button
                  onClick={() => removeFromFavorites(favoriteItem.product.id)}
                  className={styles.removeButton}
                  title="Eliminar de favoritos"
                >
                  ✕
                </button>
              </div>
              
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{favoriteItem.product.name}</h3>
                <p className={styles.productDescription}>
                  {favoriteItem.product.description}
                </p>
                <div className={styles.productPrice}>
                  {formatPrice(favoriteItem.product.price)}
                </div>
                
                <div className={styles.actions}>
                  <Link to={`/product/${favoriteItem.product.id}`}>
                    <Button variant="primary" size="small" className={styles.viewButton}>
                      Ver Producto
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};