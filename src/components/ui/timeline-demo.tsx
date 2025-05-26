
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <p className="text-black dark:text-white text-xs md:text-sm font-normal mb-8">
            Partnered with Decathlon to produce a video for their childeren's sportswear and event called "Kids Day Out".
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="src\assets\images\decathlon.webp"
              alt="startup template"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-80 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="src\assets\images\decathlon_2.png"
              alt="startup template"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-80 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="src\assets\images\decathlon_4.png"
              alt="startup template"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-80 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="src\assets\images\decathlon_5.png"
              alt="startup template"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-80 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Early 2025",
      content: (
        <div>
          <p className="text-black dark:text-white text-xs md:text-sm font-normal mb-8">
            Collaborated with Firstecho for Event Video Production
            
          </p>
          <p className="text-black dark:text-white text-xs md:text-sm font-normal mb-8">
            to create a series of engaging videos for many events including Hackathons, conferences, and community gatherings.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="src\assets\images\firstecho.png"
              alt="hero template"
              className="rounded-lg object-cover object-left h-60 md:h-[28rem] lg:h-[36rem] w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"

            />

  
          </div>
        </div>
      ),
    },
    {
      title: "Late 2024",
      content: (
        <div>
          <p className="text-black dark:text-white text-xs md:text-sm font-normal mb-8">
            Collaborated with a cross-functional team in Under25 Summit
            
          </p>
          <p className="text-black dark:text-white text-xs md:text-sm font-normal mb-8">
            to create a series of engaging videos for their event, showcasing the power of youth-led initiatives.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="src\assets\images\under25.webp"
              alt="hero template"
              className="rounded-lg object-cover h-40 md:h-72 lg:h-96 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"

            />
            <img
              src="src\assets\images\under_25(2).jpg"
              alt="feature template"
              className="rounded-lg object-cover h-40 md:h-72 lg:h-96 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"

            />
  
          </div>
        </div>
      ),
    },
    
    {
      title: "2024",
      content: (
        <div>
          <p className="text-black dark:text-white text-xs md:text-sm font-normal mb-4">
            worked with Big names such as Yess , 0xday and many more to create engaging content for their events.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <img
              src="src\assets\images\0xDay.png"
              alt="hero template"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src="src\assets\images\yess.png"
              alt="feature template"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen w-full">
      <div className="w-full">
        <Timeline data={data} />
      </div>
    </div>
  );
}
