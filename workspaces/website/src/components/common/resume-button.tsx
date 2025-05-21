"use client";

import { useResume, HarvardResume } from "@nevmstas/resume";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import GenerateCVButton from "./generate-cv-button";

type Props = ResumeQuery;

const ResumeButton = (props: Props) => {
  const { openResume } = useResume(HarvardResume, props);

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

export default ResumeButton;