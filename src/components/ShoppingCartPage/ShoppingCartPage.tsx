import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { CartItem } from '../CartItem/CartItem';
import { OrderSummary } from '../OrderSummary/OrderSummary';
import { useCart } from '../../hooks/useCart';
import styles from './ShoppingCartPage.module.css';

export const ShoppingCartPage: React.FC = () => {
  const { cart } = useCart();

  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Carrito de Compras' },
  ];

  if (cart.items.length === 0) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <Breadcrumb items={breadcrumbItems} />
            <div className={styles.emptyCart}>
              <h1 className={styles.title}>Carrito de Compras</h1>
              <div className={styles.emptyState}>
                <p className={styles.emptyMessage}>Tu carrito está vacío</p>
                <Link to="/" className={styles.continueShopping}>
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Breadcrumb items={breadcrumbItems} />
          
          <h1 className={styles.title}>Carrito de Compras</h1>
          
          <div className={styles.cartContent}>
            <div className={styles.cartItems}>
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className={styles.sidebar}>
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};