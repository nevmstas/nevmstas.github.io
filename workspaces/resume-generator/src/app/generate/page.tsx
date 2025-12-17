"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import { resumeDB } from "@/db/resume-db";
import { fetchResume, generateCV, generateCoverLetter } from "@/services";

const GenerateResumeForm = () => {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loadingCV, setLoadingCV] = useState(false);
  const [loadingCoverLetter, setLoadingCoverLetter] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedResume, setGeneratedResume] = useState<ResumeQuery | null>(null);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState<string | null>(null);
  const [resume, setResume] = useState<ResumeQuery | null>(null);
  const [resumeLoading, setResumeLoading] = useState(true);

  useEffect(() => {
    const loadResume = async () => {
      try {
        setResumeLoading(true);
        const resumeData = await fetchResume();
        setResume(resumeData);
      } catch (err) {
        console.error("Error fetching resume:", err);
        setError("Failed to load resume data");
      } finally {
        setResumeLoading(false);
      }
    };

    loadResume();
  }, []);

  const handleGenerateCV = async () => {
    if (!jobDescription.trim() && !companyName.trim()) {
      setError("Please enter a company name or job description");
      return;
    }

    if (!resume) {
      setError("Resume data not loaded");
      return;
    }

    setLoadingCV(true);
    setError(null);

    try {
      const result = await generateCV({ jobDescription, resume });
      setGeneratedResume(result.resume);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate CV. Please try again.");
    } finally {
      setLoadingCV(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!jobDescription.trim() && !companyName.trim()) {
      setError("Please enter a company name or job description");
      return;
    }

    if (!resume) {
      setError("Resume data not loaded");
      return;
    }

    setLoadingCoverLetter(true);
    setError(null);

    try {
      const result = await generateCoverLetter({ jobDescription, resume });
      setGeneratedCoverLetter(result.coverLetter);
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
          coverLetter: generatedCoverLetter || '',
          companyName: companyName.trim() || undefined
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
  const canGenerate = companyName.trim() && jobDescription.trim();

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
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              placeholder="e.g. google, meta, stripe..."
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Used for the CV filename: stas-nevmyvaka-cv-{companyName || 'company'}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px] max-h-[400px]"
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
              disabled={isLoading || !canGenerate}
              variant="outline"
              className="px-6"
            >
              {loadingCV ? "Generating CV..." : "Generate CV Only"}
            </Button>

            <Button 
              onClick={handleGenerateCoverLetter} 
              disabled={isLoading || !canGenerate}
              variant="outline"
              className="px-6"
            >
              {loadingCoverLetter ? "Generating..." : "Generate Cover Letter Only"}
            </Button>
            
            <Button 
              onClick={handleGenerateBoth} 
              disabled={isLoading || !canGenerate}
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
