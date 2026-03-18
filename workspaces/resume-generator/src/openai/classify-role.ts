import OpenAI from "openai"

export type RoleType = "fullstack" | "frontend" | "mobile" | "ai_native"

interface RoleClassification {
  roleType: RoleType
  companyName: string
  keyTechnologies: string[]
  mustHaveSkills: string[]
}

const ROLE_CLASSIFICATION_PROMPT = `You classify job descriptions into exactly one role type.

Respond ONLY with valid JSON, no markdown, no explanation.

Role types:
- "frontend" — primarily UI/UX, React, Vue, Angular, CSS, design systems, browser APIs
- "mobile" — iOS, Android, React Native, Flutter, Swift, Kotlin
- "ai_native" — ML/AI-first roles, LLM integration, prompt engineering, AI infrastructure
- "fullstack" — everything else, or when both frontend and backend are equally important

Extract:
- roleType: one of the four types above
- companyName: company name from the job description (empty string if not found)
- keyTechnologies: top 5-8 specific technologies/frameworks mentioned
- mustHaveSkills: top 3-5 non-negotiable skills from "required" or "must have" sections

JSON schema:
{"roleType": string, "companyName": string, "keyTechnologies": string[], "mustHaveSkills": string[]}`

export const classifyRole = async (
  client: OpenAI,
  jobDescription: string
): Promise<RoleClassification> => {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: ROLE_CLASSIFICATION_PROMPT },
      { role: "user", content: jobDescription },
    ],
    temperature: 0,
  })

  const content = completion.choices[0].message.content
  if (!content) {
    throw new Error("No response from role classification")
  }

  return JSON.parse(content) as RoleClassification
}
