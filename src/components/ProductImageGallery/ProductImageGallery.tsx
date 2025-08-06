import React, { useState } from 'react';
import styles from './ProductImageGallery.module.css';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  productName
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageContainer}>
        <img
          src={images[selectedImageIndex]}
          alt={productName}
          className={styles.mainImage}
        />
      </div>
      
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${
                index === selectedImageIndex ? styles.active : ''
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={image}
                alt={`${productName} view ${index + 1}`}
                className={styles.thumbnailImage}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};