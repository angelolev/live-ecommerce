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
import type { CountdownTimer, CountdownTimerFormData } from '../types/product';

const COLLECTION_NAME = 'countdownTimers';

async function deactivateAllTimers() {
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

export const countdownTimerService = {
  async getAll(): Promise<CountdownTimer[]> {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate?.toDate() || new Date(),
      endDate: doc.data().endDate?.toDate() || new Date(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as CountdownTimer[];
  },

  async getActive(): Promise<CountdownTimer | null> {
    const now = new Date();
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
    const timer = {
      id: doc.id,
      ...doc.data(),
      startDate: doc.data().startDate?.toDate() || new Date(),
      endDate: doc.data().endDate?.toDate() || new Date(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    } as CountdownTimer;

    if (now >= timer.startDate && now <= timer.endDate) {
      return timer;
    }

    return null;
  },

  async getById(id: string): Promise<CountdownTimer | null> {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        startDate: docSnap.data().startDate?.toDate() || new Date(),
        endDate: docSnap.data().endDate?.toDate() || new Date(),
        createdAt: docSnap.data().createdAt?.toDate() || new Date(),
        updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
      } as CountdownTimer;
    }
    
    return null;
  },

  async create(data: CountdownTimerFormData): Promise<CountdownTimer> {
    if (data.isActive) {
      await deactivateAllTimers();
    }

    const now = Timestamp.now();
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      startDate: Timestamp.fromDate(data.startDate),
      endDate: Timestamp.fromDate(data.endDate),
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

  async update(id: string, data: CountdownTimerFormData): Promise<CountdownTimer> {
    if (data.isActive) {
      await deactivateAllTimers();
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    const now = Timestamp.now();
    
    await updateDoc(docRef, {
      ...data,
      startDate: Timestamp.fromDate(data.startDate),
      endDate: Timestamp.fromDate(data.endDate),
      updatedAt: now,
    });
    
    return {
      id,
      ...data,
      createdAt: new Date(),
      updatedAt: now.toDate(),
    };
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },
};