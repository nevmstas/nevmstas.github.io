"use client";

import { HarvardResume, useResume } from "@nevmstas/resume";
import { GenerateCVButton } from "./generate-cv-button";
import { useResume as useResumeContext } from "../../context/ResumeContext";

export const ResumeButton = () => {
  const { resume } = useResumeContext()
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
