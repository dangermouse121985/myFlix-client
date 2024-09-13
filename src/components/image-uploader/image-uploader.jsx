import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import CustomAlert from '../custom-alert/custom-alert';

const ImageUploader = ({ onImageUpload, movie }) => {
  const [message, setMessage] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const token = localStorage.getItem('token');

  const handleDragEnter = () => setIsHovered(true);
  const handleDragLeave = () => setIsHovered(false);

  const dropzoneStyle = {
    border: isHovered ? '3px dashed rgb(213, 41, 65)' : '3px dashed #fff',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    height: '75px',
    cursor: 'pointer',
    transition: 'border 0.2s ease-in-out',
  };

  const paragraphStyle = {
    margin: 0, // Remove default margins
    padding: 0, // Remove default padding
  };

  const onDrop = async (acceptedFiles) => {
    setIsHovered(false);
    if (acceptedFiles.length === 0) {
      setMessage('No files selected');
      setAlertOpen(true);
      return;
    }

    const file = acceptedFiles[0];
    const fileName = file.name.replace(/\s+/g, '_');
    const formData = new FormData();
    formData.append('image', new File([file], fileName, { type: file.type })); // Create a new file with the modified name
    formData.append('movieID', encodeURIComponent(movie.id));

    const apiURL = process.env.MOVIE_FLIX_AWS_API_URL;
    //const apiURL = MOVIE_FLIX_HEROKU_API_URL;
    try {
      const response = await fetch(
        `${apiURL}/images/${encodeURIComponent(movie.id)}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`, // Replace with your JWT token
          },
        }
      );

      if (response.ok) {
        const result = await response.text(); // assuming the server responds with text
        setMessage(`File uploaded successfully`);
        console.error(`File uploaded successfully: ${result}`);
        setAlertOpen(true);

        // Delay before refreshing images - Waiting for lambda code to resize and copy image
        setTimeout(() => {
          onImageUpload();
        }, 3000);
      } else {
        setMessage('Error uploading image');
        setAlertOpen(true);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Error uploading image');
      setAlertOpen(true);
    }
  };

  return (
    <div>
      <Dropzone
        onDrop={onDrop}
        accept="image/*"
        maxFiles={1}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragEnter}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p style={paragraphStyle}>
              Drag 'n' drop an image here, or click to select one
            </p>
          </div>
        )}
      </Dropzone>
      {message && (
        <CustomAlert
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          message={message}
        />
      )}
    </div>
  );
};

export default ImageUploader;
