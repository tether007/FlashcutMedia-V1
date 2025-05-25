
import { cn } from "@/lib/utils";
import { 
  Terminal, 
  Move3d, 
  DollarSign, 
  Cloud, 
  Route, 
  HelpCircle, 
  Settings, 
  Heart, 
  Camera,
  CircleFadingPlus,
  IndianRupee,
  ChartNoAxesColumn,
  ChartNoAxesColumnIncreasing,
  ChartNoAxesCombined,
  ChartNoAxesCombinedIcon
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Content Creation & Production",
      description:
        "Complete video creation from filming to final edit, including lighting, audio, and post-production for reels, stories, and promotional content tailored to each client's brand.",
      icon: <Camera className="w-8 h-8" />,
    },
    {
      title: " Social Media Strategy & Content Planning",
      description:
        "Develop content calendars, identify trends and hashtags, and create video concepts optimized for Instagram's algorithm and maximum engagement.",
      icon: <CircleFadingPlus className="w-8 h-8" />,
    },
    {
      title: " Brand Partnership & Cross-Promotion",
      description:
        "Showcase client work on your Instagram to give them exposure through your audience while building your portfolio through collaborative content.",
      icon: <IndianRupee className="w-8 h-8" />,
    },
    {
      title: "Analytics & Growth Optimization",
      description: "Track performance metrics, analyze engagement patterns, and optimize content strategies based on data insights to continuously improve client results.",
      icon: <ChartNoAxesCombinedIcon className="w-8 h-9" />,
    },
    
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
