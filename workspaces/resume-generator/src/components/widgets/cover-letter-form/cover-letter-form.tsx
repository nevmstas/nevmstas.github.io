"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface CoverLetterFormProps {
  value: string;
  onChange: (value: string) => void;
}

export const CoverLetterForm = ({ value, onChange }: CoverLetterFormProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Cover Letter</h2>
        <Button
          onClick={handleCopy}
          variant={copied ? "default" : "outline"}
          size="sm"
          disabled={!value.trim()}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
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