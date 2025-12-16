import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { getCoverLetterMessage } from "./get-cover-letter-message";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import { coverLetterOnlySchema } from "@/schema";

export const promptCoverLetter = async (
  openaiClient: OpenAI,
  jobDescription: string,
  resume: ResumeQuery
) => {
  const completion = await openaiClient.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You're an expert cover letter strategist specializing in creating compelling, job-specific cover letters.
                  
                  Your expertise includes:
                  - Analyzing job descriptions to identify key requirements, keywords, and priorities
                  - Creating compelling, personalized cover letters that connect the candidate's background to specific roles
                  - Understanding what hiring managers look for in cover letters
                  - Analyzing and showcasing open-source projects, especially production-ready libraries
                  
                  Your goals are to:
                  1. Thoroughly analyze the job description to understand what the employer is seeking
                  2. Analyze the candidate's resume, especially projects and notable achievements
                  3. Create a tailored cover letter that connects the candidate's background and projects to this specific role
                  
                  Always prioritize relevance, authenticity, and a compelling narrative.
                  Pay special attention to projects - they demonstrate practical skills and real-world application.
                  
                  IMPORTANT: The cover letter must include a contact section at the end with:
                  - GitHub: github.com/nevmstas
                  - LinkedIn: linkedin.com/in/nevmstas
                  - Email: nevmyvakastas@gmail.com
                  - Personal website: https://nevmstas.github.io/`,
      },
      {
        role: "system",
        content: `Job Description:
${jobDescription}

Resume Data:
${JSON.stringify(resume, null, 2)}

Analyze the job description carefully. Identify:
- Required and preferred skills/technologies
- Key responsibilities and challenges
- Success metrics and expectations
- Company culture indicators

Analyze the candidate's background:
- Production-ready open-source libraries (these demonstrate real-world impact and technical expertise)
- Projects that use technologies mentioned in the job description
- Projects that solve problems similar to what the role requires
- Notable achievements and experiences

Then create a compelling cover letter that connects the candidate's background to this specific role.`,
      },
      getCoverLetterMessage(jobDescription),
    ],
    response_format: zodResponseFormat(coverLetterOnlySchema, "coverLetter"),
  });

  return completion.choices[0].message.content;
};

