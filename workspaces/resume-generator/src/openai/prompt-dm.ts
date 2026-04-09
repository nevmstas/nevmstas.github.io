import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod.mjs"
import { ResumeQuery } from "@nevmstas/hygraph-client"
import { dmMessageOnlySchema } from "@/schema"
import { classifyRole } from "./classify-role"
import { buildSystemPrompt } from "./system-prompt"

export const promptDM = async (
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
    model: "gpt-4.1",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Write a short DM message for this job (for Reddit, LinkedIn, or Messenger).

REQUIREMENTS:
- 3-5 sentences max, under 100 words total
- Conversational and direct — like a real person reaching out, not a pitch
- Mention the specific role and one concrete thing from the job description that caught attention
- Include one relevant skill or result from the resume that matches what the role needs
- If the resume includes open source projects or contributions relevant to the job, mention the most fitting one by name
- End with a single genuine question specific to this role or team (not "are you hiring", not "can I apply" — something about the work, stack, or team direction)
- After the question, add links on a new line: LinkedIn: linkedin.com/in/nevmstas | GitHub: github.com/nevmstas | Portfolio: nevmstas.github.io
- No "I'm reaching out because", no filler openers, no "I hope this message finds you well"`,
      },
    ],
    response_format: zodResponseFormat(dmMessageOnlySchema, "dmMessage"),
  })

  return completion.choices[0].message.content
}
