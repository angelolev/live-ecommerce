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

  // Mock reviews data
  const mockReviews = [
    {
      id: '1',
      customerName: 'María González',
      date: new Date('2024-01-15'),
      rating: 5,
      comment: 'Excelente producto, superó mis expectativas. La calidad es muy buena y llegó en perfectas condiciones. Totalmente recomendable.',
      avatar: 'https://i.pravatar.cc/150?img=1',
      helpfulCount: 12,
      notHelpfulCount: 1
    },
    {
      id: '2',
      customerName: 'Carlos Rodríguez',
      date: new Date('2024-01-10'),
      rating: 4,
      comment: 'Muy buen producto en general. La única observación es que el envío tardó un poco más de lo esperado, pero el artículo es tal como se describe.',
      avatar: 'https://i.pravatar.cc/150?img=12',
      helpfulCount: 8,
      notHelpfulCount: 0
    },
    {
      id: '3',
      customerName: 'Ana Martínez',
      date: new Date('2024-01-05'),
      rating: 5,
      comment: '¡Me encantó! Justo lo que estaba buscando. La relación calidad-precio es inmejorable. Sin duda volveré a comprar.',
      avatar: 'https://i.pravatar.cc/150?img=5',
      helpfulCount: 15,
      notHelpfulCount: 0
    }
  ];

  // Calculate rating breakdown based on mock reviews
  const calculateRatingBreakdown = (reviews: typeof mockReviews) => {
    const totalReviews = reviews.length;
    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    reviews.forEach(review => {
      starCounts[review.rating as keyof typeof starCounts]++;
    });

    return [
      { stars: 5, percentage: (starCounts[5] / totalReviews) * 100 },
      { stars: 4, percentage: (starCounts[4] / totalReviews) * 100 },
      { stars: 3, percentage: (starCounts[3] / totalReviews) * 100 },
      { stars: 2, percentage: (starCounts[2] / totalReviews) * 100 },
      { stars: 1, percentage: (starCounts[1] / totalReviews) * 100 }
    ];
  };

  // Calculate average rating
  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;

  // Rating breakdown
  const ratingBreakdown = calculateRatingBreakdown(mockReviews);

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
    reviewCount: mockReviews.length
  };

  return (
    <ProductDetailPage
      product={enhancedProduct}
      ratingBreakdown={ratingBreakdown}
      reviews={mockReviews}
    />
  );
};