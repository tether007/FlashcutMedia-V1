import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HeroDemo1 } from "@/components/ui/hero-gallery-demo";

const About = () => {
  const location = useLocation();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]); // Reset whenever location changes

  return (
    <div className="min-h-screen relative" key={location.key}>
      <HeroDemo1 />
    </div>
  );
};

export default About;