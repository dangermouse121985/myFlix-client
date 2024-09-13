import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ImageList = ({ images, resizedImages }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl); // Set the selected image to open in modal
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="image-list">
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            className="thumbnail"
            onClick={handleImageClick(images[index])}
          />
        ))}
      </div>
      {/* Modal for displaying original image */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        contentLabel="Original Image"
      >
        {selectedImage && (
          <div>
            <h2>Original Image</h2>
            <img
              src={selectedImage}
              alt="Original"
              style={{ width: '100%', height: 'auto' }}
            />
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageList;
