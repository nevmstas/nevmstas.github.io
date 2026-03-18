import { ResumeQuery } from "@nevmstas/hygraph-client"
import { RoleType } from "./classify-role"

interface PromptContext {
  roleType: RoleType
  companyName: string
  keyTechnologies: string[]
  mustHaveSkills: string[]
  jobDescription: string
  resume: ResumeQuery
}

const ROLE_EMPHASIS: Record<RoleType, string> = {
  frontend:
    "Emphasize UI/UX work, component architecture, design systems, performance optimization, accessibility, and browser-level expertise.",
  mobile:
    "Emphasize mobile development, native/cross-platform experience, app store delivery, mobile performance, and device-specific optimizations.",
  ai_native:
    "Emphasize AI/ML integration, LLM usage, prompt engineering, data pipelines, and building AI-powered product features.",
  fullstack:
    "Balance frontend and backend equally. Emphasize system design, API development, database work, and end-to-end feature delivery.",
}

export const buildSystemPrompt = (ctx: PromptContext): string => {
  return `You are a resume optimization engine. Your only goal: help this resume pass ATS screening and get to a human reviewer.

ROLE CONTEXT:
- Target role type: ${ctx.roleType}
- Company: ${ctx.companyName || "Unknown"}
- Key technologies: ${ctx.keyTechnologies.join(", ")}
- Must-have skills: ${ctx.mustHaveSkills.join(", ")}
- ${ROLE_EMPHASIS[ctx.roleType]}

RULES:
1. DATA PRESERVATION: Return ALL experiences, projects, educations, certifications. Count must match input exactly.
2. ATS FIRST: Use exact keywords from the job description. Match their terminology (e.g. "React" not "React.js" if they say "React").
3. NO AI FLUFF: No buzzwords like "passionate", "driven", "leveraged". No filler. Every word must carry information.
4. BULLET POINTS: Start with strong action verbs. Include metrics where possible. Max 1 line each.
5. SKILLS: Include candidate's real skills that match the job + add skills from the job description that are reasonable for the candidate's background.
6. Keep it honest. Reframe and optimize, don't fabricate.

JOB DESCRIPTION:
${ctx.jobDescription}

RESUME DATA:
${JSON.stringify(ctx.resume, null, 2)}`
}

export type { PromptContext }
