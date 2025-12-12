import { ChatCompletionMessageParam } from "openai/resources";

export const getBioMessage = (jobDescription: string): ChatCompletionMessageParam => {
  return {
    role: "user",
    content: `Update bios based on the job description:
- Analyze the job description to identify: required skills, key responsibilities, company values, and preferred qualifications
- Analyze projects from the resume, especially production-ready open-source libraries:
  * Identify which projects best demonstrate skills relevant to this role
  * If I have a production-ready open-source library, consider mentioning it as it shows real-world impact
  * Connect project achievements to the job's requirements
- Create a punchy headline (5-8 words) that positions me perfectly for this specific role, incorporating 1-2 key job title keywords
- Write an "aboutMe" section (40-50 words) that:
  * Summarizes my career story with focus on experiences and projects most relevant to this role
  * If relevant, briefly mention open-source contributions or production-ready libraries (this demonstrates technical expertise and real-world impact)
  * Highlights my unique value proposition that directly addresses the job's main requirements
  * Demonstrates cultural fit by aligning with company values mentioned in the job description
  * Incorporates 2-3 specific keywords/phrases from the job description naturally
  * Shows quantifiable impact where possible
- Ensure the headline and aboutMe use language that mirrors the job description's tone and terminology
- Optimize for ATS by naturally including relevant keywords from the job posting`,
  };
};
