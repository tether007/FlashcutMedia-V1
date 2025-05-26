import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TimelineDemo } from "@/components/ui/timeline-demo";

const Projects = () => {
  const location = useLocation();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]); // Reset whenever location changes

  return (
    <div className="min-h-screen relative bg-transparent" key={location.key}>
      <div className="relative z-10">
        <TimelineDemo />
      </div>
    </div>
  );
};

export default Projects;