
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (count >= 100) {
      setTimeout(() => {
        onLoadingComplete();
      }, 500);
      return;
    }

    const timer = setTimeout(() => {
      setCount(prev => Math.min(prev + Math.floor(Math.random() * 10) + 1, 100));
    }, 60);

    return () => clearTimeout(timer);
  }, [count, onLoadingComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      animate={count >= 100 ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-7xl md:text-9xl font-serif text-foreground"
        animate={{ scale: count >= 100 ? 1.2 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {count}
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
