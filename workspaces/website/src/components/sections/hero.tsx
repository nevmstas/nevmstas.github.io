import { GlitchText } from "@/components/widgets"
import { ScrollButton } from "../common"
import gqlClient from "@/gql-client"
import { ResumeButton } from "../common";

export async function HeroSection() {
  const { profiles } = await gqlClient.Profile();
  const profile = profiles[0];
  const titles = ["DEVELOPER", "INNOVATOR", "CREATOR", "BUILDER"]

  return (
    <section className="relative h-screen flex flex-col items-center justify-center px-4">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      {/* Neon lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-transparent via-purple-500 to-transparent opacity-70"></div>

      <div className="relative z-10 text-center space-y-6 max-w-4xl">
        <div className="inline-block px-6 py-2 border border-purple-500/30 rounded-full text-sm font-mono text-purple-400 bg-purple-500/10 backdrop-blur-sm">
          <span className="mr-2 inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
          ONLINE
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">{profile.name}</span>
        </h1>

        <div className="h-16">
          <GlitchText titles={titles} />
        </div>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg hidden sm:block">
          {profile.aboutMe}
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <ResumeButton />
        </div>
      </div>

      <ScrollButton />
    </section>
  )
}

