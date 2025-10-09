// Utility functions to generate Schema.org structured data

const BASE_URL = 'https://live-ecommerce.com';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  offerPrice?: number;
  images: string[];
  rating?: number;
  reviewCount?: number;
  category: string;
  brand?: string;
  sku?: string;
}

interface Review {
  id: string;
  customerName: string;
  date: Date;
  rating: number;
  comment: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Generate Product structured data
 */
export const generateProductSchema = (product: Product, reviews?: Review[]) => {
  const offers = {
    '@type': 'Offer',
    url: `${BASE_URL}/product/${product.id}`,
    priceCurrency: 'USD',
    price: product.offerPrice || product.price,
    priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
  };

  const aggregateRating = product.rating && product.reviewCount ? {
    '@type': 'AggregateRating',
    ratingValue: product.rating,
    reviewCount: product.reviewCount,
    bestRating: 5,
    worstRating: 1,
  } : undefined;

  const reviewsSchema = reviews && reviews.length > 0 ? reviews.map(review => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.customerName,
    },
    datePublished: review.date.toISOString(),
    reviewBody: review.comment,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
  })) : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images.map(img => img.startsWith('http') ? img : `${BASE_URL}${img}`),
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Live E-commerce',
    },
    sku: product.sku || product.id,
    offers,
    ...(aggregateRating && { aggregateRating }),
    ...(reviewsSchema && reviewsSchema.length > 0 && { review: reviewsSchema }),
  };
};

/**
 * Generate BreadcrumbList structured data
 */
export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${BASE_URL}${item.href}` }),
    })),
  };
};

/**
 * Generate ItemList structured data (for product listings)
 */
export const generateItemListSchema = (products: Product[], listName: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        image: product.images[0]?.startsWith('http')
          ? product.images[0]
          : `${BASE_URL}${product.images[0]}`,
        url: `${BASE_URL}/product/${product.id}`,
        offers: {
          '@type': 'Offer',
          price: product.offerPrice || product.price,
          priceCurrency: 'USD',
        },
      },
    })),
  };
};

/**
 * Generate CollectionPage structured data (for category pages)
 */
export const generateCollectionPageSchema = (categoryName: string, description?: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryName,
    description: description || `Explora nuestra colección de ${categoryName.toLowerCase()}`,
    url: `${BASE_URL}/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`,
  };
};

/**
 * Generate SearchResultsPage structured data
 */
export const generateSearchResultsSchema = (searchTerm: string, resultsCount: number) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: `Resultados de búsqueda para "${searchTerm}"`,
    description: `${resultsCount} resultados encontrados para "${searchTerm}"`,
    url: `${BASE_URL}/search?q=${encodeURIComponent(searchTerm)}`,
  };
};

/**
 * Generate FAQ structured data
 */
export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Generate OfferCatalog structured data (for deals/offers page)
 */
export const generateOfferCatalogSchema = (products: Product[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Ofertas Especiales',
    description: 'Las mejores ofertas y descuentos en Live E-commerce',
    itemListElement: products.map(product => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Product',
        name: product.name,
        image: product.images[0]?.startsWith('http')
          ? product.images[0]
          : `${BASE_URL}${product.images[0]}`,
      },
      price: product.offerPrice || product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/product/${product.id}`,
    })),
  };
};
