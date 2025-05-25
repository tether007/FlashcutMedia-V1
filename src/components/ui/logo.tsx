
import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/" className="block">
      <div className="flex items-center">
        <div className="relative w-40 h-24 md:w-56 md:h-32">
          <img 
            src="/lovable-uploads/9df271bd-3983-42ed-a6c2-af8d3918aee1.png" 
            alt="FLASHCUT MEDIA" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
