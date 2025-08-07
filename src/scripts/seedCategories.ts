import { categoryService } from '../services/categoryService';
import type { CategoryFormData } from '../types/product';

const sampleCategories: CategoryFormData[] = [
  {
    name: "Men's Fashion",
    imageUrl: "/images/mens-fashion.png"
  },
  {
    name: "Women's Fashion",
    imageUrl: "/images/womens-fashion.png"
  },
  {
    name: "Accessories",
    imageUrl: "/images/accessories.png"
  },
  {
    name: "Shoes",
    imageUrl: "/images/shoes.png"
  }
];

const seedCategories = async () => {
  console.log('Starting to seed categories...');
  
  try {
    for (const category of sampleCategories) {
      const id = await categoryService.createCategory(category);
      console.log(`Created category: ${category.name} with ID: ${id}`);
    }
    
    console.log('Successfully seeded all categories!');
  } catch (error) {
    console.error('Error seeding categories:', error);
  }
};

// Run seed function if this file is executed directly
// if (import.meta.url === `file://${process.argv[1]}`) {
//   seedCategories();
// }

export { seedCategories };