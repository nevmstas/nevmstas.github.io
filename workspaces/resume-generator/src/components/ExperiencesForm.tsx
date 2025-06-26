"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useResume } from "../context/ResumeContext";

export default function ExperiencesForm() {
  const { resume, setResume } = useResume();

  const handleExperienceChange = (
    idx: number,
    field: string,
    value: string | string[]
  ) => {
    const newExperiences = [...resume.experiences];
    newExperiences[idx] = { ...newExperiences[idx], [field]: value };
    setResume({ ...resume, experiences: newExperiences });
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experiences: [
        ...resume.experiences,
        {
          id: Date.now().toString(),
          company: '',
          startDate: '',
          endDate: '',
          jobTitile: '',
          location: '',
          description: [''],
          companyImage: null,
          skills: [],
        },
      ],
    });
  };

  const removeExperience = (idx: number) => {
    const newExperiences = resume.experiences.filter((_, i) => i !== idx);
    setResume({ ...resume, experiences: newExperiences });
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Experiences</h2>
      {resume.experiences.map((exp, idx) => (
        <div key={exp.id} className="border p-4 rounded space-y-2">
          <div>
            <Label>Company</Label>
            <Input value={exp.company ?? ""} onChange={e => handleExperienceChange(idx, 'company', e.target.value)} />
          </div>
          <div>
            <Label>Job Title</Label>
            <Input value={exp.jobTitile ?? ""} onChange={e => handleExperienceChange(idx, 'jobTitile', e.target.value)} />
          </div>
          <div>
            <Label>Location</Label>
            <Input value={exp.location ?? ""} onChange={e => handleExperienceChange(idx, 'location', e.target.value)} />
          </div>
          <div>
            <Label>Start Date</Label>
            <Input type="date" value={exp.startDate} onChange={e => handleExperienceChange(idx, 'startDate', e.target.value)} />
          </div>
          <div>
            <Label>End Date</Label>
            <Input type="date" value={exp.endDate || ''} onChange={e => handleExperienceChange(idx, 'endDate', e.target.value)} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={exp.description.join('\n')}
              onChange={e => handleExperienceChange(idx, 'description', e.target.value.split('\n'))}
            />
          </div>
          <Button type="button" variant="destructive" onClick={() => removeExperience(idx)}>
            Remove Experience
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addExperience}>Add Experience</Button>
    </section>
  );
} 