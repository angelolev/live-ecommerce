export interface Review {
  id: string;
  productId: string;
  userId: string;
  customerName: string;
  avatar: string;
  date: Date;
  rating: number;
  comment: string;
  helpfulCount: number;
  notHelpfulCount: number;
}

export interface ReviewInput {
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
}

export interface FirestoreReview {
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: Date;
  helpfulCount: number;
  notHelpfulCount: number;
}
