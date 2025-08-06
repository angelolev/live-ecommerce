import { productService } from '../services/productService';
import type { ProductFormData } from '../types/product';

const sampleProducts: ProductFormData[] = [
  {
    name: "Cozy Winter Jacket",
    description: "Stay warm and stylish with this premium winter jacket featuring water-resistant fabric and insulated lining. Perfect for cold weather adventures.",
    price: 79.99,
    images: [
      "/images/winter-jacket.png",
      "https://images.unsplash.com/photo-1544966503-7e9635fae8f4?w=500",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"
    ],
    category: "Men's Fashion"
  },
  {
    name: "Elegant Evening Dress",
    description: "Make a statement at any formal event with this elegant evening dress. Features a flattering silhouette and high-quality fabric that drapes beautifully.",
    price: 59.99,
    images: [
      "/images/evening-dress.png",
      "https://images.unsplash.com/photo-1566479547943-b9b94b9f3ad6?w=500",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500"
    ],
    category: "Women's Fashion"
  },
  {
    name: "Fashionable Running Shoes",
    description: "Comfortable and stylish running shoes designed for performance and everyday wear. Features breathable mesh upper and cushioned sole for all-day comfort.",
    price: 49.99,
    images: [
      "/images/running-shoes.png",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    ],
    category: "Shoes"
  },
  {
    name: "Modern Wrist Watch",
    description: "A sophisticated timepiece that combines classic design with modern functionality. Features stainless steel construction and water resistance.",
    price: 99.99,
    images: [
      "/images/wrist-watch.png",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500"
    ],
    category: "Accessories"
  },
  {
    name: "Classic Denim Jeans",
    description: "Timeless denim jeans with a comfortable fit and durable construction. Perfect for casual wear and built to last through countless washes.",
    price: 39.99,
    images: [
      "/images/denim-jeans.png"
    ],
    category: "Men's Fashion"
  },
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium wireless headphones with noise cancellation and superior sound quality. Long battery life and comfortable over-ear design.",
    price: 129.99,
    images: [
      "/images/bluetooth-headphones.png",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    ],
    category: "Electronics"
  }
];

export const seedProducts = async () => {
  console.log('Starting to seed products...');
  
  try {
    for (const product of sampleProducts) {
      const id = await productService.createProduct(product);
      console.log(`Created product: ${product.name} (ID: ${id})`);
    }
    
    console.log('Successfully seeded all products!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

// Run this script directly if called
// Commented out for build compatibility
// if (import.meta.url === `file://${process.argv[1]}`) {
//   seedProducts();
// }