"use client";
import { Button } from "@/components/ui/button";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ResumeQuery } from "@nevmstas/hygraph-client";
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableSkillItem } from './sortable-skill-item';

interface SkillsFormProps {
  form: UseFormReturn<ResumeQuery>;
}

export const SkillsForm = ({ form }: SkillsFormProps) => {
  const { control } = form;
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "skills",
  });

  const addSkill = () => {
    append({ name: "" });
  };

  const removeSkill = (idx: number) => {
    remove(idx);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((_, idx) => idx.toString() === active.id);
      const newIndex = fields.findIndex((_, idx) => idx.toString() === over?.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        move(oldIndex, newIndex);
      }
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Skills</h2>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={fields.map((_, idx) => idx.toString())}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-2">
            {fields.map((skill, idx) => (
              <SortableSkillItem
                key={skill.id}
                id={idx.toString()}
                value={skill.name}
                onChange={(value) => {
                  const newSkills = [...fields];
                  newSkills[idx] = { ...newSkills[idx], name: value };
                  form.setValue("skills", newSkills);
                }}
                onRemove={() => removeSkill(idx)}
              />
            ))}
            <Button type="button" onClick={addSkill}>Add Skill</Button>
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
}; 