import { ResumeQuery } from "@nevmstas/hygraph-client";

interface GenerateCoverLetterParams {
  jobDescription: string;
  resume: ResumeQuery;
}

interface GenerateCoverLetterResponse {
  coverLetter: string;
}

export async function generateCoverLetter({ jobDescription, resume }: GenerateCoverLetterParams): Promise<GenerateCoverLetterResponse> {
  const response = await fetch('/api/generate-cover-letter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jobDescription,
      resume,
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
  const data = JSON.parse(responseText);
  const parsed = JSON.parse(data.aiResponse);
  console.log('Cover letter data', parsed);
  
  return { coverLetter: parsed.coverLetter };
}

