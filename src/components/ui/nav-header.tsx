
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
    <ul
      className="relative mx-auto flex w-fit rounded-full bg-black/70 backdrop-blur-md border border-white/10 p-1"
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
      className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base ${isActive ? 'font-bold' : ''}`}
    >
      {link ? (
        <Link to={link}>{children}</Link>
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
      className="absolute z-0 h-7 rounded-full bg-white md:h-12"
    />
  );
};

export default NavHeader;
