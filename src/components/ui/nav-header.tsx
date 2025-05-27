"use client"; 
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

// Define proper TypeScript interfaces
interface PositionState {
  left: number;
  width: number;
  opacity: number;
}

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<PositionState>>;
  link?: string;
  isActive?: boolean;
}

interface CursorProps {
  position: PositionState;
}

function NavHeader() {
  const [position, setPosition] = useState<PositionState>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-4 py-2 sm:py-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-2 sm:gap-4">
        {/* Logo - Only show on mobile when nav is collapsed */}
        <div className="block md:hidden">
          <Link to="/" className="block">
            <div className="flex items-center justify-center w-24 h-8">
              
            </div>
          </Link>
        </div>
        
        {/* Navigation */}
        <ul
          className="relative mx-auto flex w-fit rounded-full bg-black/70 backdrop-blur-md border border-white/10 p-0.5 sm:p-1
            overflow-x-auto scrollbar-hide
            max-w-[calc(100vw-1rem)] sm:max-w-none"
          onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        >
          <Tab 
            setPosition={setPosition} 
            link="/"
            isActive={currentPath === "/"}
          >
            Home
          </Tab>
          <Tab 
            setPosition={setPosition} 
            link="/projects"
            isActive={currentPath === "/projects"}
          >
            Journey
          </Tab>
          <Tab 
            setPosition={setPosition} 
            link="/about"
            isActive={currentPath === "/about"}
          >
            About
          </Tab>
          <Tab 
            setPosition={setPosition} 
            link="/services"
            isActive={currentPath === "/services"}
          >
            Services
          </Tab>
          <Tab 
            setPosition={setPosition} 
            link="/contact"
            isActive={currentPath === "/contact"}
          >
            Contact
          </Tab>

          <Cursor position={position} />
        </ul>
      </div>
    </nav>
  );
}

const Tab = ({ children, setPosition, link, isActive }: TabProps) => {
  const ref = useRef<HTMLLIElement>(null);
  
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className={`relative z-10 flex-shrink-0 cursor-pointer
        px-2 py-1.5 text-xs whitespace-nowrap
        sm:px-3 sm:py-2 sm:text-sm
        md:px-5 md:py-3 md:text-base
        uppercase text-white mix-blend-difference transition-all duration-200
        ${isActive ? 'font-bold' : 'font-medium'}
        hover:scale-105`}
    >
      {link ? (
        <Link to={link} className="block w-full h-full">
          {children}
        </Link>
      ) : (
        children
      )}
    </li>
  );
};

const Cursor = ({ position }: CursorProps) => {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30
      }}
      className="absolute z-0 top-0.5 sm:top-1 rounded-full bg-white
        h-6 sm:h-8 md:h-12"
    />
  );
};

export default NavHeader;