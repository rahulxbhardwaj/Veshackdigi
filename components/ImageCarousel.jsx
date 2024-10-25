// src/components/ImageCarousel.jsx

import React from 'react';
import Slider from 'react-slick';
import '../styles/ImageCarousel.css'; // Optional: for custom styling

const ImageCarousel = () => {
  const images = [
    '/image1.png',  // Adjusted paths to be relative to the public folder
    '/image2.png',
    '/image3.png',
    '/image4.png',
    '/image5.png',
    '/image6.png',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,  // Show 2 images side by side
    slidesToScroll: 2, // Scroll 2 images at a time
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <div className='Arjun_Chutiya'></div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-image-wrapper">
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
