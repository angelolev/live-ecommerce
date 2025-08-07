import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ProductDetailPage } from '../ProductDetailPage/ProductDetailPage';
import { useProduct } from '../../hooks/useProducts';

export const ProductDetailWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id || '');

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
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

  // Create a proper product object with all required fields
  const enhancedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    images: product.images,
    availableSizes: ["XS", "S", "M", "L", "XL"] as const,
    availableColors: [
      { name: "negro" as const, hex: "#000000" },
      { name: "blanco" as const, hex: "#ffffff" },
      { name: "azul" as const, hex: "#0000ff" }
    ],
    rating: 0,
    reviewCount: 0
  };

  // Empty rating breakdown and reviews
  const emptyRatingBreakdown = [
    { stars: 5, percentage: 0 },
    { stars: 4, percentage: 0 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 }
  ];

  const emptyReviews: any[] = [];

  return (
    <ProductDetailPage
      product={enhancedProduct}
      ratingBreakdown={emptyRatingBreakdown}
      reviews={emptyReviews}
    />
  );
};