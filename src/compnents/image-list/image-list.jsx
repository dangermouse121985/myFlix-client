import React, { useState, useEffect } from 'react';

const ImageList = ({ images }) => {
  return (
    <div>
      <h2>Image From S3 Bucket</h2>
      <div className="image-list">
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ImageList;
