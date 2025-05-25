import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThreeDPhotoCarouselDemo } from "@/components/ui/3d-carousel-demo";
import { motion } from "framer-motion";

// Import placeholder images
import placeholder1 from "@/assets/images/placeholder1.jpg";
import placeholder2 from "@/assets/images/placeholder2.jpg";
import placeholder3 from "@/assets/images/placeholder3.jpg";
import placeholder4 from "@/assets/images/placeholder4.jpg";

// Custom hook to track mouse position
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

// Custom hook for window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

interface FloatingImageProps {
  src: string;
  alt: string;
  className: string;
  sensitivity?: number;
}

const FloatingImage: React.FC<FloatingImageProps> = ({ 
  src, 
  alt, 
  className, 
  sensitivity = 50 
}) => {
  const { x, y } = useMousePosition();
  const windowSize = useWindowSize();

  const moveX = ((x - windowSize.width / 2) / windowSize.width) * sensitivity;
  const moveY = ((y - windowSize.height / 2) / windowSize.height) * sensitivity;

  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1,
        x: moveX,
        y: [moveY, moveY - 10, moveY, moveY + 10, moveY],
        rotate: [0, 1, 0, -1, 0],
      }}
      transition={{ 
        opacity: { duration: 0.8 },
        x: { type: "spring", stiffness: 50 },
        y: { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        rotate: { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
      }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="object-cover shadow-lg h-full w-full rounded-lg" 
      />
    </motion.div>
  );
};

const Index = () => {
  const location = useLocation();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  const floatingImages = [
    { src: placeholder1, alt: "Concert stage", position: "top-[10%] left-[5%]", sensitivity: 70 },
    { src: placeholder2, alt: "Red stage lighting", position: "top-[15%] right-[5%]", sensitivity: 85 },
    { src: placeholder3, alt: "Performer with spotlight", position: "bottom-[8%] left-[8%]", sensitivity: 90 },
    { src: placeholder4, alt: "Outdoor performance", position: "bottom-[10%] right-[8%]", sensitivity: 75 },
  ];

  return (
    <div className="min-h-screen" key={location.key}>
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Floating Images */}
        {floatingImages.map((image, index) => (
          <FloatingImage 
            key={index}
            src={image.src}
            alt={image.alt}
            className={`w-72 h-48 ${image.position} z-10 hidden md:block`}
            sensitivity={image.sensitivity}
          />
        ))}

        {/* Main Content */}
        <div className="text-center p-8 z-10 max-w-3xl mx-auto relative">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-6 text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Content That Converts
            <br />
            Visuals That Captivate
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mt-8 flex flex-col items-center"
          >
            <p className="mb-2">One creator to</p>
            <div className="inline-block bg-black/60 backdrop-blur-sm border border-secondary/20 rounded-full px-6 py-2 mt-2">
              Capture everything
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-20 flex flex-wrap justify-center gap-4 md:gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {["Creative", "Professional", "Viral", "Engaging", "Captivating", "Results"].map((item, i) => (
              <motion.div 
                key={i} 
                className="text-gray-400 text-xs md:text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* 3D Carousel Section */}
      <ThreeDPhotoCarouselDemo />
    </div>
  );
};

export default Index;