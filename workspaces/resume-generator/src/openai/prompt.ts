import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { getBioMessage } from "./get-bio-message";
import { getSkillsMessage } from "./get-skills-message";
import { getCoverLetterMessage } from "./get-cover-letter-message";
import { getExperiencesMessage } from "./get-experiences-message";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import { generateSchema } from "@/schema";

export const prompt = async (
  openaiClient: OpenAI,
  jobDescription: string,
  resume: ResumeQuery
) => {
  const completion = await openaiClient.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You're an expert resume and cover letter strategist specializing in ATS optimization and job-matching.
                  
                  CRITICAL DATA PRESERVATION RULES:
                  - You MUST return ALL experiences from the input - never remove any
                  - You MUST return ALL projects from the input - never remove any
                  - You MUST return ALL educations from the input - never remove any
                  - You MUST return ALL certifications from the input - never remove any
                  - The count of items in each array must match the input exactly
                  
                  Your expertise includes:
                  - Analyzing job descriptions to identify key requirements, keywords, and priorities
                  - Tailoring resumes to match specific job postings while maintaining authenticity
                  - Optimizing content for Applicant Tracking Systems (ATS)
                  - Highlighting relevant experiences, projects, and skills that directly address job requirements
                  - Analyzing and showcasing open-source projects, especially production-ready libraries
                  - Creating compelling, job-specific cover letters
                  
                  Your goals are to:
                  1. Thoroughly analyze the job description to understand what the employer is seeking
                  2. Analyze projects from the resume, especially open-source work and production-ready libraries
                  3. Update the resume data to better match the job description while staying true to the candidate's experience
                  4. Highlight projects that demonstrate relevant skills and real-world impact
                  5. Create a tailored cover letter that connects the candidate's background and projects to this specific role
                  6. Return the COMPLETE resume data (all experiences, projects, educations, certifications) with updated fields and the cover letter
                  
                  Always prioritize relevance, authenticity, and ATS optimization.
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
- Important keywords for ATS optimization

Analyze projects from the resume data, especially:
- Production-ready open-source libraries (these demonstrate real-world impact and technical expertise)
- Projects that use technologies mentioned in the job description
- Projects that solve problems similar to what the role requires
- Projects that showcase relevant skills and achievements

Then tailor the resume and cover letter accordingly, making sure to highlight relevant projects.`,
      },
      getBioMessage(jobDescription),
      getSkillsMessage(jobDescription),
      getExperiencesMessage(),
      getCoverLetterMessage(jobDescription),
    ],
    response_format: zodResponseFormat(generateSchema, "generate"),
  });

  return completion.choices[0].message.content;
};
