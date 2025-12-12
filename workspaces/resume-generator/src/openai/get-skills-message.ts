import { ChatCompletionMessageParam } from "openai/resources";

export const getSkillsMessage = (jobDescription: string): ChatCompletionMessageParam => {
  return {
    role: "user",
    content: `Enhance skills based on the job description:
- Analyze the job description to extract: required technical skills, preferred technologies, tools, frameworks, and methodologies
- Analyze projects from the resume to identify skills demonstrated through real-world work:
  * Skills used in production-ready open-source libraries (these prove practical expertise)
  * Technologies and tools showcased in projects relevant to the job
  * Skills that can be inferred from project descriptions and achievements
- Prioritize skills that directly match or are closely related to the job requirements (place these at the top)
- Add any relevant complementary skills that strengthen my candidacy for this specific role
- Add id to each new skill
- Remove or deprioritize skills that aren't relevant to this role (move to bottom or remove if completely unrelated)
- Identify gaps: Add 2-3 modern, in-demand skills from the job description that I don't have yet, but are learnable/transferable
- If the job description mentions specific technologies/tools not in my skills, add them if they're commonly used in my field
- Order skills logically by category/domain, with most relevant categories first
- Ensure skill names match the exact terminology used in the job description (e.g., "React" vs "React.js")
- Optimize for ATS by including exact skill keywords from the job posting
- Consider highlighting skills that are demonstrated through open-source work, as this shows real-world application`,
  };
};
