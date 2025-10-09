import React, { useState } from 'react';
import { StarSelector } from '../StarSelector/StarSelector';
import type { AuthUser } from '../../types/auth';
import styles from './ReviewForm.module.css';

interface ReviewFormProps {
  user: AuthUser;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

const MAX_COMMENT_LENGTH = 200;

export const ReviewForm: React.FC<ReviewFormProps> = ({ user, onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const isValid = rating > 0 && comment.trim().length > 0 && comment.length <= MAX_COMMENT_LENGTH;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onSubmit(rating, comment.trim());

      // Reset form on success
      setRating(0);
      setComment('');
    } catch (err) {
      setError('Error al enviar la reseña. Por favor, intenta de nuevo.');
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const remainingChars = MAX_COMMENT_LENGTH - comment.length;

  return (
    <div className={styles.reviewForm}>
      <div className={styles.header}>
        <img
          src={user.photoURL || '/images/default-avatar.png'}
          alt={user.displayName || 'Usuario'}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <h3 className={styles.userName}>{user.displayName || 'Usuario'}</h3>
          <p className={styles.subtitle}>Comparte tu experiencia con este producto</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Calificación <span className={styles.required}>*</span>
          </label>
          <StarSelector
            selectedRating={rating}
            onRatingChange={setRating}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comment" className={styles.label}>
            Tu opinión <span className={styles.required}>*</span>
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Cuéntanos sobre tu experiencia con este producto..."
            className={styles.textarea}
            maxLength={MAX_COMMENT_LENGTH}
            rows={4}
            disabled={isSubmitting}
          />
          <div className={styles.charCounter}>
            <span className={remainingChars < 20 ? styles.warning : ''}>
              {comment.length}/{MAX_COMMENT_LENGTH} caracteres
            </span>
          </div>
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Publicar Reseña'}
        </button>
      </form>
    </div>
  );
};
