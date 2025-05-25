
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";

function Services() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
        <FeaturesSectionWithHoverEffects />
      </div>
    </div>
  );
}

export default Services;
