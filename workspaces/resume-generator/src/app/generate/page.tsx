"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import gqlClient from "@/gql-client";
import { resumeDB } from "@/db/resume-db";

const GenerateResumeForm = () => {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedResume, setGeneratedResume] = useState<{resume: ResumeQuery, coverLetter: string } | null>(null);
  const [resume, setResume] = useState<ResumeQuery | null>(null);
  const [resumeLoading, setResumeLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        setResumeLoading(true);
        const resumeData = await gqlClient.Resume();
        setResume(resumeData);
      } catch (err) {
        console.error("Error fetching resume:", err);
        setError("Failed to load resume data");
      } finally {
        setResumeLoading(false);
      }
    };

    fetchResume();
  }, []);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    if (!resume) {
      setError("Resume data not loaded");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription,
          resume: resume,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response text:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          throw new Error(errorData.error || 'Failed to generate resume');
        } catch {
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
      }

      const responseText = await response.text();
      
      try {
        const data = JSON.parse(responseText);
        setGeneratedResume(JSON.parse(data.aiResponse));
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (generatedResume) {
      await resumeDB.generatedResumes.put({ id: 'latest', data: generatedResume });
      router.push('/');
    }
  };

  if (resumeLoading) {
    return (
      <div className="container mx-auto p-8 max-w-4xl">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">Loading resume data...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="container mx-auto p-8 max-w-4xl">
        <Card>
          <CardContent className="p-8">
            <div className="text-center text-red-500">Failed to load resume data</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Generate Resume</CardTitle>
          <CardDescription>
            Enter a job description and we&apos;ll generate a tailored resume for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          <div className="flex justify-end gap-4">
            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="px-8"
            >
              {loading ? "Generating..." : "Generate Resume"}
            </Button>
            
            {generatedResume && (
              <Button 
                onClick={handleNext}
                className="px-8"
                variant="default"
              >
                Show Generated Resume
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateResumeForm; 