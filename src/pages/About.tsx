import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeroDemo1 } from "@/components/ui/hero-gallery-demo";
import { motion } from "framer-motion";

const About = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Reset scroll position and handle lazy loading
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timer);
  }, [location.key]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl text-gray-600"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen relative" 
      key={location.key}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroDemo1 />
    </motion.div>
  );
};

export default About;