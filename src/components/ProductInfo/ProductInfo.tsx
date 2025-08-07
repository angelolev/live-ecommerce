import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { SizeSelector } from '../SizeSelector/SizeSelector';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { useCart } from '../../hooks/useCart';
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
      
      <Button
        variant="primary"
        size="medium"
        onClick={handleAddToCart}
        className={styles.addToCartButton}
      >
        Añadir al carrito
      </Button>
    </div>
  );
};