import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod.mjs"
import { ResumeQuery } from "@nevmstas/hygraph-client"
import { resumeOnlySchema } from "@/schema"
import { classifyRole } from "./classify-role"
import { buildSystemPrompt } from "./system-prompt"

export const promptCV = async (
  openaiClient: OpenAI,
  jobDescription: string,
  resume: ResumeQuery
) => {
  const classification = await classifyRole(openaiClient, jobDescription)

  const systemPrompt = buildSystemPrompt({
    ...classification,
    jobDescription,
    resume,
  })

  const completion = await openaiClient.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Optimize this resume for the job description. Return the complete resume with these updates:

BIO:
- "role" field: punchy headline, 5-8 words, use job title keywords
- "aboutMe" field: 40-50 words, career summary focused on this role, include 2-3 job description keywords naturally

SKILLS:
- Reorder: most relevant to this job first
- Add skills from job description that fit the candidate's background
- Use exact terminology from the job posting
- Keep skill "type" values accurate (frontend, backend, mobile, ai, cloud, cicd, architecture, blockchain)
- NEVER remove existing skills — only add new ones relevant to the job description

EXPERIENCES:
- For the 2 most recent roles: update jobTitle to align with target role, add 1-2 bullet points matching job requirements with metrics
- Keep ALL existing bullet points, only ADD new ones
- Keep older experiences unchanged
- Never remove any experience

PROJECTS, EDUCATIONS, CERTIFICATIONS: return unchanged.`,
      },
    ],
    response_format: zodResponseFormat(resumeOnlySchema, "resume"),
  })

  return completion.choices[0].message.content
}
