import React from "react";
import type { CartItem as CartItemType } from "../../types/cart";
import { useCart } from "../../hooks/useCart";
import styles from "./CartItem.module.css";

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
          {item.size && <span className={styles.size}>Talla: {item.size}</span>}
          {item.color && (
            <span className={styles.color}>Color: {item.color}</span>
          )}
        </div>
        <div className={styles.itemPrice}>${item.product.price.toFixed(2)}</div>
      </div>

      <div className={styles.quantityControls}>
        <button
          className={styles.quantityButton}
          onClick={() => handleQuantityChange(item.quantity - 1)}
          aria-label="Disminuir cantidad"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-minus-icon lucide-minus"
          >
            <path d="M5 12h14" />
          </svg>
        </button>
        <span className={styles.quantity}>{item.quantity}</span>
        <button
          className={styles.quantityButton}
          onClick={() => handleQuantityChange(item.quantity + 1)}
          aria-label="Aumentar cantidad"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-plus-icon lucide-plus"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
        </button>
      </div>

      <button
        className={styles.removeButton}
        onClick={handleRemove}
        aria-label="Eliminar artículo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-x-icon lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
};
