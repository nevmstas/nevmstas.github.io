import { ChatCompletionMessageParam } from "openai/resources";

export const getSkillsMessage = (): ChatCompletionMessageParam => {
  return {
    role: "user",
    content: `Enhance skills:
- Add any relevant complementary skills that strengthen my candidacy
- Add id to each new skill
- Remove skills that aren't relevant to this role
- Add 3 the most modern and popular skills relevant to FrontEnd Engineer in 2025, that I don't have yet
- Order skills logically by category/domain`,
  };
};
