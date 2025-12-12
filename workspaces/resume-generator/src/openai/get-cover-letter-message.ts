import { ChatCompletionMessageParam } from "openai/resources";

export const getCoverLetterMessage = (jobDescription: string): ChatCompletionMessageParam => {
  return {
    role: "user",
    content: `Generate a compelling cover letter based on the job description:
- Analyze the job description to understand: company needs, role challenges, key requirements, and what success looks like
- Opens with an unexpected, emotionally resonant hook that references something specific from the job description or company
- Uses conversational, human language (like you're talking to a friend)
- Includes natural pauses and authentic voice
- Keeps structure loose and organic (4-5 sentences max)
- Focuses on connection over formality
- Avoids complex punctuation (max 1-2 commas, no dashes)
- Ends with energy and enthusiasm
- Analyze projects from the resume, especially production-ready open-source libraries:
  * Identify projects that align with the job's requirements
  * If I have a production-ready open-source library, consider mentioning it as it demonstrates real-world impact and technical expertise
  * Connect project achievements to the specific challenges mentioned in the job description
- Write a summary paragraph that:
  * Highlights my 2-3 most relevant experiences and projects that directly address the job's main requirements
  * If relevant, mentions my production-ready open-source library or significant open-source contributions (this shows initiative, technical depth, and real-world application)
  * Connects my past achievements and projects to the specific challenges/needs mentioned in the job description
  * Shows understanding of what the role requires and why I'm uniquely qualified
  * Mentions specific skills, technologies, or experiences from the job description
  * Demonstrates enthusiasm for the specific role (not generic)
- Use language that mirrors the job description's tone and priorities
- Optimize for ATS by naturally incorporating relevant keywords from the job posting
- Make it clear this cover letter is tailored to THIS specific job, not generic
- After the cover letter content, add a contact section with the following information:
  * GitHub: github.com/nevmstas
  * LinkedIn: linkedin.com/in/nevmstas
  * Email: nevmyvakastas@gmail.com
  * Personal website: https://nevmstas.github.io/
- Format the contact section clearly and professionally, placing it after the main cover letter text`,
  };
};
