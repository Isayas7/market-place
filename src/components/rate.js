import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ totalStars }) => {
  const [rating, setRating] = useState(2.5);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
  };

  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              className="hidden"
              name="rating"
              value={starValue}
              onClick={() => handleClick(starValue)}
            />
            <FaStar
              className="star"
              color={
                starValue <= (hoverRating || rating) ? "#ffc107" : "#e4e5e9"
              }
              size={25}
              onMouseOver={() => handleMouseOver(starValue)}
              onMouseLeave={handleMouseLeave}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
