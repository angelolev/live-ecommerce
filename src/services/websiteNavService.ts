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
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { WebsiteNavItem, WebsiteNavItemFormData } from '../types/product';

const COLLECTION_NAME = 'websiteNavigation';

// Default navigation items based on current hardcoded menu
const defaultNavItems: Omit<WebsiteNavItemFormData, 'order'>[] = [
  {
    title: 'Novedades',
    url: '/category/novedades',
    type: 'category',
    enabled: true,
    openInNewTab: false,
  },
  {
    title: 'Hombre',
    url: '/category/hombre',
    type: 'category',
    enabled: true,
    openInNewTab: false,
  },
  {
    title: 'Mujer',
    url: '/category/mujer',
    type: 'category',
    enabled: true,
    openInNewTab: false,
  },
  {
    title: 'Accesorios',
    url: '/category/accesorios',
    type: 'category',
    enabled: true,
    openInNewTab: false,
  },
  {
    title: 'Ofertas',
    url: '/category/ofertas',
    type: 'category',
    enabled: true,
    openInNewTab: false,
  },
];

export const websiteNavService = {
  async getAllWebsiteNavItems(): Promise<WebsiteNavItem[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as WebsiteNavItem[];

      // If no items exist, initialize with default navigation
      if (items.length === 0) {
        await this.initializeDefaultNavigation();
        return await this.getAllWebsiteNavItems();
      }

      return items;
    } catch (error) {
      console.error('Error fetching website navigation items:', error);
      throw new Error('Failed to fetch website navigation items');
    }
  },

  async getWebsiteNavItemById(id: string): Promise<WebsiteNavItem | null> {
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
        } as WebsiteNavItem;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching website navigation item:', error);
      throw new Error('Failed to fetch website navigation item');
    }
  },

  async createWebsiteNavItem(itemData: WebsiteNavItemFormData): Promise<string> {
    try {
      const now = Timestamp.now();
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...itemData,
        createdAt: now,
        updatedAt: now,
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating website navigation item:', error);
      throw new Error('Failed to create website navigation item');
    }
  },

  async updateWebsiteNavItem(id: string, itemData: WebsiteNavItemFormData): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...itemData,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error updating website navigation item:', error);
      throw new Error('Failed to update website navigation item');
    }
  },

  async deleteWebsiteNavItem(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting website navigation item:', error);
      throw new Error('Failed to delete website navigation item');
    }
  },

  async initializeDefaultNavigation(): Promise<void> {
    try {
      const now = Timestamp.now();
      const promises = defaultNavItems.map((item, index) => 
        addDoc(collection(db, COLLECTION_NAME), {
          ...item,
          order: index + 1,
          createdAt: now,
          updatedAt: now,
        })
      );
      
      await Promise.all(promises);
    } catch (error) {
      console.error('Error initializing default website navigation:', error);
      throw new Error('Failed to initialize default website navigation');
    }
  },

  async getEnabledWebsiteNavItems(): Promise<WebsiteNavItem[]> {
    try {
      const allItems = await this.getAllWebsiteNavItems();
      return allItems
        .filter(item => item.enabled)
        .sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching enabled website navigation items:', error);
      throw new Error('Failed to fetch enabled website navigation items');
    }
  },

  // Helper method to validate URLs
  validateUrl(url: string, type: 'internal' | 'external' | 'category'): boolean {
    if (type === 'external') {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    }
    
    if (type === 'internal' || type === 'category') {
      return url.startsWith('/') && url.length > 1;
    }
    
    return false;
  }
};