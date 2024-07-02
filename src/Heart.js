import React from 'react';

const Heart = ({ filled }) => {
  const heartStyle = {
    color: filled ? 'red' : 'gray',
    fontSize: '2rem', // Adjust font size as needed
  };

  return (
    <i className="fas fa-heart" style={heartStyle}></i>
  );
};

export default Heart;
