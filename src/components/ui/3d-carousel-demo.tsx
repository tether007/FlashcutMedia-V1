import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";
import { useRef } from "react";
// Fixed import from framer-motion - these are now declared in the types/webgl.d.ts file
import { useScroll, motion, useTransform } from "framer-motion";


export function ThreeDPhotoCarouselDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create scroll-linked animations
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div 
      ref={containerRef} 
      className="min-h-[100vh] py-24 flex flex-col justify-center items-center"
    >
      <motion.div 
        style={{ 
          scale,
          opacity,
        }}
        className="w-full max-w-7xl"
      >
        <div className="relative overflow-hidden rounded-lg p-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-font-ethnocentric text-black dark:text-white text-center mb-4">Our Projects</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto">
              Explore our portfolio of Captured moments. Drag the carousel to browse or click on an item to view few videos.
            </p>
          </div>
          <ThreeDPhotoCarousel />
        </div>
      </motion.div>
    </div>
  );
}