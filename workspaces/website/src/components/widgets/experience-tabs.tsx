"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Experience } from "@/types/experience";

interface ExperienceTabsProps {
  experiences: Experience[];
  onExperienceChange: (experience: Experience, index: number) => void;
}

export function ExperienceTabs({ experiences, onExperienceChange }: ExperienceTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    onExperienceChange(experiences[index], index);
  };

  return (
    <div className="space-y-2">
      {experiences.map((exp, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg cursor-pointer transition-all ${
            activeIndex === index
              ? "bg-gradient-to-r from-purple-900/30 to-transparent border-l-2 border-purple-500"
              : "hover:bg-gray-900/30"
          }`}
          onClick={() => handleTabClick(index)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3
                className={`font-bold ${
                  activeIndex === index ? "text-white" : "text-gray-300"
                }`}
              >
                {exp.jobTitile}
              </h3>
              <p className="text-sm text-gray-400">{exp.company}</p>
            </div>
            <ChevronRight
              className={`h-5 w-5 transition-transform ${
                activeIndex === index
                  ? "text-purple-400 rotate-90"
                  : "text-gray-600"
              }`}
            />
          </div>
        </div>
      ))}
    </div>
  );
} 