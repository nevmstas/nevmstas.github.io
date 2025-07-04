"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeContext";

export const EducationForm = () => {
  const { resume, setResume } = useResume();

  const handleEducationChange = (
    idx: number,
    field: string,
    value: string | string[]
  ) => {
    const newEducations = [...resume.educations];
    newEducations[idx] = { ...newEducations[idx], [field]: value };
    setResume({ ...resume, educations: newEducations });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      educations: [
        ...resume.educations,
        {
          id: Date.now().toString(),
          institution: '',
          degree: '',
          specialization: '',
          period: '',
          achievements: [''],
        },
      ],
    });
  };

  const removeEducation = (idx: number) => {
    const newEducations = resume.educations.filter((_, i) => i !== idx);
    setResume({ ...resume, educations: newEducations });
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Education</h2>
      {resume.educations.map((edu, idx) => (
        <div key={edu.id} className="border p-4 rounded space-y-2">
          <div>
            <Label>Institution</Label>
            <Input value={edu.institution ?? ""} onChange={e => handleEducationChange(idx, 'institution', e.target.value)} />
          </div>
          <div>
            <Label>Degree</Label>
            <Input value={edu.degree ?? ""} onChange={e => handleEducationChange(idx, 'degree', e.target.value)} />
          </div>
          <div>
            <Label>Specialization</Label>
            <Input value={edu.specialization ?? ""} onChange={e => handleEducationChange(idx, 'specialization', e.target.value)} />
          </div>
          <div>
            <Label>Period</Label>
            <Input value={edu.period ?? ""} onChange={e => handleEducationChange(idx, 'period', e.target.value)} />
          </div>
          <div>
            <Label>Achievements</Label>
            <Textarea
              value={edu.achievements?.join('\n') ?? ''}
              onChange={e => {
                const value = e.target.value? e.target.value.split('\n'): [];
                handleEducationChange(idx, 'achievements', value);
              }}
            />
          </div>
          <Button type="button" variant="destructive" onClick={() => removeEducation(idx)}>
            Remove Education
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addEducation}>Add Education</Button>
    </section>
  );
} 