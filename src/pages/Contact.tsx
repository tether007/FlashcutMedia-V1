import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo";

const Contact = () => {
  const location = useLocation();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]); // Reset whenever location changes

  return (
    <div className="min-h-screen relative" key={location.key}>
      <div className="relative z-10">
        <HeroScrollDemo />
      </div>
    </div>
  );
};

export default Contact;