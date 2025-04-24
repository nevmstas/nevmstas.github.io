import { Badge } from "@/components/ui/badge";
import gqlClient from "@/app/gql-client";
import { SkillsTabs } from "@/components/widgets/skills-tab";
import { SectionHeader } from "../common/section-header";

export const SkillsSection = async () => {
  const { skills } = await gqlClient.Skills();

  const parsedSkills = skills?.[0] || {};

  return (
    <section id="skills" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          headerText="Technical Proficiency"
          description="A comprehensive overview of my technical capabilities across various domains, with a focus on cutting-edge technologies in the web3 space."
          badge={
            <Badge
              variant="outline"
              className="mb-4 border-cyan-500/50 text-cyan-400 bg-cyan-950/20"
            >
              SKILLS
            </Badge>
          }
        />

        <SkillsTabs skills={parsedSkills} />
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-1/4 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl"></div>
    </section>
  );
};
