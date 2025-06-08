import React from 'react';
import { motion } from 'framer-motion';
import './Forum.css';

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
  readonly?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRate,
  readonly = false
}) => {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          className={`star ${star <= rating ? 'active' : ''}`}
          onClick={() => !readonly && onRate(star)}
          disabled={readonly}
          whileHover={!readonly ? { scale: 1.2 } : undefined}
          whileTap={!readonly ? { scale: 0.9 } : undefined}
        >
          ⭐
        </motion.button>
      ))}
      <span className="rating-value">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating; 