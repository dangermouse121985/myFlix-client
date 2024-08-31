import React, { useState } from 'react';
import Dropzone from 'react-dropzone';

const ImageUploader = ({ onImageUpload }) => {
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      setMessage('No files selected');
      return;
    }

    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', file);

    const apiURL = process.env.MOVIE_FLIX_AWS_API_URL;
    //const apiURL = MOVIE_FLIX_HEROKU_API_URL;
    try {
      const response = await fetch(`${apiURL}/images`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // Replace with your JWT token
        },
      });

      if (response.ok) {
        const result = await response.text(); // assuming the server responds with text
        alert(`File uploaded successfully: ${result}`);
        onImageUpload();
      } else {
        alert('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  return (
    <div>
      <Dropzone onDrop={onDrop} accept="image/*" maxFiles={1}>
        {({ getRootProps, getInputProps }) => (
          <div className="image-uploader" {...getRootProps()}>
            <input {...getInputProps()} />
            <p className="image-uploader-input-p">
              Drag 'n' drop an image here, or click to select one
            </p>
          </div>
        )}
      </Dropzone>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ImageUploader;
