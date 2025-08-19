import React from 'react';
import { Link } from 'react-router-dom';
import DropdownIcon from '../icons/DropdownIcon';
import HeartIcon from '../icons/HeartIcon';
import CartIcon from '../icons/CartIcon';
import { SearchBar } from '../SearchBar/SearchBar';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { useEnabledWebsiteNav } from '../../hooks/queries';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const { data: navItems = [], isLoading: navLoading } = useEnabledWebsiteNav();

  const renderNavItem = (item: any) => {
    const { title, url, type, openInNewTab } = item;
    
    if (type === 'external') {
      return (
        <a
          key={item.id}
          href={url}
          className={styles.navItem}
          target={openInNewTab ? '_blank' : '_self'}
          rel={openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {title}
        </a>
      );
    }
    
    // For internal and category links, use React Router Link
    return (
      <Link
        key={item.id}
        to={url}
        className={styles.navItem}
      >
        {title}
      </Link>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logo}>
            <DropdownIcon width={16} height={16} color="#171212" />
            <span className={styles.logoText}>Shopr</span>
          </Link>
          <nav className={styles.nav}>
            {!navLoading && navItems.map(renderNavItem)}
            <Link to="/admin" className={styles.navItem}>
              Admin
            </Link>
          </nav>
        </div>
        <div className={styles.rightSection}>
          <SearchBar />
          <div className={styles.actions}>
            <Link to="/favorites" className={styles.actionButton}>
              <HeartIcon width={20} height={20} color="#171212" />
              {favorites.itemCount > 0 && (
                <span className={styles.cartBadge}>{favorites.itemCount}</span>
              )}
            </Link>
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