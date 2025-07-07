"use client";

import client from "@/gql-client";
import { ResumeForm } from "@/components/widgets/resume-form/resume-form";
import { useEffect, useState } from "react";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import { Button } from "@/components/ui/button";
import { resumeDB } from "@/db/resume-db";

export default function Home() {
  const [resume, setResume] = useState<ResumeQuery | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Load resume from API (your own resume)
  const fetchFromAPI = async () => {
    setLoading(true);
    try {
      const apiResume = await client.Resume();
      setResume(apiResume);
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

      console.log({indexdb: resume?.data})
      
      if (resume) {
        setResume(resume?.data.resume);
      } else {
        setResume(null);
      }
    } catch (error) {
      console.error('Error loading resume from localStorage:', error);
      setResume(null);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchFromAPI();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!resume) return <div>Error loading resume data</div>;

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex gap-4 mb-4">
        <Button onClick={fetchFromAPI} className="cursor-pointer" variant="default">
          Load My Resume
        </Button>
        <Button onClick={fetchFromIndexDbStorage} className="cursor-pointer" variant="secondary">
          Load Generated Resume
        </Button>
      </div>
      <ResumeForm resume={resume} />
    </div>
  );
}
