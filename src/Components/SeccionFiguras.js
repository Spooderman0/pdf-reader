import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

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

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[800px] h-[500px] w-full m-auto py-8 px-4 relative group'>
      <div
        style={{ backgroundImage: `url(${figuras[currentIndex]})` }}
        className='w-full h-full rounded-2xl bg-center bg-contain bg-no-repeat duration-500'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={goToPrevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={goToNextSlide} size={30} />
      </div>
      {/* Thumbnails */}
      <div className='flex justify-center py-2 space-x-2 mt-4'>
        {figuras.map((figura, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer p-1 border-2 ${currentIndex === index ? 'border-black' : 'border-transparent'}`}
          >
            <img src={figura} alt={`Thumbnail ${index + 1}`} className='w-76 h-32 object-cover rounded-md' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeccionFiguras;
