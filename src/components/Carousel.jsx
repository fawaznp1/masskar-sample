import React, { useEffect, useRef, useState } from 'react';

const images1 = [
  'https://masskaronline.com/uploads/images/poster/center%20bottom.jpg',
  'https://masskaronline.com/uploads/images/poster/right1.jpg',
  'https://masskaronline.com/uploads/images/poster/right2.jpg',
];
const images2 = [...images1];
const images3 = [...images1];

const Carousel = ({ images }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const scrollToImage = (index) => {
    const container = containerRef.current;
    if (container) {
      const child = container.children[index];
      if (child) {
        container.scrollTo({
          left: child.offsetLeft,
          behavior: 'smooth',
        });
      }
    }
  };

  const startAutoplay = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);
  };

  const stopAutoplay = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    scrollToImage(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
      style={{
        overflowX: 'auto',
        display: 'flex',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
        width: '150px',
        height: '200px',
        borderRadius: '8px',
        border: '1px solid #ccc',
      }}
    >
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt="carousel"
          style={{
            flexShrink: 0,
            width: '150px',
            height: '200px',
            objectFit: 'cover',
            scrollSnapAlign: 'start',
          }}
        />
      ))}
    </div>
  );
};

const ThreeCarousels = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent:'center',
        gap: '16px',
        flexWrap: 'wrap',
        marginTop: '3rem',
      }}
    >
      <div style={{ width: '150px' }}>
        <Carousel images={images1} />
      </div>
      <div style={{ width: '150px' }}>
        <Carousel images={images2} />
      </div>
      <div style={{ width: '150px' }}>
        <Carousel images={images3} />
      </div>
      
    </div>
  );
};

export default ThreeCarousels;
