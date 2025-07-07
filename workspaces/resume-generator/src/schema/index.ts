import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  aboutMe: z.string().nullable().optional(),
  contactEmail: z.string().nullable().optional(),
  linkedIn: z.string().nullable().optional(),
  github: z.string().nullable().optional(),
});

const skillSchema = z.object({
  name: z.string(),
});

const companyImageSchema = z.object({
  url: z.string().nullable().optional(),
  id: z.string().nullable().optional(),
});

const experienceSchema = z.object({
  id: z.string(),
  company: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  jobTitile: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  description: z.array(z.string()),
  companyImage: companyImageSchema.nullable().optional(),
  skills: z.array(skillSchema),
});

const educationSchema = z.object({
  id: z.string(),
  period: z.string().nullable().optional(),
  degree: z.string().nullable().optional(),
  institution: z.string().nullable().optional(),
  achievements: z.array(z.string()),
  specialization: z.string().nullable().optional(),
});

const certificationSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  issuer: z.string().nullable().optional(),
  date: z.string().nullable().optional(),
  credentialId: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
});

const resumeSchema = z.object({
  profiles: z.array(profileSchema),
  skills: z.array(skillSchema),
  experiences: z.array(experienceSchema),
  educations: z.array(educationSchema),
  certifications: z.array(certificationSchema),
})

export const generateSchema = z.object({
  resume: resumeSchema,
  coverLetter: z.string().nullable().optional(),
});