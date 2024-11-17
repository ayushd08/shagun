import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Gallery.css';
import { Card, CardMedia, Button, Typography, Modal, Box } from '@mui/material';

function Gallery() {
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    if (showSlider) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showSlider]);

  const galleryImages = [
    { src: 'shagun/images/basic1.jpeg', title: 'Basic Design 1' },
    { src: 'shagun/images/basic2.jpeg', title: 'Basic Design 2' },
    { src: 'shagun/images/basic3.jpeg', title: 'Basic Design 3' },
    { src: 'shagun/images/premium.jpeg', title: 'Premium Design' },
    { src: 'shagun/images/bridal.jpeg', title: 'Bridal Design 1' },
    { src: 'shagun/images/bridal2.jpeg', title: 'Bridal Design 2' },
  ];

  const totalSlots = Math.ceil(galleryImages.length / 3) * 3;
  const filledGalleryImages = [
    ...galleryImages,
    ...Array(totalSlots - galleryImages.length).fill({ src: '', title: '', isEmpty: true })
  ];

  const handleOpenGallery = () => {
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowSlider(true);
  };

  return (
    <div className="gallery-container">
    <h2 className="Gallery-title">Photo Gallery</h2>
    <section id="gallery" className={`gallery-section ${showSlider ? 'modal-open' : ''}`}>
      
      <div className="gallery-grid">
        {filledGalleryImages.map((image, index) => (
          <Card key={index} className={`gallery-item ${image.isEmpty ? 'empty-item' : ''}`}>
            {!image.isEmpty && (
              <CardMedia
                component="img"
                image={image.src}
                alt={image.title}
                title={image.title}
              />
            )}
          </Card>
        ))}
        <div className="overlay" onClick={handleOpenGallery}>
          <Button
            variant="contained"
            style={{ backgroundColor: '#203c24', color: '#fff' }}
          >
            Open Gallery
          </Button>
        </div>
      </div>

      <Modal 
        open={showSlider} 
        onClose={() => setShowSlider(false)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Box className="modal-content" style={{ outline: 'none', position: 'relative' }}>
          <Button 
            variant="outlined" 
            style={{
              borderColor: '#888', 
              color: '#888', 
              backgroundColor: 'transparent', 
              borderRadius: '5px', 
              position: 'absolute', 
              top: '20px', 
              right: '20px',
              zIndex: 10
            }} 
            onClick={() => setShowSlider(false)}
          >
            Close
          </Button>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image.src} alt={image.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Modal>
    </section>
    </div>
  );
}

export default Gallery; 