import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Product, ProductFormData } from '../types/product';

const COLLECTION_NAME = 'products';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Product[];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Product;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  },

  async createProduct(productData: ProductFormData): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...productData,
        createdAt: now,
        updatedAt: now,
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  },

  async updateProduct(id: string, productData: ProductFormData): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...productData,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Failed to update product');
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Failed to delete product');
    }
  },

  async getProductsByCategory(categoryName: string): Promise<Product[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('category', '==', categoryName),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Product[];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }
  },

  async getProductsWithFilters(filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | 'oldest';
  }): Promise<Product[]> {
    try {
      let q = collection(db, COLLECTION_NAME);
      const constraints = [];

      // Add category filter if specified
      if (filters.category) {
        constraints.push(where('category', '==', filters.category));
      }

      // Add sorting
      switch (filters.sortBy) {
        case 'price-asc':
          constraints.push(orderBy('price', 'asc'));
          break;
        case 'price-desc':
          constraints.push(orderBy('price', 'desc'));
          break;
        case 'name-asc':
          constraints.push(orderBy('name', 'asc'));
          break;
        case 'name-desc':
          constraints.push(orderBy('name', 'desc'));
          break;
        case 'oldest':
          constraints.push(orderBy('createdAt', 'asc'));
          break;
        case 'newest':
        default:
          constraints.push(orderBy('createdAt', 'desc'));
          break;
      }

      const querySnapshot = await getDocs(query(q, ...constraints));
      
      let products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as Product[];

      // Apply price filters in memory (Firebase doesn't support range queries with other filters easily)
      if (filters.minPrice !== undefined) {
        products = products.filter(product => product.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        products = products.filter(product => product.price <= filters.maxPrice!);
      }

      return products;
    } catch (error) {
      console.error('Error fetching products with filters:', error);
      throw new Error('Failed to fetch products with filters');
    }
  },
};