import { Technologies } from "@nevmstas/hygraph-client";


export interface Experience {
  id: string;
  company?: string | null;
  startDate?: string;
  endDate?: string | null;
  jobTitile?: string | null;
  location?: string | null;
  description: string[];
  technologies: Technologies[];
  companyImage?: { url: string } | null;
}

export interface ExperienceContentProps {
  experiences: Experience[];
} 