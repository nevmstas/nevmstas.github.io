import Dexie, { Table } from 'dexie';
import { ResumeQuery } from '@nevmstas/hygraph-client';

export interface GeneratedResume {
  id: string; // always use 'latest' for the single resume
  data: {
    resume: ResumeQuery
    coverLetter: string
    companyName?: string
  };
}

class ResumeDB extends Dexie {
  generatedResumes!: Table<GeneratedResume, string>;

  constructor() {
    super('ResumeDB');
    this.version(2).stores({
      generatedResumes: 'id'
    });
  }
}

export const resumeDB = new ResumeDB();