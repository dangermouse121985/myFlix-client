import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import ImageUploader from '../image-uploader/image-uploader';
import ImageList from '../image-list/image-list';
import { Button, Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import Modal from 'react-modal';

const MovieTabView = ({ movie, movies }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [images, setImages] = useState([]);
  const [resizedImages, setResizedImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const token = localStorage.getItem('token');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const apiURL = process.env.MOVIE_FLIX_AWS_API_URL;
  //const apiURL = process.env.MOVIE_FLIX_HEROKU_API_URL;

  const fetchImages = async () => {
    console.log('Image uploaded, fetching new images...');
    try {
      const response = await fetch(`${apiURL}/resized-images/${movie.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        // Gracefully handle 404 by doing nothing or logging the error
        console.log('No images found for this movie, subfolder does not exist.');
        return; // Exit early
      }

      if (response.ok) {
        const data = await response.json();
        setResizedImages(data);

        // Create resized image URLs by replacing 'images/' with 'resizedImages/'
        const originalImageUrls = data.map((resizedImgUrl) =>
          resizedImgUrl.replace('resizedImages/', 'images/')
        );
        setImages(originalImageUrls);

      } else {
        alert('Failed to fetch images');
      }
    } catch (err) {
      console.error('Error fetching images:', err);
      alert('Error fetching images');
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images on component mount
  }, []);

  const handleImageUpload = () => {
    fetchImages(); // Refresh images after upload
  };

  const handleImageClick = (imgUrl) => {
    setSelectedImage(imgUrl); // Set the selected image to open in modal
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  let simMovies = () => {
    {
      return movies
        .filter((m) => {
          return m.genre.includes(movie.genre) && m !== movie;
        })
        .map((filteredName) => filteredName);
    }
  };

  const modalStyles = {
    content: {
      background: '#203947',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '10px 10px 60px 10px',
      width: 'fit-content',
      height: 'fit-content',
      boxShadow: '1px 1px 10px #000',
      border: 'none'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background overlay
    },
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tab Headers */}
      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Similar Movies and Related Images Tab">
        <Tab label="Similar Movies" sx={{ color: '#fff', '&.Mui-selected': { color: 'rgb(213, 41, 65)' } }} />
        <Tab label="Related Images" sx={{ color: '#fff', '&.Mui-selected': { color: 'rgb(213, 41, 65)' } }} />
      </Tabs>

      {/* Tab Content */}
      <TabPanel value={selectedTab} index={0}>
        <Row>
          <Col>
            <Row className="justify-content-center">
              {simMovies(movie).map((m) => (
                <Col className="mb-5" md={3} key={m.id}>
                  <MovieCard movie={m} key={m.id} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <div className="image-list">
          {resizedImages.map((resizedImage, index) => (
            <img
              key={index}
              src={resizedImage}
              alt={`Resized Image ${index}`}
              className="thumbnail"
              onClick={() => handleImageClick(images[index])} // Pass the original image URL to modal
            />
          ))}
        </div>
        <ImageUploader onImageUpload={handleImageUpload} movie={movie} />
      </TabPanel>

      {/* Modal for displaying original image */}
      <Modal isOpen={modalOpen} onRequestClose={closeModal} contentLabel="Original Image" style={modalStyles}>
        {selectedImage && (
          <div>
            <h2>Original Image</h2>
            <img src={selectedImage} alt="Original" style={{ width: '750px', height: 'auto' }} />
            <Button variant="outline-primary"
              claaName="movie-view--backToMenu-button modal-button" onClick={closeModal} style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px'
              }}>Close</Button>
          </div>
        )}
      </Modal>
    </Box>
  );
}


// TabPanel Component to Show Content Based on Active Tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;



  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default MovieTabView;
