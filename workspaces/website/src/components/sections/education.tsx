import gqlClient from "@/app/gql-client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar, Award } from "lucide-react"
import { VerifyButton } from "@/components/common"
import { SectionHeader } from "../common/section-header"

export const EducationSection = async () => {
  const { certifications } = await gqlClient.Certifications()
  const { educations } = await gqlClient.Education()

  return (
    <section id="education" className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          headerText="Academic Background"
          description="My educational journey and professional certifications that have shaped my expertise in technology and development."
          badge={
            <Badge variant="outline" className="mb-4 border-purple-500/50 text-purple-400 bg-purple-950/20">
              EDUCATION
            </Badge>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <GraduationCap className="mr-2 h-5 w-5 text-purple-400" />
              Formal Education
            </h3>

            <div className="space-y-8">
              {educations.map((edu, index) => (
                <div key={index} className="relative pl-8 pb-8 border-l border-gray-800">
                  <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-purple-500"></div>
                  <div className="mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-950/50 text-purple-300 border border-purple-500/30">
                      <Calendar className="mr-1 h-3 w-3" />
                      {edu.period}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                  <p className="text-cyan-400 mb-2">{edu.specialization}</p>
                  <p className="text-gray-400 mb-4">{edu.institution}</p>

                  <div className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start">
                        <div className="mr-2 mt-1.5 h-1 w-1 rounded-full bg-purple-500"></div>
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Award className="mr-2 h-5 w-5 text-cyan-400" />
              Certifications
            </h3>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 transition-all">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-white">{cert.name}</h4>
                      <span className="text-xs text-cyan-400">{cert.date}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{cert.issuer}</p>

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">ID: {cert.credentialId}</div>
                      <div className="flex items-center gap-2">
                        {cert.link && <VerifyButton link={cert.link} />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="p-4 border border-dashed border-gray-700 rounded-lg text-center">
                <p className="text-sm text-gray-400 mb-2">Continuous learning is key to staying ahead</p>
                <p className="text-xs text-gray-500">More certifications coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute top-1/3 right-0 w-72 h-72 bg-purple-600/5 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-1/3 left-0 w-72 h-72 bg-cyan-600/5 rounded-full blur-3xl"></div>
    </section>
  )
}

