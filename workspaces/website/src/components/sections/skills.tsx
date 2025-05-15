import { Badge } from "@/components/ui/badge";
import gqlClient from "@/app/gql-client";
import { SkillsTabs } from "@/components/widgets/skills-tab";
import { SectionHeader } from "../common/section-header";
import { SkillsQuery } from "@nevmstas/hygraph-client";

const getSkills = async (
  first: number = 10,
  skip: number = 0
): Promise<SkillsQuery["skills"]> => {
  const response = await gqlClient.Skills({ first, skip });
  if (response.skills.length === 0) {
    return [];
  }

  return [...response.skills, ...(await getSkills(first, skip + first))];
};

export const SkillsSection = async () => {
  const response = await gqlClient.SkillTypes();
  const enumValues = response.__type?.enumValues ?? [];

  const skills = await getSkills();

  return (
    <section id="skills" className="relative py-20 px-4 scroll-mt-20">
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

        <SkillsTabs skills={skills} skillTypes={enumValues} />
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-1/4 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl"></div>
    </section>
  );
};
