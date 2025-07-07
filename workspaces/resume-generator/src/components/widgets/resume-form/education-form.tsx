"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ResumeQuery } from "@nevmstas/hygraph-client";

interface EducationFormProps {
  form: UseFormReturn<ResumeQuery>;
}

export const EducationForm = ({ form }: EducationFormProps) => {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  const addEducation = () => {
    append({
      id: Date.now().toString(),
      institution: '',
      degree: '',
      specialization: '',
      period: '',
      achievements: [''],
    });
  };

  const removeEducation = (idx: number) => {
    remove(idx);
  };

  const handleAchievementsChange = (idx: number, value: string) => {
    const achievementsArray = value 
      ? value.split('\n').filter(line => line.trim() !== '') 
      : [''];
    
    // Ensure we always have at least one item
    if (achievementsArray.length === 0) {
      achievementsArray.push('');
    }
    
    form.setValue(`educations.${idx}.achievements`, achievementsArray);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Education</h2>
      {fields.map((edu, idx) => (
        <div key={edu.id} className="border p-4 rounded space-y-2">
          <div>
            <Label>Institution</Label>
            <Input {...register(`educations.${idx}.institution`)} defaultValue={edu.institution ?? ""} />
          </div>
          <div>
            <Label>Degree</Label>
            <Input {...register(`educations.${idx}.degree`)} defaultValue={edu.degree ?? ""} />
          </div>
          <div>
            <Label>Specialization</Label>
            <Input {...register(`educations.${idx}.specialization`)} defaultValue={edu.specialization ?? ""} />
          </div>
          <div>
            <Label>Period</Label>
            <Input {...register(`educations.${idx}.period`)} defaultValue={edu.period ?? ""} />
          </div>
          <div>
            <Label>Achievements</Label>
            <Textarea
              defaultValue={edu.achievements?.join('\n') ?? ''}
              onChange={(e) => handleAchievementsChange(idx, e.target.value)}
              placeholder="Enter achievements (one per line)"
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
}; 