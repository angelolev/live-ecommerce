import React from 'react';
import styles from './SizeSelector.module.css';

interface SizeSelectorProps {
  sizes: readonly string[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSizeSelect
}) => {
  return (
    <div className={styles.sizeSelector}>
      <h3 className={styles.label}>Size</h3>
      <div className={styles.sizes}>
        {sizes.map((size) => (
          <button
            key={size}
            className={`${styles.sizeButton} ${
              selectedSize === size ? styles.selected : ''
            }`}
            onClick={() => onSizeSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};