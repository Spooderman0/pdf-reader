import React, { useState } from 'react';

const SeccionFiguras = ({ figuras }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % figuras.length;
    setCurrentIndex(nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex = (currentIndex - 1 + figuras.length) % figuras.length;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className="relative w-full">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {/* Current slide */}
        <div className="absolute inset-0 flex justify-center items-center">
          <img
            src={figuras[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="block w-auto h-auto max-h-full max-w-full"
          />
        </div>
      </div>
      {/* Slide indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {figuras.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full bg-black/50 ${currentIndex === index ? 'bg-black' : 'bg-black/20'}`}
          />
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-1/2 start-0 z-30 transform -translate-y-1/2 flex items-center justify-center h-10 px-4 cursor-pointer group focus:outline-none text-black"
        onClick={goToPrevSlide}
      >
        {/* Previous button */}
        <svg
          className="w-6 h-6 text-black"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        className="absolute top-1/2 end-0 z-30 transform -translate-y-1/2 flex items-center justify-center h-10 px-4 cursor-pointer group focus:outline-none text-black"
        onClick={goToNextSlide}
      >
        {/* Next button */}
        <svg
          className="w-6 h-6 text-black"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default SeccionFiguras;
