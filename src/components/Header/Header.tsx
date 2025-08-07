import React from 'react';
import { Link } from 'react-router-dom';
import DropdownIcon from '../icons/DropdownIcon';
import HeartIcon from '../icons/HeartIcon';
import CartIcon from '../icons/CartIcon';
import { SearchBar } from '../SearchBar/SearchBar';
import { useCart } from '../../hooks/useCart';
import styles from './Header.module.css';

const menuItems = ['Novedades', 'Hombre', 'Mujer', 'Accesorios', 'Ofertas'];

export const Header: React.FC = () => {
  const { cart } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logo}>
            <DropdownIcon width={16} height={16} color="#171212" />
            <span className={styles.logoText}>Shopr</span>
          </Link>
          <nav className={styles.nav}>
            {menuItems.map((item) => (
              <a key={item} href="#" className={styles.navItem}>
                {item}
              </a>
            ))}
            <Link to="/admin" className={styles.navItem}>
              Admin
            </Link>
          </nav>
        </div>
        <div className={styles.rightSection}>
          <SearchBar />
          <div className={styles.actions}>
            <button className={styles.actionButton}>
              <HeartIcon width={20} height={20} color="#171212" />
            </button>
            <Link to="/cart" className={styles.cartButton}>
              <CartIcon width={20} height={20} color="#171212" />
              {cart.itemCount > 0 && (
                <span className={styles.cartBadge}>{cart.itemCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};