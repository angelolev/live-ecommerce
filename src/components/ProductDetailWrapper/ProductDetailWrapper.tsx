import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ProductDetailPage } from '../ProductDetailPage/ProductDetailPage';
import { useProduct } from '../../hooks/useProducts';
import { useAuth } from '../../hooks/useAuth';
import { addReview, getReviews, calculateAverageRating, calculateRatingBreakdown, hasUserReviewedProduct } from '../../services/reviews';
import type { Review } from '../../types/review';

export const ProductDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id || '');
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  // Load reviews when product ID is available
  useEffect(() => {
    const loadReviews = async () => {
      if (!id) return;

      setLoadingReviews(true);
      try {
        const productReviews = await getReviews(id);
        setReviews(productReviews);

        // Check if current user has already reviewed this product
        if (user) {
          const hasReviewed = await hasUserReviewedProduct(id, user.uid);
          setUserHasReviewed(hasReviewed);
        }
      } catch (err) {
        console.error('Error loading reviews:', err);
        // Keep reviews as empty array on error
      } finally {
        setLoadingReviews(false);
      }
    };

    loadReviews();
  }, [id, user]);

  // Handle adding a new review
  const handleAddReview = async (rating: number, comment: string) => {
    if (!user || !id) {
      throw new Error('User must be logged in to submit a review');
    }

    const reviewInput = {
      productId: id,
      userId: user.uid,
      userName: user.displayName || 'Usuario Anónimo',
      userAvatar: user.photoURL || '/images/default-avatar.png',
      rating,
      comment
    };

    // Add review to Firestore
    await addReview(reviewInput);

    // Reload reviews to show the new one
    const updatedReviews = await getReviews(id);
    setReviews(updatedReviews);

    // Update userHasReviewed state
    setUserHasReviewed(true);
  };

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (loading || loadingReviews) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '1.1rem',
        color: '#6b7280'
      }}>
        Cargando producto...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '1.1rem',
        color: '#dc2626',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div>
          <p>Error al cargar el producto: {typeof error === 'string' ? error : (error as Error)?.message || 'Error desconocido'}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/" replace />;
  }

  // Calculate average rating and rating breakdown from real reviews
  const averageRating = reviews.length > 0 ? calculateAverageRating(reviews) : 0;
  const ratingBreakdown = calculateRatingBreakdown(reviews);

  // Create a proper product object with all required fields
  const enhancedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    offerPrice: product.offerPrice,
    images: product.images,
    category: product.category,
    availableSizes: ["XS", "S", "M", "L", "XL"] as const,
    availableColors: [
      { name: "negro" as const, hex: "#000000" },
      { name: "blanco" as const, hex: "#ffffff" },
      { name: "azul" as const, hex: "#0000ff" }
    ],
    rating: averageRating,
    reviewCount: reviews.length
  };

  return (
    <ProductDetailPage
      product={enhancedProduct}
      ratingBreakdown={ratingBreakdown}
      reviews={reviews}
      onAddReview={handleAddReview}
      userHasReviewed={userHasReviewed}
    />
  );
};