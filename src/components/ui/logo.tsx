import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="block flex-shrink-0"
    >
      <div className="flex items-center">
        <div 
          className="relative flex items-center justify-center
          w-16 h-6        /* smaller default for mobile */
          sm:w-20 sm:h-8  /* slightly larger for small screens */
          md:w-32 md:h-12 /* desktop size */
          lg:w-40 lg:h-14"
        >
          <img 
            src="/logo.png" 
            alt="FLASHCUT MEDIA" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
