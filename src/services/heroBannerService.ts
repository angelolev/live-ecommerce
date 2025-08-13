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
  Timestamp,
  limit,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { HeroBanner, HeroBannerFormData } from '../types/product';

const COLLECTION_NAME = 'heroBanners';

// Helper to deactivate all other active banners
async function deactivateAllBanners() {
  const q = query(collection(db, COLLECTION_NAME), where('isActive', '==', true));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return;
  }

  const batch = writeBatch(db);
  querySnapshot.docs.forEach(doc => {
    batch.update(doc.ref, { isActive: false });
  });

  await batch.commit();
}

export const heroBannerService = {
  // Get all hero banners
  async getAll(): Promise<HeroBanner[]> {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as HeroBanner[];
  },

  // Get active hero banner
  async getActive(): Promise<HeroBanner | null> {
    const q = query(
      collection(db, COLLECTION_NAME), 
      where('isActive', '==', true),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    } as HeroBanner;
  },

  // Get hero banner by ID
  async getById(id: string): Promise<HeroBanner | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as HeroBanner;
    }
    
    return null;
  },

  // Create new hero banner
  async create(data: HeroBannerFormData): Promise<HeroBanner> {
    if (data.isActive) {
      await deactivateAllBanners();
    }

    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: now,
      updatedAt: now,
    });
    
    return {
      id: docRef.id,
      ...data,
      createdAt: now.toDate(),
      updatedAt: now.toDate(),
    };
  },

  // Update hero banner
  async update(id: string, data: HeroBannerFormData): Promise<HeroBanner> {
    if (data.isActive) {
      await deactivateAllBanners();
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    const now = Timestamp.now();
    
    await updateDoc(docRef, {
      ...data,
      updatedAt: now,
    });
    
    return {
      id,
      ...data,
      createdAt: new Date(), // This would be fetched in a real scenario
      updatedAt: now.toDate(),
    };
  },

  // Delete hero banner
  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },
};
