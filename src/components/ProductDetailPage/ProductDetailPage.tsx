import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Header } from '../Header/Header';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { ProductImageGallery } from '../ProductImageGallery/ProductImageGallery';
import { ProductInfo } from '../ProductInfo/ProductInfo';
import { RatingBreakdown } from '../RatingBreakdown/RatingBreakdown';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { ReviewForm } from '../ReviewForm/ReviewForm';
import { RelatedProducts } from '../RelatedProducts/RelatedProducts';
import { SEOHead } from '../SEOHead/SEOHead';
import { generateProductSchema, generateBreadcrumbSchema } from '../../utils/structuredData';
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
  offerPrice?: number;
  images: string[];
  availableSizes: readonly string[];
  availableColors: ProductColor[];
  rating: number;
  reviewCount: number;
  category: string;
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
  onAddReview: (rating: number, comment: string) => Promise<void>;
  userHasReviewed?: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  ratingBreakdown,
  reviews,
  onAddReview,
  userHasReviewed = false
}) => {
  const navigate = useNavigate();
  const { user, loginWithGoogle } = useAuth();

  // Generate category URL slug (lowercase, replace spaces with hyphens)
  const categorySlug = product.category.toLowerCase().replace(/\s+/g, '-');

  const breadcrumbItems = [
    { label: 'Inicio', href: '/', onClick: () => navigate('/') },
    { label: product.category, href: `/category/${categorySlug}`, onClick: () => navigate(`/category/${categorySlug}`) },
    { label: product.name }
  ];

  // Generate structured data
  const productSchema = generateProductSchema(product, reviews);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const structuredData = [productSchema, breadcrumbSchema];

  // Generate meta description from product description
  const metaDescription = product.description.length > 160
    ? product.description.substring(0, 157) + '...'
    : product.description;

  // Use product's first image or default
  const productImage = product.images[0]?.startsWith('http')
    ? product.images[0]
    : `https://live-ecommerce.com${product.images[0]}`;

  return (
    <div className={styles.page}>
      <SEOHead
        title={product.name}
        description={metaDescription}
        keywords={`${product.name}, ${product.category}, comprar ${product.name}, ${product.category} online`}
        image={productImage}
        url={`/product/${product.id}`}
        type="product"
        structuredData={structuredData}
      />
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
          <h2 className={styles.reviewsTitle}>Reseñas de Clientes</h2>

          <RatingBreakdown
            rating={product.rating}
            reviewCount={product.reviewCount}
            breakdown={ratingBreakdown}
          />

          {user ? (
            userHasReviewed ? (
              <div className={styles.alreadyReviewedMessage}>
                <p className={styles.messageText}>Ya has dejado una reseña para este producto</p>
                <p className={styles.messageSubtext}>Gracias por compartir tu opinión</p>
              </div>
            ) : (
              <ReviewForm
                user={user}
                onSubmit={onAddReview}
              />
            )
          ) : (
            <div className={styles.loginPrompt}>
              <p className={styles.loginMessage}>Inicia sesión para dejar tu reseña</p>
              <button onClick={loginWithGoogle} className={styles.loginButton}>
                Iniciar sesión con Google
              </button>
            </div>
          )}

          <div className={styles.reviewsList}>
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <p className={styles.noReviews}>
                Aún no hay reseñas. ¡Sé el primero en compartir tu opinión!
              </p>
            )}
          </div>
        </div>

        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </div>
  );
};