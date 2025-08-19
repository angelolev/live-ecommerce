import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductList } from './ProductList';
import { ProductForm } from './ProductForm';
import { CategoryList } from './CategoryList';
import { CategoryForm } from './CategoryForm';
import { HeroBannerList } from './HeroBannerList';
import { HeroBannerForm } from './HeroBannerForm';
import { CountdownTimerList } from './CountdownTimerList';
import { CountdownTimerForm } from './CountdownTimerForm';
import { WebsiteNavList } from './WebsiteNavList';
import { WebsiteNavForm } from './WebsiteNavForm';
import { useProducts, useCategories, useHeroBanners, useCountdownTimers, useWebsiteNav } from '../../hooks/queries';
import type { Product, Category, HeroBanner, CountdownTimer, WebsiteNavItem } from '../../types/product';
import styles from './AdminDashboard.module.css';

type View = 'products-list' | 'products-add' | 'products-edit' | 'categories-list' | 'categories-add' | 'categories-edit' | 'hero-banners-list' | 'hero-banners-add' | 'hero-banners-edit' | 'countdown-timers-list' | 'countdown-timers-add' | 'countdown-timers-edit' | 'website-nav-list' | 'website-nav-add' | 'website-nav-edit';
type Section = 'products' | 'categories' | 'hero-banners' | 'countdown-timers' | 'website-nav';

export const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('products-list');
  const [currentSection, setCurrentSection] = useState<Section>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingHeroBanner, setEditingHeroBanner] = useState<HeroBanner | null>(null);
  const [editingCountdownTimer, setEditingCountdownTimer] = useState<CountdownTimer | null>(null);
  const [editingWebsiteNavItem, setEditingWebsiteNavItem] = useState<WebsiteNavItem | null>(null);
  const { data: products = [], isLoading: productsLoading, error: productsError, refetch: refetchProducts } = useProducts();
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError, refetch: refetchCategories } = useCategories();
  const { data: heroBanners = [], isLoading: heroBannersLoading, error: heroBannersError, refetch: refetchHeroBanners } = useHeroBanners();
  const { data: countdownTimers = [], isLoading: countdownTimersLoading, error: countdownTimersError, refetch: refetchCountdownTimers } = useCountdownTimers();
  const { data: websiteNavItems = [], isLoading: websiteNavLoading, error: websiteNavError, refetch: refetchWebsiteNav } = useWebsiteNav();

  const handleSectionChange = (section: Section) => {
    setCurrentSection(section);
    
    // Set the appropriate view based on section
    switch (section) {
      case 'products':
        setCurrentView('products-list');
        break;
      case 'categories':
        setCurrentView('categories-list');
        break;
      case 'hero-banners':
        setCurrentView('hero-banners-list');
        break;
      case 'countdown-timers':
        setCurrentView('countdown-timers-list');
        break;
      case 'website-nav':
        setCurrentView('website-nav-list');
        break;
      default:
        setCurrentView('products-list');
    }
    
    // Clear all editing states
    setEditingProduct(null);
    setEditingCategory(null);
    setEditingHeroBanner(null);
    setEditingCountdownTimer(null);
    setEditingWebsiteNavItem(null);
  };

  const handleAddProduct = () => {
    setCurrentView('products-add');
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentView('products-edit');
    setEditingProduct(product);
  };

  const handleAddCategory = () => {
    setCurrentView('categories-add');
    setEditingCategory(null);
  };

  const handleEditCategory = (category: Category) => {
    setCurrentView('categories-edit');
    setEditingCategory(category);
  };

  const handleBackToProductsList = () => {
    setCurrentView('products-list');
    setEditingProduct(null);
    refetchProducts();
  };

  const handleBackToCategoriesList = () => {
    setCurrentView('categories-list');
    setEditingCategory(null);
    refetchCategories();
  };

  const handleAddHeroBanner = () => {
    setCurrentView('hero-banners-add');
    setEditingHeroBanner(null);
  };

  const handleEditHeroBanner = (heroBanner: HeroBanner) => {
    setCurrentView('hero-banners-edit');
    setEditingHeroBanner(heroBanner);
  };

  const handleBackToHeroBannersList = () => {
    setCurrentView('hero-banners-list');
    setEditingHeroBanner(null);
    refetchHeroBanners();
  };

  const handleAddCountdownTimer = () => {
    setCurrentView('countdown-timers-add');
    setEditingCountdownTimer(null);
  };

  const handleEditCountdownTimer = (timer: CountdownTimer) => {
    setCurrentView('countdown-timers-edit');
    setEditingCountdownTimer(timer);
  };

  const handleBackToCountdownTimersList = () => {
    setCurrentView('countdown-timers-list');
    setEditingCountdownTimer(null);
    refetchCountdownTimers();
  };

  const handleAddWebsiteNavItem = () => {
    setCurrentView('website-nav-add');
    setEditingWebsiteNavItem(null);
  };

  const handleEditWebsiteNavItem = (item: WebsiteNavItem) => {
    setCurrentView('website-nav-edit');
    setEditingWebsiteNavItem(item);
  };

  const handleBackToWebsiteNavList = () => {
    setCurrentView('website-nav-list');
    setEditingWebsiteNavItem(null);
    refetchWebsiteNav();
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Panel de Administración</h1>
          <Link to="/" className={styles.backLink}>← Volver a la Tienda</Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.layout}>
            <nav className={styles.sidebar}>
              <ul className={styles.nav}>
                <li>
                  <button
                    className={`${styles.navButton} ${currentSection === 'products' ? styles.active : ''}`}
                    onClick={() => handleSectionChange('products')}
                  >
                    Productos
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.navButton} ${currentSection === 'categories' ? styles.active : ''}`}
                    onClick={() => handleSectionChange('categories')}
                  >
                    Categorías
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.navButton} ${currentSection === 'hero-banners' ? styles.active : ''}`}
                    onClick={() => handleSectionChange('hero-banners')}
                  >
                    Hero Banner
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.navButton} ${currentSection === 'countdown-timers' ? styles.active : ''}`}
                    onClick={() => handleSectionChange('countdown-timers')}
                  >
                    Contador de Tiempo
                  </button>
                </li>
                <li>
                  <button
                    className={`${styles.navButton} ${currentSection === 'website-nav' ? styles.active : ''}`}
                    onClick={() => handleSectionChange('website-nav')}
                  >
                    🌐 Navegación Web
                  </button>
                </li>
              </ul>
            </nav>

            <div className={styles.content}>
              {/* Products Section */}
              {currentView === 'products-list' && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>Gestión de Productos</h2>
                    <button 
                      className={styles.addButton}
                      onClick={handleAddProduct}
                    >
                      Añadir Nuevo Producto
                    </button>
                  </div>
                  
                  <ProductList
                    products={products}
                    loading={productsLoading}
                    error={productsError?.message || null}
                    onEdit={handleEditProduct}
                    onRefresh={refetchProducts}
                  />
                </div>
              )}

              {(currentView === 'products-add' || currentView === 'products-edit') && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>{currentView === 'products-add' ? 'Añadir Nuevo Producto' : 'Editar Producto'}</h2>
                    <button 
                      className={styles.backButton}
                      onClick={handleBackToProductsList}
                    >
                      ← Volver a la Lista
                    </button>
                  </div>
                  
                  <ProductForm
                    product={editingProduct}
                    onSuccess={handleBackToProductsList}
                    onCancel={handleBackToProductsList}
                  />
                </div>
              )}

              {/* Categories Section */}
              {currentView === 'categories-list' && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>Gestión de Categorías</h2>
                    <button 
                      className={styles.addButton}
                      onClick={handleAddCategory}
                    >
                      Añadir Nueva Categoría
                    </button>
                  </div>
                  
                  <CategoryList
                    categories={categories}
                    loading={categoriesLoading}
                    error={categoriesError?.message || null}
                    onEdit={handleEditCategory}
                    onRefresh={refetchCategories}
                  />
                </div>
              )}

              {(currentView === 'categories-add' || currentView === 'categories-edit') && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>{currentView === 'categories-add' ? 'Añadir Nueva Categoría' : 'Editar Categoría'}</h2>
                    <button 
                      className={styles.backButton}
                      onClick={handleBackToCategoriesList}
                    >
                      ← Volver a la Lista
                    </button>
                  </div>
                  
                  <CategoryForm
                    category={editingCategory}
                    onSuccess={handleBackToCategoriesList}
                    onCancel={handleBackToCategoriesList}
                  />
                </div>
              )}

              {/* Hero Banners Section */}
              {currentView === 'hero-banners-list' && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>Gestión de Hero Banner</h2>
                    <button 
                      className={styles.addButton}
                      onClick={handleAddHeroBanner}
                    >
                      Añadir Nuevo Hero Banner
                    </button>
                  </div>
                  
                  <HeroBannerList
                    heroBanners={heroBanners}
                    loading={heroBannersLoading}
                    error={heroBannersError?.message || null}
                    onEdit={handleEditHeroBanner}
                    onRefresh={refetchHeroBanners}
                  />
                </div>
              )}

              {(currentView === 'hero-banners-add' || currentView === 'hero-banners-edit') && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>{currentView === 'hero-banners-add' ? 'Añadir Nuevo Hero Banner' : 'Editar Hero Banner'}</h2>
                    <button 
                      className={styles.backButton}
                      onClick={handleBackToHeroBannersList}
                    >
                      ← Volver a la Lista
                    </button>
                  </div>
                  
                  <HeroBannerForm
                    heroBanner={editingHeroBanner}
                    onSuccess={handleBackToHeroBannersList}
                    onCancel={handleBackToHeroBannersList}
                  />
                </div>
              )}

              {/* Countdown Timers Section */}
              {currentView === 'countdown-timers-list' && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>Gestión de Contadores de Tiempo</h2>
                    <button 
                      className={styles.addButton}
                      onClick={handleAddCountdownTimer}
                    >
                      Añadir Nuevo Contador
                    </button>
                  </div>
                  
                  <CountdownTimerList
                    countdownTimers={countdownTimers}
                    loading={countdownTimersLoading}
                    error={countdownTimersError?.message || null}
                    onEdit={handleEditCountdownTimer}
                    onRefresh={refetchCountdownTimers}
                  />
                </div>
              )}

              {(currentView === 'countdown-timers-add' || currentView === 'countdown-timers-edit') && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>{currentView === 'countdown-timers-add' ? 'Añadir Nuevo Contador' : 'Editar Contador'}</h2>
                    <button 
                      className={styles.backButton}
                      onClick={handleBackToCountdownTimersList}
                    >
                      ← Volver a la Lista
                    </button>
                  </div>
                  
                  <CountdownTimerForm
                    timer={editingCountdownTimer}
                    onSuccess={handleBackToCountdownTimersList}
                    onCancel={handleBackToCountdownTimersList}
                  />
                </div>
              )}

              {/* Website Navigation Section */}
              {currentView === 'website-nav-list' && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>Navegación del Sitio Web</h2>
                    <button 
                      className={styles.addButton}
                      onClick={handleAddWebsiteNavItem}
                    >
                      Añadir Nuevo Enlace
                    </button>
                  </div>
                  
                  <WebsiteNavList
                    navItems={websiteNavItems}
                    loading={websiteNavLoading}
                    error={websiteNavError?.message || null}
                    onEdit={handleEditWebsiteNavItem}
                    onRefresh={refetchWebsiteNav}
                  />
                </div>
              )}

              {(currentView === 'website-nav-add' || currentView === 'website-nav-edit') && (
                <div>
                  <div className={styles.toolbar}>
                    <h2>{currentView === 'website-nav-add' ? 'Añadir Nuevo Enlace' : 'Editar Enlace'}</h2>
                    <button 
                      className={styles.backButton}
                      onClick={handleBackToWebsiteNavList}
                    >
                      ← Volver a la Lista
                    </button>
                  </div>
                  
                  <WebsiteNavForm
                    navItem={editingWebsiteNavItem}
                    onSuccess={handleBackToWebsiteNavList}
                    onCancel={handleBackToWebsiteNavList}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};