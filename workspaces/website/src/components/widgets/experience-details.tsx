"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Briefcase, Building2, Calendar, MapPin } from "lucide-react";
import { Experience } from "@/types/experience";
import { capitalizeFirstLetter } from "@/lib/utils";

interface ExperienceDetailsProps {
  experience: Experience;
  totalExperiences: number;
  currentIndex: number;
}

export function ExperienceDetails({
  experience,
  totalExperiences,
  currentIndex,
}: ExperienceDetailsProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-800 overflow-hidden backdrop-blur-sm h-full flex flex-col">
      <div className="p-4 sm:p-6 flex-grow">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              {experience.jobTitile}
            </h3>
            <div className="flex items-center text-gray-400">
              <Building2 className="h-4 w-4 mr-1" />
              <span className="text-sm">{experience.company}</span>
            </div>
          </div>

          <div className="mt-3 sm:mt-0 space-y-1 sm:space-y-2 sm:text-right">
            <div className="flex items-center sm:justify-end text-gray-400">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {experience.startDate} - {experience.endDate || "Present"}
              </span>
            </div>
            <div className="flex items-center sm:justify-end text-gray-400">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{experience.location}</span>
            </div>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h4 className="text-sm uppercase tracking-wider text-purple-400 mb-2 sm:mb-3 font-semibold">
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {experience.description.map((achievement, i) => (
              <li 
                key={i} 
                className={`flex gap-2 items-baseline ${
                  i >= 4 ? 'hidden lg:flex' : ''
                }`}
              >
                <div className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                <span className="text-sm text-gray-300 leading-relaxed">
                  {achievement}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wider text-purple-400 mb-2 sm:mb-3 font-semibold">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-gray-800 text-cyan-400 hover:bg-gray-700"
              >
                {capitalizeFirstLetter(tech)}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-900/80 border-t border-gray-800 flex justify-between items-center">
        <div className="flex items-center">
          <Briefcase className="h-4 w-4 text-purple-400 mr-2" />
          <span className="text-sm text-gray-400">
            Position {currentIndex + 1} of {totalExperiences}
          </span>
        </div>
      </div>
    </Card>
  );
}
