import { ResumeQuery } from "@nevmstas/hygraph-client";

interface GenerateCVParams {
  jobDescription: string;
  resume: ResumeQuery;
}

interface GenerateCVResponse {
  resume: ResumeQuery;
}

export async function generateCV({ jobDescription, resume }: GenerateCVParams): Promise<GenerateCVResponse> {
  const response = await fetch('/api/generate-cv', {
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
      throw new Error(errorData.error || 'Failed to generate CV');
    } catch {
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
  }

  const responseText = await response.text();
  const data = JSON.parse(responseText);
  const parsed = JSON.parse(data.aiResponse);
  console.log('CV data', parsed);
  
  return { resume: parsed.resume };
}

