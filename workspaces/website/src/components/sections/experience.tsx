import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "../common";
import { ExperienceContent } from "../widgets/experience-content";
import gqlClient from "@/app/gql-client";

export async function ExperienceSection() {
  const { experiences } = await gqlClient.Experiences();

  return (
    <section id="experience" className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          headerText="Professional Timeline"
          description="A chronological journey through my professional career, highlighting key roles and achievements in the tech
          industry."
          badge={
            <Badge
              variant="outline"
              className="mb-4 border-purple-500/50 text-purple-400 bg-purple-950/20"
            >
              EXPERIENCE
            </Badge>
          }
        />

        <ExperienceContent experiences={experiences} />
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute top-1/3 left-0 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-1/3 right-0 w-72 h-72 bg-cyan-600/5 rounded-full blur-3xl"></div>
    </section>
  );
}
