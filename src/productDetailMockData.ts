// Mock data for product detail page

// Product images for the gallery
export const mockProductImages = [
  "/images/dress-gallery.svg",
  "https://images.unsplash.com/photo-1637227285138-00771a4b93fc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMHx8d29tYW4lMjBkcmVzcyUyMGZhc2hpb258ZW58MHwxfHx8MTc1NDQ0NTU4NXww&ixlib=rb-4.1.0&q=85", 
  "https://images.unsplash.com/photo-1600095079058-d6db93225b44?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHx3b21hbiUyMGRyZXNzJTIwYmFja3xlbnwwfDF8fHwxNzU0NDQ1NTg1fDA&ixlib=rb-4.1.0&q=85"
];

// Main product data
export const mockProduct = {
  id: "floral-maxi-dress",
  name: "Vestido Maxi con Estampado Floral",
  description: "Este elegante vestido maxi presenta un vibrante estampado floral, perfecto para cualquier ocasión. Hecho de tela ligera, ofrece tanto estilo como comodidad.",
  price: 79.99,
  images: mockProductImages,
  category: "vestidos",
  availableSizes: ["XS", "S", "M", "L"] as const,
  availableColors: [
    { name: "amarillo" as const, hex: "#ffd600" },
    { name: "azul" as const, hex: "#0000ff" },
    { name: "rojo" as const, hex: "#ff0000" }
  ],
  rating: 4.5,
  reviewCount: 120
};

// Rating breakdown data
export const mockRatingBreakdown = [
  { stars: 5, percentage: 40 },
  { stars: 4, percentage: 30 },
  { stars: 3, percentage: 15 },
  { stars: 2, percentage: 10 },
  { stars: 1, percentage: 5 }
];

// Customer reviews data
export const mockReviews = [
  {
    id: "review-1",
    customerName: "Sophia Bennett",
    date: new Date("2023-08-15"),
    rating: 5,
    comment: "¡Absolutamente amo este vestido! El estampado floral es hermoso y la tela es muy cómoda. Me queda perfecto y he recibido muchos cumplidos.",
    avatar: "/images/avatar-sophia.png",
    helpfulCount: 5,
    notHelpfulCount: 1
  },
  {
    id: "review-2", 
    customerName: "Emily Harper",
    date: new Date("2023-07-22"),
    rating: 4,
    comment: "El vestido es encantador y los colores son vibrantes. El ajuste es fiel a la talla, pero la tela es un poco más delgada de lo esperado. En general, una gran compra.",
    avatar: "/images/avatar-emily.png",
    helpfulCount: 3,
    notHelpfulCount: 0
  }
];

// Props for the product detail page
export const mockProductDetailProps = {
  product: mockProduct,
  ratingBreakdown: mockRatingBreakdown,
  reviews: mockReviews
};

// String formatters
export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatPercentage = (value: number): string => {
  return `${value}%`;
};