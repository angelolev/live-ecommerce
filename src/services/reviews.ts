import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { ReviewInput, Review, FirestoreReview } from '../types/review';

const REVIEWS_COLLECTION = 'reviews';

/**
 * Add a new review to Firestore
 */
export const addReview = async (reviewInput: ReviewInput): Promise<string> => {
  try {
    const reviewData: Omit<FirestoreReview, 'createdAt'> & { createdAt: ReturnType<typeof serverTimestamp> } = {
      productId: reviewInput.productId,
      userId: reviewInput.userId,
      userName: reviewInput.userName,
      userAvatar: reviewInput.userAvatar,
      rating: reviewInput.rating,
      comment: reviewInput.comment,
      helpfulCount: 0,
      notHelpfulCount: 0,
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), reviewData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw new Error('Failed to add review');
  }
};

/**
 * Get all reviews for a specific product
 */
export const getReviews = async (productId: string): Promise<Review[]> => {
  try {
    const reviewsQuery = query(
      collection(db, REVIEWS_COLLECTION),
      where('productId', '==', productId),
      orderBy('createdAt', 'desc')
    );

    const querySnapshot = await getDocs(reviewsQuery);

    const reviews: Review[] = querySnapshot.docs.map(doc => {
      const data = doc.data() as FirestoreReview;

      // Convert Firestore Timestamp to Date
      const createdAt = data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : new Date(data.createdAt);

      return {
        id: doc.id,
        productId: data.productId,
        userId: data.userId,
        customerName: data.userName,
        avatar: data.userAvatar,
        date: createdAt,
        rating: data.rating,
        comment: data.comment,
        helpfulCount: data.helpfulCount,
        notHelpfulCount: data.notHelpfulCount
      };
    });

    return reviews;
  } catch (error) {
    console.error('Error getting reviews:', error);
    throw new Error('Failed to get reviews');
  }
};

/**
 * Calculate average rating for a product
 */
export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;

  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
};

/**
 * Calculate rating breakdown for a product
 */
export const calculateRatingBreakdown = (reviews: Review[]): { stars: number; percentage: number }[] => {
  const totalReviews = reviews.length;

  if (totalReviews === 0) {
    return [
      { stars: 5, percentage: 0 },
      { stars: 4, percentage: 0 },
      { stars: 3, percentage: 0 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 }
    ];
  }

  const breakdown = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(review => review.rating === stars).length;
    const percentage = (count / totalReviews) * 100;
    return { stars, percentage };
  });

  return breakdown;
};

/**
 * Check if a user has already reviewed a product
 */
export const hasUserReviewedProduct = async (productId: string, userId: string): Promise<boolean> => {
  try {
    const reviewsQuery = query(
      collection(db, REVIEWS_COLLECTION),
      where('productId', '==', productId),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(reviewsQuery);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking if user has reviewed product:', error);
    return false; // Return false on error to allow user to try submitting
  }
};
