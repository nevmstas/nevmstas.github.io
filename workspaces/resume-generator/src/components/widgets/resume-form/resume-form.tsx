"use client";
import { useForm } from "react-hook-form";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import { ProfileForm } from "./profile-form";
import { SkillsForm } from "./skills-form";
import { ExperiencesForm } from "./experiences-form";
import { EducationForm } from "./education-form";
import { ResumeButton } from "@/components/common/resume-button";

interface ResumeFormProps {
  resume: ResumeQuery;
}

export const ResumeForm = ({ resume }: ResumeFormProps) => {
  const form = useForm<ResumeQuery>({
    defaultValues: resume,
  });

  const currentFormData = form.watch();

  return (
    <form className="space-y-8">
      <ResumeButton resume={currentFormData}/>
      <ProfileForm form={form} />
      <SkillsForm form={form} />
      <ExperiencesForm form={form} />
      <EducationForm form={form} />
    </form>
  );
}; 