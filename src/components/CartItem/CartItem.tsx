import React from 'react';
import type { CartItem as CartItemType } from '../../types/cart';
import { useCart } from '../../hooks/useCart';
import styles from './CartItem.module.css';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        <img 
          src={item.product.images[0]} 
          alt={item.product.name}
          className={styles.image}
        />
      </div>
      
      <div className={styles.itemDetails}>
        <h3 className={styles.itemName}>{item.product.name}</h3>
        <div className={styles.itemMeta}>
          {item.size && <span className={styles.size}>Size: {item.size}</span>}
          {item.color && <span className={styles.color}>Color: {item.color}</span>}
        </div>
        <div className={styles.itemPrice}>
          ${item.product.price.toFixed(2)}
        </div>
      </div>

      <div className={styles.quantityControls}>
        <button
          className={styles.quantityButton}
          onClick={() => handleQuantityChange(item.quantity - 1)}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button
          className={styles.quantityButton}
          onClick={() => handleQuantityChange(item.quantity + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        className={styles.removeButton}
        onClick={handleRemove}
        aria-label="Remove item"
      >
        ×
      </button>
    </div>
  );
};