// src/components/Slider.jsx
import React, { useState, useEffect } from 'react';
import {adBunner1, adBunner2, adBunner3} from '../assets/assets.jsx';

const images = [adBunner1, adBunner2, adBunner3];

const Slider = () => {
  const [index, setIndex] = useState(0);

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

//   const goToPrev = () => {
//     setIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative top-10 right-3 w-full max-w-7xl mx-auto overflow-hidden rounded-md">
      {/* Image Slide */}
      <img
        src={images[index]}
        alt={`Slide ${index + 1}`}
        className="w-full h-[250px] md:h-[300px] rounded-xl object-cover transition-all duration-500"
      />

      {/* Prev / Next Buttons */}
      {/* <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/60 hover:bg-white text-black p-2 rounded-full shadow"
      >
        ❮
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/60 hover:bg-white text-black p-2 rounded-full shadow"
      >
        ❯
      </button> */}

      {/* Dots / Indicators */}
      <div className="absolute bottom-30 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === index ? 'bg-[#d72f18]' : 'bg-gray-300'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
