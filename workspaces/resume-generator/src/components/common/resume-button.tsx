"use client";

import { HarvardResume, useResume } from "@nevmstas/resume";
import { Button } from "../ui/button";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import { Eye, Download } from "lucide-react";

const CV_FILENAME_BASE = "stas-nevmyvaka-cv";

interface ResumeButtonProps {
  resume: ResumeQuery;
  companyName?: string;
}

export const ResumeButton = ({ resume, companyName }: ResumeButtonProps) => {
  const filename = companyName 
    ? `${CV_FILENAME_BASE}-${companyName.toLowerCase().replace(/\s+/g, '-')}`
    : CV_FILENAME_BASE;
  
  const { previewResume, downloadResume } = useResume(HarvardResume, resume, filename);

  return (
    <div className="flex gap-2">
      <Button
        className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-none cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          previewResume();
        }}
      >
        <Eye className="mr-2 h-4 w-4" />
        Preview CV
      </Button>
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          downloadResume();
        }}
      >
        <Download className="mr-2 h-4 w-4" />
        Download CV
      </Button>
    </div>
  );
};
