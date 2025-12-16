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
  const [loadingCV, setLoadingCV] = useState(false);
  const [loadingCoverLetter, setLoadingCoverLetter] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedResume, setGeneratedResume] = useState<ResumeQuery | null>(null);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<string | null>(null);
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

  const handleGenerateCV = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    if (!resume) {
      setError("Resume data not loaded");
      return;
    }

    setLoadingCV(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-cv', {
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
          throw new Error(errorData.error || 'Failed to generate CV');
        } catch {
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
      }

      const responseText = await response.text();
      
      try {
        const data = JSON.parse(responseText);
        const parsed = JSON.parse(data.aiResponse);
        console.log('CV data', parsed);
        setGeneratedResume(parsed.resume);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate CV. Please try again.");
    } finally {
      setLoadingCV(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    if (!resume) {
      setError("Resume data not loaded");
      return;
    }

    setLoadingCoverLetter(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-cover-letter', {
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
          throw new Error(errorData.error || 'Failed to generate cover letter');
        } catch {
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
      }

      const responseText = await response.text();
      
      try {
        const data = JSON.parse(responseText);
        const parsed = JSON.parse(data.aiResponse);
        console.log('Cover letter data', parsed);
        setGeneratedCoverLetter(parsed.coverLetter);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate cover letter. Please try again.");
    } finally {
      setLoadingCoverLetter(false);
    }
  };

  const handleGenerateBoth = async () => {
    await Promise.all([handleGenerateCV(), handleGenerateCoverLetter()]);
  };

  const handleNext = async () => {
    if (generatedResume || generatedCoverLetter) {
      await resumeDB.generatedResumes.put({ 
        id: 'latest', 
        data: { 
          resume: generatedResume || resume!, 
          coverLetter: generatedCoverLetter || '' 
        } 
      });
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

  const isLoading = loadingCV || loadingCoverLetter;
  const hasGenerated = generatedResume || generatedCoverLetter;

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Generate Resume & Cover Letter</CardTitle>
          <CardDescription>
            Enter a job description and generate a tailored CV and/or cover letter separately.
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

          {/* Generation status indicators */}
          {(generatedResume || generatedCoverLetter) && (
            <div className="flex gap-4 flex-wrap">
              {generatedResume && (
                <div className="text-green-600 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  CV Generated
                </div>
              )}
              {generatedCoverLetter && (
                <div className="text-green-600 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cover Letter Generated
                </div>
              )}
            </div>
          )}
          
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleGenerateCV} 
              disabled={isLoading}
              variant="outline"
              className="px-6"
            >
              {loadingCV ? "Generating CV..." : "Generate CV Only"}
            </Button>

            <Button 
              onClick={handleGenerateCoverLetter} 
              disabled={isLoading}
              variant="outline"
              className="px-6"
            >
              {loadingCoverLetter ? "Generating..." : "Generate Cover Letter Only"}
            </Button>
            
            <Button 
              onClick={handleGenerateBoth} 
              disabled={isLoading}
              className="px-6"
            >
              {isLoading ? "Generating..." : "Generate Both"}
            </Button>
            
            {hasGenerated && (
              <Button 
                onClick={handleNext}
                className="px-6"
                variant="default"
              >
                View Generated Content
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateResumeForm;
