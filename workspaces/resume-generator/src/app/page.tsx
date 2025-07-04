"use client";
import { useEffect, useState } from "react";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import client from "../gql-client";
import { ResumeProvider } from "../context/ResumeContext";
import ProfileForm from "../components/ProfileForm";
import SkillsForm from "../components/SkillsForm";
import ExperiencesForm from "../components/ExperiencesForm";
import ResumeButton from "@/components/common/resume-button";
import ImportJson from "../components/ImportJson";

export default function Home() {
  const [resume, setResume] = useState<ResumeQuery | null>(null);

  useEffect(() => {
    client.Resume().then(setResume);
  }, []);

  if (!resume) return <div>Loading...</div>;

  return (
    <ResumeProvider initialResume={resume}>
      <div className="container mx-auto p-8 space-y-8">
        <ImportJson />
        <ResumeButton />
        <ProfileForm />
        <SkillsForm />
        <ExperiencesForm />
      </div>
    </ResumeProvider>
  );
}
