"use client";

import { useState, useRef } from "react";
import { ExperienceTabs } from "./experience-tabs";
import { ExperienceDetails } from "./experience-details";
import { ExperiencesQuery } from "@nevmstas/hygraph-client";

export function ExperienceContent({ experiences }: { experiences: ExperiencesQuery["experiences"] }) {
  const [activeExperience, setActiveExperience] = useState(experiences[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleExperienceChange = (experience: ExperiencesQuery["experiences"][0], index: number) => {
    setActiveExperience(experience);
    setActiveIndex(index);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.style.scrollBehavior = 'smooth';
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      {/* Mobile view - Horizontal scroll with one card visible */}
      <div className="lg:hidden overflow-hidden -mx-4">
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing scrollbar-none"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="flex select-none">
            {experiences.map((experience, index) => (
              <div 
                key={index} 
                className="w-full flex-shrink-0 snap-center px-4 transition-all duration-300 ease-out"
                style={{
                  opacity: isDragging ? '0.95' : '1',
                }}
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