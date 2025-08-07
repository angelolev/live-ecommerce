import React from 'react';
import { useCart } from '../../hooks/useCart';
import { Button } from '../Button/Button';
import styles from './OrderSummary.module.css';

export const OrderSummary: React.FC = () => {
  const { cart } = useCart();

  const handleProceedToCheckout = () => {
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout...');
  };

  if (cart.items.length === 0) {
    return null;
  }

  return (
    <div className={styles.orderSummary}>
      <h2 className={styles.title}>Resumen del Pedido</h2>
      
      <div className={styles.summaryDetails}>
        <div className={styles.summaryRow}>
          <span className={styles.label}>Subtotal</span>
          <span className={styles.value}>${cart.subtotal.toFixed(2)}</span>
        </div>
        
        <div className={styles.summaryRow}>
          <span className={styles.label}>Envío</span>
          <span className={styles.value}>
            {cart.shipping === 0 ? 'Gratis' : `${cart.shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>${cart.total.toFixed(2)}</span>
        </div>
      </div>

      <Button
        onClick={handleProceedToCheckout}
        className={styles.checkoutButton}
        size="large"
      >
        Proceder al Pago
      </Button>
    </div>
  );
};