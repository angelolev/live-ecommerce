import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropdownIcon from "../icons/DropdownIcon";
import HeartIcon from "../icons/HeartIcon";
import CartIcon from "../icons/CartIcon";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";
import MenuIcon from "../icons/MenuIcon";
import CloseIcon from "../icons/CloseIcon";
import { SearchBar } from "../SearchBar/SearchBar";
import { useCart } from "../../hooks/useCart";
import { useFavorites } from "../../hooks/useFavorites";
import { useEnabledWebsiteNav } from "../../hooks/queries";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import type { WebsiteNavItem } from "../../types/product";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const { data: navItems = [], isLoading: navLoading } = useEnabledWebsiteNav();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [, setShowMobileSearch] = useState(false);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMobileMenu(false);
        setShowMobileSearch(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showMobileMenu]);

  const renderNavItem = (item: WebsiteNavItem) => {
    const { title, url, type, openInNewTab } = item;

    if (type === "external") {
      return (
        <a
          key={item.id}
          href={url}
          className={styles.navItem}
          target={openInNewTab ? "_blank" : "_self"}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
          {title}
        </a>
      );
    }

    // For internal and category links, use React Router Link
    return (
      <Link key={item.id} to={url} className={styles.navItem}>
        {title}
      </Link>
    );
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          {/* Mobile menu button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Toggle menu"
          >
            {showMobileMenu ? (
              <CloseIcon width={24} height={24} />
            ) : (
              <MenuIcon width={24} height={24} />
            )}
          </button>

          <Link to="/" className={styles.logo}>
            <DropdownIcon width={16} height={16} />
            <span className={styles.logoText}>Shopr</span>
          </Link>

          {/* Desktop navigation */}
          <nav className={styles.nav}>
            {!navLoading && navItems.map(renderNavItem)}
            <Link to="/admin" className={styles.navItem}>
              Admin
            </Link>
          </nav>
        </div>

        <div className={styles.rightSection}>
          {/* Desktop search */}
          <div className={styles.desktopSearch}>
            <SearchBar />
          </div>

          <div className={styles.actions}>
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <MoonIcon width={20} height={20} />
              ) : (
                <SunIcon width={20} height={20} />
              )}
            </button>
            <Link to="/favorites" className={styles.actionButton}>
              <HeartIcon width={20} height={20} />
              {favorites.itemCount > 0 && (
                <span className={styles.cartBadge}>{favorites.itemCount}</span>
              )}
            </Link>
            <Link to="/cart" className={styles.cartButton}>
              <CartIcon width={20} height={20} />
              {cart.itemCount > 0 && (
                <span className={styles.cartBadge}>{cart.itemCount}</span>
              )}
            </Link>

            {user ? (
              <div className={styles.userMenu}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={styles.userButton}
                  aria-label="User menu"
                >
                  <img
                    src={user.photoURL || "https://via.placeholder.com/32"}
                    alt={user.displayName || "User"}
                    className={styles.userAvatar}
                  />
                </button>
                {showUserMenu && (
                  <div className={styles.userDropdown}>
                    <div className={styles.userInfo}>
                      <p className={styles.userName}>{user.displayName}</p>
                      <p className={styles.userEmail}>{user.email}</p>
                    </div>
                    <div className={styles.userMenuDivider} />
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className={styles.logoutButton}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className={styles.loginButton}>
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {showMobileMenu && (
        <>
          <div
            className={styles.mobileOverlay}
            onClick={() => setShowMobileMenu(false)}
          />
          <nav className={styles.mobileNav}>
            <div className={styles.mobileNavContent}>
              {/* Mobile search */}
              <div className={styles.mobileSearchWrapper}>
                <SearchBar />
              </div>

              {/* Navigation links */}
              <div className={styles.mobileNavLinks}>
                {!navLoading &&
                  navItems.map((item: WebsiteNavItem) => (
                    <div key={item.id} onClick={() => setShowMobileMenu(false)}>
                      {renderNavItem(item)}
                    </div>
                  ))}
                <Link
                  to="/admin"
                  className={styles.navItem}
                  onClick={() => setShowMobileMenu(false)}
                >
                  Admin
                </Link>
              </div>

              {/* User section for mobile */}
              {user && (
                <div className={styles.mobileUserSection}>
                  <div className={styles.mobileUserInfo}>
                    <img
                      src={user.photoURL || "https://via.placeholder.com/40"}
                      alt={user.displayName || "User"}
                      className={styles.mobileUserAvatar}
                    />
                    <div>
                      <p className={styles.mobileUserName}>
                        {user.displayName}
                      </p>
                      <p className={styles.mobileUserEmail}>{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                    }}
                    className={styles.mobileLogoutButton}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </nav>
        </>
      )}
    </header>
  );
};
