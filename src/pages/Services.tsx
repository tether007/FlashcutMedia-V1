import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";

function Services() {
  const location = useLocation();

  // Reset scroll position when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]); // Reset whenever location changes

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center" key={location.key}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
        <FeaturesSectionWithHoverEffects />
      </div>
    </div>
  );
}

export default Services;