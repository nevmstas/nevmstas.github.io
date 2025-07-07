"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { ResumeQuery } from "@nevmstas/hygraph-client";

interface ProfileFormProps {
  form: UseFormReturn<ResumeQuery>;
}

export const ProfileForm = ({ form }: ProfileFormProps) => {
  const { register } = form;
  const profile = form.watch("profiles.0");

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <div className="grid gap-4">
        <div>
          <Label>Name</Label>
          <Input {...register("profiles.0.name")} defaultValue={profile?.name ?? ""} />
        </div>
        <div>
          <Label>Role</Label>
          <Input {...register("profiles.0.role")} defaultValue={profile?.role ?? ""} />
        </div>
        <div>
          <Label>About Me</Label>
          <Textarea {...register("profiles.0.aboutMe")} defaultValue={profile?.aboutMe ?? ""} />
        </div>
        <div>
          <Label>Email</Label>
          <Input {...register("profiles.0.contactEmail")} defaultValue={profile?.contactEmail ?? ""} />
        </div>
        <div>
          <Label>LinkedIn</Label>
          <Input {...register("profiles.0.linkedIn")} defaultValue={profile?.linkedIn ?? ""} />
        </div>
        <div>
          <Label>GitHub</Label>
          <Input {...register("profiles.0.github")} defaultValue={profile?.github ?? ""} />
        </div>
      </div>
    </section>
  );
}; 