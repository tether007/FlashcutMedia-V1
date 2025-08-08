
"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10"
      >
        <h2 className="text-2xl md:text-5xl mb-6 text-black dark:text-white max-w-4xl font-[Ethnocentric] leading-tight">
          Our Journey So Far
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-lg leading-relaxed">
          We&apos;ve been crafting visual stories since 2022. Here&apos;s our journey of creating impactful content and memorable experiences.
        </p>
      </motion.div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="h-4 w-4 rounded-full bg-red-500 dark:bg-red-600 border border-red-400 dark:border-red-700 p-2" />
              </motion.div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-[Ethnocentric] text-black dark:text-white">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-[Ethnocentric] text-black dark:text-white">
                {item.title}
              </h3>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white/20 dark:bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-red-500/20 transition-colors"
              >
                {item.content}
              </motion.div>
            </div>
          </motion.div>
        ))}
  
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-red-300 dark:via-red-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-red-600 via-red-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
