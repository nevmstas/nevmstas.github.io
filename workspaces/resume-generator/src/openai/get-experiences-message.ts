import { ChatCompletionMessageParam } from "openai/resources";

export const getExperiencesMessage = (): ChatCompletionMessageParam => {
  return {
    role: "user",
    content: `Enhance experiences based on the job description:

CRITICAL RULES - MUST FOLLOW:
1. PRESERVE ALL DATA: Return ALL experiences exactly as provided - never remove, skip, or omit any experience
2. PRESERVE ALL PROJECTS: Return ALL projects exactly as provided - never remove, skip, or omit any project
3. The output must contain the SAME NUMBER of experiences and projects as the input

For experiences enhancement:
- For the 2 most recent roles only, you MAY add 1-2 additional bullet points to the description array that:
  * Match the job description requirements and keywords
  * Show achievements and impact with quantifiable metrics where possible
  * Use similar language and terminology as the job posting
- Keep ALL existing description bullet points - only ADD new ones, never remove
- Keep all other experiences completely unchanged
- Keep all projects completely unchanged - return them exactly as provided

VERIFICATION: Before responding, count the experiences and projects in input vs output - they MUST match.`,
  };
};
