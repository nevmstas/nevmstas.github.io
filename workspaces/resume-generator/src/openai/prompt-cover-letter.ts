import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod.mjs"
import { ResumeQuery } from "@nevmstas/hygraph-client"
import { coverLetterOnlySchema } from "@/schema"
import { classifyRole } from "./classify-role"
import { buildSystemPrompt } from "./system-prompt"

export const promptCoverLetter = async (
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
        content: `Write a cover letter for this job. Requirements:

STRUCTURE:
- 3-4 short paragraphs, under 250 words total
- Opening: state the role and why this company specifically (use something concrete from the job description)
- Middle: 2-3 most relevant achievements/experiences with specific results, connect them to what the role needs. Do NOT mention previous company names — refer to experience by role or domain instead (e.g. "In my previous role as a frontend engineer..." not "At Acme Corp..."). If any projects from the resume use technologies or solve problems matching the job description, mention the most relevant one by name with a concrete result or metric.
- Closing: one sentence, forward-looking, no generic "I look forward to hearing from you"

STYLE:
- Professional and direct. No filler words.
- No "passionate", "driven", "excited to leverage", "thrilled"
- Use job description keywords naturally
- Write like a competent engineer, not a marketing brochure

End with contact section:
GitHub: github.com/nevmstas
LinkedIn: linkedin.com/in/nevmstas
Email: nevmyvakastas@gmail.com
Website: https://nevmstas.github.io/`,
      },
    ],
    response_format: zodResponseFormat(coverLetterOnlySchema, "coverLetter"),
  })

  return completion.choices[0].message.content
}
