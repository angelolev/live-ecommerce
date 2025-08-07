import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import { HeroBanner } from "../HeroBanner/HeroBanner";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import { CategoryCard } from "../CategoryCard/CategoryCard";
import { ProductCard } from "../ProductCard/ProductCard";
import { Button } from "../Button/Button";
import { useCategories, useFeaturedProducts } from "../../hooks/queries";
// Remove unused import
import styles from "./EcommerceHomepage.module.css";

export const EcommerceHomepage: React.FC = () => {
  const navigate = useNavigate();
  const { data: products = [], isLoading: productsLoading, error: productsError } = useFeaturedProducts();
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const handleCategoryClick = (categoryId: string) => {
    // Find the category name and create URL-friendly slug
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/category/${categorySlug}`);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={styles.homepage}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <HeroBanner />

          <CountdownTimer />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Categorías Destacadas</h2>
            {categoriesLoading && (
              <div className={styles.loadingState}>
                <p>Cargando categorías...</p>
              </div>
            )}
            {categoriesError && (
              <div className={styles.errorState}>
                <p>Error al cargar categorías: {categoriesError.message}</p>
              </div>
            )}
            {!categoriesLoading && !categoriesError && categories.length === 0 && (
              <div className={styles.emptyState}>
                <p>No hay categorías disponibles. Ve al panel de administración para agregar categorías.</p>
              </div>
            )}
            {!categoriesLoading && !categoriesError && categories.length > 0 && (
              <div className={styles.categoriesGrid}>
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={{
                      id: category.id,
                      name: category.name,
                      image: category.imageUrl
                    }}
                    onClick={handleCategoryClick}
                  />
                ))}
              </div>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Ofertas Especiales</h2>
            {productsLoading && (
              <div className={styles.loadingState}>
                <p>Cargando productos...</p>
              </div>
            )}
            {productsError && (
              <div className={styles.errorState}>
                <p>Error al cargar productos: {productsError.message}</p>
              </div>
            )}
            {!productsLoading && !productsError && products.length === 0 && (
              <div className={styles.emptyState}>
                <p>No hay productos disponibles. Ve al panel de administración para agregar productos.</p>
              </div>
            )}
            {!productsLoading && !productsError && products.length > 0 && (
              <div className={styles.productsGrid}>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={handleProductClick}
                  />
                ))}
              </div>
            )}
          </section>

          <section className={styles.callToAction}>
            <h2 className={styles.ctaTitle}>¡No te lo pierdas!</h2>
            <Button
              size="large"
              onClick={() => console.log("Shop the Sale clicked")}
            >
              Comprar Ahora
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};