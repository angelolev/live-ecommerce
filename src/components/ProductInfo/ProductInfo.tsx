import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { SizeSelector } from '../SizeSelector/SizeSelector';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import HeartIcon from '../icons/HeartIcon';
import type { Product as CartProduct } from '../../types/product';
import { formatPrice } from '../../productDetailMockData';
import styles from './ProductInfo.module.css';

interface ProductColor {
  name: string;
  hex: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
  availableSizes: readonly string[];
  availableColors: ProductColor[];
}

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Por favor, seleccione talla y color');
      return;
    }
    
    // Convert the product detail product to cart product format
    const cartProduct: CartProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images || [],
      category: 'General', // You might want to add category to the product interface
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    addToCart(cartProduct, 1, selectedSize, selectedColor);
    
    // Show success message
    alert('¡Añadido al carrito! Haga clic en Aceptar para continuar comprando.');
  };

  const handleFavoriteToggle = () => {
    // Convert the product detail product to cart product format for favorites
    const favoriteProduct: CartProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images || [],
      category: 'General',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(favoriteProduct);
    }
  };

  const isProductFavorite = isFavorite(product.id);

  return (
    <div className={styles.productInfo}>
      <h1 className={styles.title}>{product.name}</h1>
      
      <p className={styles.description}>{product.description}</p>
      
      <div className={styles.price}>{formatPrice(product.price)}</div>
      
      <SizeSelector
        sizes={product.availableSizes}
        selectedSize={selectedSize}
        onSizeSelect={setSelectedSize}
      />
      
      <ColorPicker
        colors={product.availableColors}
        selectedColor={selectedColor}
        onColorSelect={setSelectedColor}
      />
      
      <div className={styles.buttonsContainer}>
        <Button
          variant="primary"
          size="medium"
          onClick={handleAddToCart}
          className={styles.addToCartButton}
        >
          Añadir al carrito
        </Button>
        
        <button
          onClick={handleFavoriteToggle}
          className={`${styles.favoriteButton} ${isProductFavorite ? styles.favoriteActive : ''}`}
          title={isProductFavorite ? 'Eliminar de favoritos' : 'Añadir a favoritos'}
        >
          <HeartIcon 
            width={20} 
            height={20} 
            color={isProductFavorite ? '#dc2626' : '#171212'} 
          />
        </button>
      </div>
    </div>
  );
};