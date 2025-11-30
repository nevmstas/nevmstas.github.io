import { EducationSection, LinksSection, ExperienceSection, SkillsSection, HeroSection } from "@/components/sections"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none"></div>
      <div className="relative z-10">
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <LinksSection />
        <Footer />
      </div>
    </main>
  )
}

  