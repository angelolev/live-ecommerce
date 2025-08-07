import React from 'react';
import { StarRating } from '../StarRating/StarRating';
import { formatRating, formatPercentage } from '../../productDetailMockData';
import styles from './RatingBreakdown.module.css';

interface RatingBreakdownItem {
  stars: number;
  percentage: number;
}

interface RatingBreakdownProps {
  rating: number;
  reviewCount: number;
  breakdown: RatingBreakdownItem[];
}

export const RatingBreakdown: React.FC<RatingBreakdownProps> = ({
  rating,
  reviewCount,
  breakdown
}) => {
  return (
    <div className={styles.ratingBreakdown}>
      <div className={styles.overallRating}>
        <div className={styles.ratingNumber}>{formatRating(rating)}</div>
        <StarRating rating={rating} size="small" />
        <div className={styles.reviewCount}>{reviewCount} reseñas</div>
      </div>
      
      <div className={styles.breakdown}>
        {breakdown.map((item) => (
          <div key={item.stars} className={styles.breakdownRow}>
            <span className={styles.starLabel}>{item.stars}</span>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className={styles.percentage}>
              {formatPercentage(item.percentage)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};