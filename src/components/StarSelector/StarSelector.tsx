import React, { useState } from 'react';
import SingleStarIcon from '../icons/SingleStarIcon';
import styles from './StarSelector.module.css';

interface StarSelectorProps {
  selectedRating: number;
  onRatingChange: (rating: number) => void;
  maxRating?: number;
}

export const StarSelector: React.FC<StarSelectorProps> = ({
  selectedRating,
  onRatingChange,
  maxRating = 5
}) => {
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (rating: number) => {
    onRatingChange(rating);
  };

  const displayRating = hoverRating || selectedRating;

  return (
    <div className={styles.starSelector}>
      <div className={styles.stars}>
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayRating;

          return (
            <button
              key={index}
              type="button"
              className={styles.starButton}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(starValue)}
              aria-label={`Calificar con ${starValue} estrella${starValue !== 1 ? 's' : ''}`}
            >
              <SingleStarIcon
                width={32}
                height={32}
                filled={isFilled}
                className={`${styles.star} ${isFilled ? styles.filled : styles.empty}`}
              />
            </button>
          );
        })}
      </div>
      {selectedRating > 0 && (
        <span className={styles.ratingText}>
          {selectedRating} de {maxRating} estrella{selectedRating !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
};
