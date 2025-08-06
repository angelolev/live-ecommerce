import React from 'react';
import SingleStarIcon from '../icons/SingleStarIcon';
import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  showRating?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'medium',
  showRating = false
}) => {
  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= Math.floor(rating);
    
    return (
      <SingleStarIcon
        key={index}
        width={size === 'small' ? 16 : size === 'large' ? 24 : 20}
        height={size === 'small' ? 16 : size === 'large' ? 24 : 20}
        filled={isFilled}
        className={`${styles.star} ${isFilled ? styles.filled : styles.empty}`}
      />
    );
  });

  return (
    <div className={styles.starRating}>
      <div className={styles.stars}>
        {stars}
      </div>
      {showRating && (
        <span className={styles.ratingText}>{rating.toFixed(1)}</span>
      )}
    </div>
  );
};