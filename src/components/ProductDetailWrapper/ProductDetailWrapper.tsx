import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ProductDetailPage } from '../ProductDetailPage/ProductDetailPage';
import { useProduct } from '../../hooks/useProducts';
import { mockProductDetailProps } from '../../productDetailMockData';

export const ProductDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id || '');

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (error) {
    return <div>Error loading product: {error}</div>;
  }

  if (!product) {
    return <Navigate to="/" replace />;
  }

  const enhancedProduct = {
    ...mockProductDetailProps.product,
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    images: product.images
  };

  return (
    <ProductDetailPage
      product={enhancedProduct}
      ratingBreakdown={mockProductDetailProps.ratingBreakdown}
      reviews={mockProductDetailProps.reviews}
    />
  );
};