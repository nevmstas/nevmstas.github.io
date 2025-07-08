"use client";
import { Textarea } from "@/components/ui/textarea";

interface CoverLetterFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const CoverLetterForm = ({ value, onChange }: CoverLetterFormProps) => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Cover Letter</h2>
      <div className="grid gap-4">
        <div>
          <Textarea
            id="coverLetter"
            value={value}
            onChange={e => onChange(e.target.value)}
            rows={6}
            placeholder="Write your cover letter here..."
          />
        </div>
      </div>
    </section>
  );
}; 