import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header/Header";
import { HeroBanner } from "../HeroBanner/HeroBanner";
import { CountdownTimer } from "../CountdownTimer/CountdownTimer";
import { CategoryCard } from "../CategoryCard/CategoryCard";
import { ProductCard } from "../ProductCard/ProductCard";
import { Button } from "../Button/Button";
import { useProducts } from "../../hooks/useProducts";
import type { CountdownData, CategoryData } from "../../ecommerceMockData";
import styles from "./EcommerceHomepage.module.css";

interface EcommerceHomepageProps {
  countdown: CountdownData;
  featuredCategories: CategoryData[];
}

export const EcommerceHomepage: React.FC<EcommerceHomepageProps> = ({
  countdown,
  featuredCategories,
}) => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const handleCategoryClick = (categoryId: string) => {
    console.log("Category clicked:", categoryId);
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

          <CountdownTimer countdown={countdown} />

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Featured Categories</h2>
            <div className={styles.categoriesGrid}>
              {featuredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={handleCategoryClick}
                />
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Top Deals</h2>
            {loading && <p>Loading products...</p>}
            {error && <p>Error loading products: {error}</p>}
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          </section>

          <section className={styles.callToAction}>
            <h2 className={styles.ctaTitle}>Don't Miss Out!</h2>
            <Button
              size="large"
              onClick={() => console.log("Shop the Sale clicked")}
            >
              Shop the Sale
            </Button>
          </section>
        </div>
      </main>
    </div>
  );
};