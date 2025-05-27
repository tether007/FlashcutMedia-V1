import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="block flex-shrink-0">
      <div className="flex items-center">
        <div className="relative flex items-center justify-center
          w-20 sm:w-24 md:w-32 lg:w-40
          h-8 sm:h-10 md:h-12 lg:h-14"
        >
          <img 
            src="/logo.png" 
            alt="FLASHCUT MEDIA" 
            className="w-full h-auto object-contain"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </Link>
  );
};

export default Logo;