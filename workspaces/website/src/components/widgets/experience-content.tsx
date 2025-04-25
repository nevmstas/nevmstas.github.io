"use client";

import { useState } from "react";
import { ExperienceTabs } from "./experience-tabs";
import { ExperienceDetails } from "./experience-details";
import { Experience, ExperienceContentProps } from "@/types/experience";

export function ExperienceContent({ experiences }: ExperienceContentProps) {
  const [activeExperience, setActiveExperience] = useState(experiences[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleExperienceChange = (experience: Experience, index: number) => {
    setActiveExperience(experience);
    setActiveIndex(index);
  };

  return (
    <>
      {/* Mobile view - Horizontal scroll with one card visible */}
      <div className="lg:hidden overflow-hidden -mx-4">
        <div className="overflow-x-auto snap-x snap-mandatory pb-4">
          <div className="flex">
            {experiences.map((experience, index) => (
              <div 
                key={index} 
                className="w-full flex-shrink-0 snap-center px-4"
              >
                <ExperienceDetails
                  experience={experience}
                  totalExperiences={experiences.length}
                  currentIndex={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop view - Grid with tabs */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ExperienceTabs
          experiences={experiences}
          onExperienceChange={(experience, index) => handleExperienceChange(experience, index)}
        />

        <div className="lg:col-span-2">
          <ExperienceDetails
            experience={activeExperience}
            totalExperiences={experiences.length}
            currentIndex={activeIndex}
          />
        </div>
      </div>
    </>
  );
} 