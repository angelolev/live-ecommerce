import React from "react";
import type { Product } from "../../types/product";
import { formatPrice } from "../../ecommerceMockData";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  onClick?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
}) => {
  const hasOffer = product.offerPrice !== undefined && product.offerPrice !== null && product.offerPrice > 0;

  return (
    <div className={styles.productCard} onClick={() => onClick?.(product.id)}>
      {hasOffer && (
        <div className={styles.offerBadge}>OFERTA</div>
      )}
      <img src={product.images[0]} alt={product.name} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.priceContainer}>
          {hasOffer ? (
            <>
              <p className={styles.offerPrice}>{formatPrice(product.offerPrice!)}</p>
              <p className={styles.originalPrice}>{formatPrice(product.price)}</p>
            </>
          ) : (
            <p className={styles.price}>{formatPrice(product.price)}</p>
          )}
        </div>
      </div>
    </div>
  );
};
