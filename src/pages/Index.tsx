
import React, { useEffect, useState } from "react";
import { ThreeDPhotoCarouselDemo } from "@/components/ui/3d-carousel-demo";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

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

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
};


interface FloatingImageProps {
  src: string;
  alt: string;
  className: string;
  sensitivity?: number;
  mobilePosition?: string;
}

const FloatingImage = ({ src, alt, className, sensitivity = 50,mobilePosition }: FloatingImageProps) => {
  const { x, y } = useMousePosition();
  
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const isMobile = windowSize.width < 768;

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

  // Calculate movement based on mouse position relative to window center
  const moveX = ((x - windowSize.width / 2) / windowSize.width) * sensitivity;
  const moveY = ((y - windowSize.height / 2) / windowSize.height) * sensitivity;

  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ y: 0 }}
      animate={{ 
        x: isMobile ? 0 : moveX,
        y: [moveY, moveY - (isMobile ? 5 : 10), moveY, moveY + (isMobile ? 5 : 10), moveY],
        rotate: [0, isMobile ? 0.5 : 1, 0, isMobile ? -0.5 : -1, 0],
      }}
      transition={{ 
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
  const [currentText, setCurrentText] = useState("photos");
  const texts = ["photos", "videos", "social media", "content", "marketing", "branding"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(current => {
        const currentIndex = texts.indexOf(current);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen pt-20 md:pt-0">
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Floating images */}
        <FloatingImage 
          src={placeholder1} 
          alt="Concert stage" 
          className="w-48 md:w-72 h-32 md:h-48 top-[10%] left-[5%] z-10 hidden md:block"  
          mobilePosition="top-[5%] left-[5%] md:top-[10%] md:left-[5%]"
          sensitivity={70}
        />
        
        <FloatingImage 
          src={placeholder2} 
          alt="Red stage lighting" 
          className="w-72 h-48 top-[15%] right-[5%] z-10 "
          mobilePosition="top-[5%] right-[5%] md:top-[15%] md:right-[5%]"
          sensitivity={85}
        />
        
        <FloatingImage 
          src={placeholder3} 
          alt="Performer with spotlight" 
          className="w-64 h-80 bottom-[8%] left-[8%] z-10 hidden md:block"  
          mobilePosition="bottom-[45%] left-[5%] md:bottom-[8%] md:left-[8%] "
          sensitivity={90}
        />
        
        <FloatingImage 
          src={placeholder4} 
          alt="Outdoor performance" 
          className="w-72 h-48 bottom-[10%] right-[8%] z-10 "
          mobilePosition="bottom-[5%] right-[5%] md:bottom-[10%] md:right-[8%]"
          sensitivity={75}
        />

        {/* Main content */}
        <div className="text-center p-4 md:p-8 z-10 w-full max-w-3xl mx-auto relative">
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight mb-4 md:mb-6 text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Content That Converts
            <br />
            Visuals That Captivate
          </motion.h1>
          
          <motion.div
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-4 md:mt-8 flex flex-col items-center"
          >
            <p className="mb-2">One home to save</p>
            <div className="inline-block bg-black/60 backdrop-blur-sm border border-secondary/20 rounded-full px-4 md:px-6 py-1 md:py-2 mt-2">
              <motion.span>{currentText}</motion.span>
            </div>
          </motion.div>
          
          <div className="mt-10 md:mt-20 flex flex-wrap justify-center gap-3 md:gap-10 px-2">
            {["Creative", "Professional", "Viral", "Engaging", "Results", "Captivating"].map((item, i) => (
              <motion.div 
                key={i}
                className="text-gray-400 text-[10px] md:text-xs"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.6, ease: "easeOut" }}
                >
                {item}
              </motion.div>
            ))}
          </div>  
        </div>
      </div>
      
      <ThreeDPhotoCarouselDemo />
    </div>
  );
};
export default Index;