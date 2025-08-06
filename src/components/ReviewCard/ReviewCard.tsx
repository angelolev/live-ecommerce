import React, { useState } from 'react';
import { StarRating } from '../StarRating/StarRating';
import ThumbsUpIcon from '../icons/ThumbsUpIcon';
import ThumbsDownIcon from '../icons/ThumbsDownIcon';
import { formatDate } from '../../productDetailMockData';
import styles from './ReviewCard.module.css';

interface Review {
  id: string;
  customerName: string;
  date: Date;
  rating: number;
  comment: string;
  avatar: string;
  helpfulCount: number;
  notHelpfulCount: number;
}

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [userVote, setUserVote] = useState<'helpful' | 'not-helpful' | null>(null);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [notHelpfulCount, setNotHelpfulCount] = useState(review.notHelpfulCount);

  const handleVote = (voteType: 'helpful' | 'not-helpful') => {
    if (userVote === voteType) {
      // Remove vote
      if (voteType === 'helpful') {
        setHelpfulCount(prev => prev - 1);
      } else {
        setNotHelpfulCount(prev => prev - 1);
      }
      setUserVote(null);
    } else {
      // Change or add vote
      if (userVote === 'helpful') {
        setHelpfulCount(prev => prev - 1);
        setNotHelpfulCount(prev => prev + 1);
      } else if (userVote === 'not-helpful') {
        setNotHelpfulCount(prev => prev - 1);
        setHelpfulCount(prev => prev + 1);
      } else {
        if (voteType === 'helpful') {
          setHelpfulCount(prev => prev + 1);
        } else {
          setNotHelpfulCount(prev => prev + 1);
        }
      }
      setUserVote(voteType);
    }
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.header}>
        <img 
          src={review.avatar} 
          alt={review.customerName}
          className={styles.avatar}
        />
        <div className={styles.customerInfo}>
          <h4 className={styles.customerName}>{review.customerName}</h4>
          <p className={styles.date}>{formatDate(review.date)}</p>
        </div>
      </div>
      
      <StarRating rating={review.rating} size="small" />
      
      <p className={styles.comment}>{review.comment}</p>
      
      <div className={styles.actions}>
        <button 
          className={`${styles.voteButton} ${userVote === 'helpful' ? styles.active : ''}`}
          onClick={() => handleVote('helpful')}
        >
          <ThumbsUpIcon width={20} height={20} />
          <span>{helpfulCount}</span>
        </button>
        
        {notHelpfulCount > 0 && (
          <button 
            className={`${styles.voteButton} ${userVote === 'not-helpful' ? styles.active : ''}`}
            onClick={() => handleVote('not-helpful')}
          >
            <ThumbsDownIcon width={20} height={20} />
            <span>{notHelpfulCount}</span>
          </button>
        )}
      </div>
    </div>
  );
};