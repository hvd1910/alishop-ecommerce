import React, { Fragment } from 'react';

const StarRating = ({ rating }) => {
  // Tạo mảng chứa 5 giá trị, dựa trên giá trị rating để xác định số sao được đánh giá
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);
  return (
    <Fragment>
      {stars.map((isRated, index) => (
        <i 
          key={index} 
          className={`mdi mdi-star ${isRated ? 'is-rated' : ''}`}
        ></i>
      ))}
    </Fragment>
  );
};

export default StarRating;
