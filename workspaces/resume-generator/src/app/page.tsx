"use client";

import client from "@/gql-client";
import { ResumeForm } from "@/components/widgets/resume-form/resume-form";
import { useEffect, useState } from "react";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import { Button } from "@/components/ui/button";
import { resumeDB } from "@/db/resume-db";
import { CoverLetterForm } from "@/components/widgets/cover-letter-form/cover-letter-form";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchResume } from "@/services";

export default function Home() {
  const [resume, setResume] = useState<ResumeQuery | null>(null);
  const [coverLetter, setCoverLetter] = useState<string>('')
  const [companyName, setCompanyName] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  // Load resume from API (your own resume)
  const fetchFromAPI = async () => {
    setLoading(true);
    try {
      const apiResume = await fetchResume();
      setResume(apiResume);
      setCompanyName(undefined);
    } catch (error) {
      console.error('Error fetching resume from API:', error);
      setResume(null);
    }
    setLoading(false);
  };

  const fetchFromIndexDbStorage = async () => {
    setLoading(true);
    try {
      const resume = await resumeDB.generatedResumes.get('latest');

      if (resume) {
        setResume(resume.data.resume);
        setCoverLetter(resume.data.coverLetter);
        setCompanyName(resume.data.companyName);
      } else {
        const apiResume = await client.Resume();
        setResume(apiResume);
      }
    } catch (error) {
      console.error('Error loading resume from localStorage:', error);
      setResume(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFromIndexDbStorage();
  }, []);

  return (
    <div className="container mx-auto p-8 space-y-8">
      {loading && <>
        <Skeleton className="h-[30px] w-full rounded-md" />
        <Skeleton className="h-[100px] w-full rounded-md" />
        <Skeleton className="h-[500px] w-full rounded-md" />
      </>}
      {resume && <><div className="flex gap-4 mb-4 justify-center">
        <Button onClick={fetchFromAPI} className="cursor-pointer" variant="default">
          Load My Resume
        </Button>
        <Button onClick={fetchFromIndexDbStorage} className="cursor-pointer" variant="secondary">
          Load Last Generated Resume
        </Button>
      </div>

        <CoverLetterForm value={coverLetter} onChange={setCoverLetter} />
        <ResumeForm resume={resume} companyName={companyName} /></>}
    </div>
  );
}
