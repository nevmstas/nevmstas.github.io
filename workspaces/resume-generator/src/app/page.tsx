"use client";
import client from "@/gql-client";
import { useEffect, useState } from "react";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import { ResumeProvider } from "../context/ResumeContext";
import { ProfileForm } from "@/components/widgets/resume-form/profile-form";
import { SkillsForm } from "@/components/widgets/resume-form/skills-form";
import { ExperiencesForm } from "@/components/widgets/resume-form/experiences-form";
import { EducationForm } from "@/components/widgets/resume-form/education-form";
import { ResumeButton } from "@/components/common/resume-button";
import { ImportResumeJson } from "@/components/widgets/import-resume-json/import-resume-json";

export default function Home() {
  const [resume, setResume] = useState<ResumeQuery | null>(null);

  useEffect(() => {
    client.Resume().then(setResume);
  }, []);

  if (!resume) return <div>Loading...</div>;

  return (
    <ResumeProvider initialResume={resume}>
      <div className="container mx-auto p-8 space-y-8">
        <ImportResumeJson />
        <ResumeButton />
        <ProfileForm />
        <SkillsForm />
        <ExperiencesForm />
        <EducationForm />
      </div>
    </ResumeProvider>
  );
}
