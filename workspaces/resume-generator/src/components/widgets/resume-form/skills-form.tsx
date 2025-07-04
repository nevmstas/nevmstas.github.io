"use client";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeContext";
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableSkillItem } from './sortable-skill-item';

export const SkillsForm = () => {
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = resume.skills.findIndex((_, idx) => idx.toString() === active.id);
      const newIndex = resume.skills.findIndex((_, idx) => idx.toString() === over?.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newSkills = arrayMove(resume.skills, oldIndex, newIndex);
        setResume({ ...resume, skills: newSkills });
      }
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Skills</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={resume.skills.map((_, idx) => idx.toString())}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-2">
            {resume.skills.map((skill, idx) => (
              <SortableSkillItem
                key={skill.name}
                id={idx.toString()}
                value={skill.name}
                onChange={value => handleSkillChange(idx, value)}
                onRemove={() => removeSkill(idx)}
              />
            ))}
            <Button type="button" onClick={addSkill}>Add Skill</Button>
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
} 