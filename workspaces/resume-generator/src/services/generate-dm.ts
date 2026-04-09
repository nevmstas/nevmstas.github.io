import { ResumeQuery } from "@nevmstas/hygraph-client";

interface GenerateDMParams {
  jobDescription: string;
  resume: ResumeQuery;
}

interface GenerateDMResponse {
  dmMessage: string;
}

export async function generateDM({ jobDescription, resume }: GenerateDMParams): Promise<GenerateDMResponse> {
  const response = await fetch('/api/generate-dm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ jobDescription, resume }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    try {
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.error || 'Failed to generate DM message');
    } catch {
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
  }

  const data = await response.json();
  const parsed = JSON.parse(data.aiResponse);

  return { dmMessage: parsed.dmMessage };
}
