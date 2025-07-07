"use client";

import { HarvardResume, useResume } from "@nevmstas/resume";
import { GenerateCVButton } from "./generate-cv-button";
import { ResumeQuery } from "@nevmstas/hygraph-client";

interface ResumeButtonProps {
  resume: ResumeQuery;
}

export const ResumeButton = ({ resume }: ResumeButtonProps) => {
  const { openResume } = useResume(HarvardResume, resume);

  return (
    <GenerateCVButton
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        openResume();
      }}
    />
  );
};
