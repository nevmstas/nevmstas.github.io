"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ResumeQuery } from "@nevmstas/hygraph-client";

interface ExperiencesFormProps {
  form: UseFormReturn<ResumeQuery>;
}

export const ExperiencesForm = ({ form }: ExperiencesFormProps) => {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const addExperience = () => {
    append({
      id: Date.now().toString(),
      company: '',
      startDate: '',
      endDate: '',
      jobTitile: '',
      location: '',
      description: [''],
      companyImage: null,
      skills: [],
    });
  };

  const removeExperience = (idx: number) => {
    remove(idx);
  };

  const handleDescriptionChange = (idx: number, value: string) => {
    const descriptionArray = value 
      ? value.split('\n').filter(line => line.trim() !== '') 
      : [''];
    
    // Ensure we always have at least one item
    if (descriptionArray.length === 0) {
      descriptionArray.push('');
    }
    
    form.setValue(`experiences.${idx}.description`, descriptionArray);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Experiences</h2>
      {fields.map((exp, idx) => (
        <div key={exp.id} className="border p-4 rounded space-y-2">
          <div>
            <Label>Company</Label>
            <Input {...register(`experiences.${idx}.company`)} defaultValue={exp.company ?? ""} />
          </div>
          <div>
            <Label>Job Title</Label>
            <Input {...register(`experiences.${idx}.jobTitile`)} defaultValue={exp.jobTitile ?? ""} />
          </div>
          <div>
            <Label>Location</Label>
            <Input {...register(`experiences.${idx}.location`)} defaultValue={exp.location ?? ""} />
          </div>
          <div>
            <Label>Start Date</Label>
            <Input 
              type="date" 
              {...register(`experiences.${idx}.startDate`)} 
              defaultValue={exp.startDate} 
            />
          </div>
          <div>
            <Label>End Date</Label>
            <Input 
              type="date" 
              {...register(`experiences.${idx}.endDate`)} 
              defaultValue={exp.endDate || ''} 
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              defaultValue={exp.description?.join('\n')}
              onChange={(e) => handleDescriptionChange(idx, e.target.value)}
              placeholder="Enter description points (one per line)"
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
}; 