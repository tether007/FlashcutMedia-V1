import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="block">
      <div className="flex items-center gap-2">
        <div className="relative flex items-center w-24 sm:w-32 md:w-40 lg:w-48">
          <img 
            src="\logo.png" 
            alt="FLASHCUT MEDIA" 
            className="w-full h-auto max-w-full object-contain"
          />
        </div>
        {/* Optional: <span className="font-bold text-base sm:text-lg md:text-xl text-white">FLASHCUT MEDIA</span> */}
      </div>
    </Link>
  );
};

export default Logo;