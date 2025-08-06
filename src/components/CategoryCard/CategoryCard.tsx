import React from "react";
import type { CategoryData } from "../../ecommerceMockData";
import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  category: CategoryData;
  onClick?: (categoryId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onClick,
}) => {
  return (
    <div className={styles.categoryCard} onClick={() => onClick?.(category.id)}>
      <img src={category.image} alt={category.name} className={styles.image} />
      <h3 className={styles.title}>{category.name}</h3>
    </div>
  );
};
