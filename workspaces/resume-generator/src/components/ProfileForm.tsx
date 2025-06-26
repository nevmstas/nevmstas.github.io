"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useResume } from "../context/ResumeContext";

export default function ProfileForm() {
  const { resume, setResume } = useResume();
  const profile = resume.profiles[0];

  const handleChange = (field: keyof typeof profile, value: string) => {
    const newProfiles = [...resume.profiles];
    newProfiles[0] = { ...newProfiles[0], [field]: value };
    setResume({ ...resume, profiles: newProfiles });
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Profile</h2>
      <div className="grid gap-4">
        <div>
          <Label>Name</Label>
          <Input value={profile.name ?? ""} onChange={(e) => handleChange('name', e.target.value)} />
        </div>
        <div>
          <Label>Role</Label>
          <Input value={profile.role ?? ""} onChange={e => handleChange('role', e.target.value)} />
        </div>
        <div>
          <Label>About Me</Label>
          <Textarea value={profile.aboutMe ?? ""} onChange={e => handleChange('aboutMe', e.target.value)} />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={profile.contactEmail ?? ""} onChange={e => handleChange('contactEmail', e.target.value)} />
        </div>
        <div>
          <Label>LinkedIn</Label>
          <Input value={profile.linkedIn ?? ""} onChange={e => handleChange('linkedIn', e.target.value)} />
        </div>
        <div>
          <Label>GitHub</Label>
          <Input value={profile.github ?? ""} onChange={e => handleChange('github', e.target.value)} />
        </div>
      </div>
    </section>
  );
} 