"use client";
import React, { useState } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden pb-[500px]">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              For Enqueries and to Capture <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Contact us 
              </span>
            </h1>
          </>
        }
      >
        <div className="relative w-full max-w-[375px] mx-auto bg-black rounded-[3rem] p-4 pb-8">
          {/* Phone Frame */}
          <div className="absolute inset-0 rounded-[3rem] pointer-events-none border-[8px] border-black"></div>
          
          {/* Content Container */}
          <div className="relative w-full overflow-hidden rounded-2xl bg-black aspect-[9/19]">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            
            <img
              src="/insta_contact.png"
              alt="Contact hero image"
              className={`
                w-full h-full object-cover
                transition-all duration-300 ease-in-out
                ${imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
              `}
              draggable={false}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />

            {imageError && (
              <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-black/5">
                Failed to load image
              </div>
            )}
          </div>

          {/* Phone Bottom Bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-800 rounded-full"></div>
        </div>
      </ContainerScroll>
    </div>
  );
}