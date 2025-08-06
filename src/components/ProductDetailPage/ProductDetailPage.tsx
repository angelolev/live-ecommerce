import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { ProductImageGallery } from '../ProductImageGallery/ProductImageGallery';
import { ProductInfo } from '../ProductInfo/ProductInfo';
import { RatingBreakdown } from '../RatingBreakdown/RatingBreakdown';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import styles from './ProductDetailPage.module.css';

interface ProductColor {
  name: string;
  hex: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  availableSizes: readonly string[];
  availableColors: ProductColor[];
  rating: number;
  reviewCount: number;
}

interface RatingBreakdownItem {
  stars: number;
  percentage: number;
}

interface Review {
  id: string;
  customerName: string;
  date: Date;
  rating: number;
  comment: string;
  avatar: string;
  helpfulCount: number;
  notHelpfulCount: number;
}

interface ProductDetailPageProps {
  product: Product;
  ratingBreakdown: RatingBreakdownItem[];
  reviews: Review[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  ratingBreakdown,
  reviews
}) => {
  const navigate = useNavigate();
  const breadcrumbItems = [
    { label: 'Home', href: '#', onClick: () => navigate('/') },
    { label: 'Women', href: '#' },
    { label: 'Clothing' }
  ];

  return (
    <div className={styles.page}>
      <Header />
      
      <div className={styles.container}>
        <Breadcrumb items={breadcrumbItems} />
        
        <div className={styles.productSection}>
          <div className={styles.imageSection}>
            <ProductImageGallery 
              images={product.images} 
              productName={product.name}
            />
          </div>
          
          <div className={styles.infoSection}>
            <ProductInfo product={product} />
          </div>
        </div>
        
        <div className={styles.reviewsSection}>
          <h2 className={styles.reviewsTitle}>Customer Reviews</h2>
          
          <RatingBreakdown
            rating={product.rating}
            reviewCount={product.reviewCount}
            breakdown={ratingBreakdown}
          />
          
          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};