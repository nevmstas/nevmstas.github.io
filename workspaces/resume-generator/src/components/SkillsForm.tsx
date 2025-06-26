"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResume } from "../context/ResumeContext";

export default function SkillsForm() {
  const { resume, setResume } = useResume();

  const handleSkillChange = (idx: number, value: string) => {
    const newSkills = [...resume.skills];
    newSkills[idx] = { name: value };
    setResume({ ...resume, skills: newSkills });
  };

  const addSkill = () => {
    setResume({ ...resume, skills: [...resume.skills, { name: "" }] });
  };

  const removeSkill = (idx: number) => {
    const newSkills = resume.skills.filter((_, i) => i !== idx);
    setResume({ ...resume, skills: newSkills });
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Skills</h2>
      <div className="grid gap-2">
        {resume.skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Input
              value={skill.name}
              onChange={e => handleSkillChange(idx, e.target.value)}
              placeholder="Skill"
            />
            <Button type="button" variant="destructive" onClick={() => removeSkill(idx)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={addSkill}>Add Skill</Button>
      </div>
    </section>
  );
} 